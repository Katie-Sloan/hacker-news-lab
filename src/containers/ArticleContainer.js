import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';

const ArticleContainer = () => {
    const [articleIds, setArticleIds] = useState([]);
    const [articles, setArticles] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [articlesDefault, setArticlesDefault] = useState();
    const [input, setInput] = useState('');

    useEffect(() => {
        loadArticleIds()
    }, [])
    
  useEffect(() => {
      loadArticles()
    },[articleIds])
  
    const loadArticleIds = () => {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json ")
      .then(res => res.json())
      .then(data => setArticleIds(data))
    }
  
  const loadArticles = () => {
    const articleArray = articleIds.map((article) => {
      return fetch(`https://hacker-news.firebaseio.com/v0/item/${article}.json`)        
    })
    Promise.all(articleArray)
    .then(function (responses) {
	    return Promise.all(responses.map(function (response) {
        return response.json();
        }));
      })
      .then(data => {
        setArticles(data)
        setArticlesDefault(data)})
      .then(() => setLoaded(true))
      }

    const updateInput = async (input) => {
        const filtered = articlesDefault.filter(article => {
         return article.title.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setArticles(filtered);
     }
  
 
  return(
      <>
      <h1>Hacker News - Top Articles</h1>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <ArticleList 
      articles={articles}
      loaded={loaded}
      />
      </>
  )

}

export default ArticleContainer;