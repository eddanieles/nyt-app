import axios from 'axios';

const API_KEY = "Xgbh6Tb01faTeT8PfNNH8QqJuGrstSgU"

export async function getArticles(query) {
    const data = axios.get(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`);
    return data;
}

export async function getArticle(id) {
    const data = axios.get(`http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=_id:("${id}")&api-key=${API_KEY}`);
    return data;
}