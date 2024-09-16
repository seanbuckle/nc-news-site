import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId } from "../api";

function Comments() {
    const { article_id } = useParams();
    const [commentsByArticle, setCommentsByArticle] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        getCommentsByArticleId(article_id).then((comments) => {
            setCommentsByArticle(comments)
            setIsLoading(false)
            setIsError(false)
        }).catch((err) => {
            setIsLoading(false)
            setIsError(true)
          });
    }, [article_id])

    if(isLoading){
        return (
            <p>Loading Comments...</p>
        )
    }
    if(isError){
        return (
            <p>Loading Comments...</p>
        )
    }
    return (
        <section>
            <h3>Comments</h3>
            <ul>
                {commentsByArticle.map((comment,i) => {
                    return (
                        <li key={i}>
                            <section>
                                <h4>{comment.author}</h4>
                                <time dateTime="">{comment.created_at}</time>
                                <p>{comment.body}</p>
                                <span>{comment.votes}</span>
                            </section>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}

export default Comments
;