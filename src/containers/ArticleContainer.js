import React, { useEffect, useState } from 'react';
// import ArticleList from '../components/ArticleList';

const ArticleContainer = () => {
  const [articleIds, setArticleIds] = useState([]);
    const [articles, setArticles] = useState([]);

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
      .then(data => setArticles(data))
      }
  
 
  return(
      null
  )

}

export default ArticleContainer;