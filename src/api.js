import axios from "axios"

const api = axios.create({ baseURL: "https://nc-news-de5p.onrender.com/api"})


export const getArticles = () => {
    return api.get("/articles").then((response) => {
        return response.data
    }).catch((err) => {
        console.log(err)
    })
}

export const getArticleById = (article_id) => {
    return api.get(`/articles/${article_id}`).then((response) => {
        return response.data
    })
}