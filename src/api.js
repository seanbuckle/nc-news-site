"use strict"

import axios from "axios"

const api = axios.create({ baseURL: "https://nc-news-de5p.onrender.com/api" })


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
export const updateArticleById = (article_id, incr) => {
    return api.patch(`/articles/${article_id}`, incr).then((response) => {
        return response.data
    })
}

export const getCommentsByArticleId = (article_id) => {
    return api.get(`/articles/${article_id}/comments`).then((response) => {
        return response.data
    })
}

export const postCommentByArticleId = (article_id,postComment) => {
    return api.post(`/articles/${article_id}/comments`, postComment).then(({data}) => {
        return data
    })
}

export const deleteCommentById = (comment_id) => {
    return api.delete(`comments/${comment_id}`)
}