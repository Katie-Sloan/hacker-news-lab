import React from 'react';
import Article from './Article';

const ArticleList = ({articles, loaded}) => {
    if(!loaded){
        return <p>Loading...</p>
    }
  const articleArray = articles.map((article, index) => {
                return (
                    <Article
                        title={article.title}
                        url={article.url}
                    />
                )
            })
    
    return (
        <>     
        <ol>{articleArray}</ol>
        </>
    )
}

export default ArticleList;



