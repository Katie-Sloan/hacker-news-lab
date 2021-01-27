import React from 'react';

const Article = ({title, url}) => {

return (
    <li>
        <a href={url}>{title}</a>
    </li>
)

}

export default Article;