"use strict"

import axios from "axios"

const api = axios.create({ baseURL: "https://nc-news-de5p.onrender.com/api" })


export const getArticles = (topic, sort, order) => {
    return api.get("/articles", { params: { topic: topic, sort_by: sort, order: order } }).then((response) => {
        return response.data
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

export const postCommentByArticleId = (article_id, postComment) => {
    return api.post(`/articles/${article_id}/comments`, postComment).then(({ data }) => {
        return data
    })
}

export const deleteCommentById = (comment_id) => {
    return api.delete(`comments/${comment_id}`)
}

export const getTopics = () => {
    return api.get("/topics").then((response) => {
        return response.data
    })
}