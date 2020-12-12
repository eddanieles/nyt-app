import axios from 'axios';

const API_KEY = "Xgbh6Tb01faTeT8PfNNH8QqJuGrstSgU"

export async function getArticles(query) {
    axios.get(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${API_KEY}`)
        .then(resolve => {
            // handle success
            // console.log(resolve);
            return resolve;
        });
}