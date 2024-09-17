import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId, postCommentByArticleId } from "../api";

function Comments() {
  const { article_id } = useParams();
  const [commentsByArticle, setCommentsByArticle] = useState([]);
  const [postComment, setPostComment] = useState({ username: "grumpy19" });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dateConfig = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const timeConfig = {
    hour: "2-digit",
    minute: "2-digit",
  };
  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id)
      .then((comments) => {
        setCommentsByArticle(comments);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  function commentInput(e) {
    const commentBtn = document.getElementById("comment-btn");
    if (e.target.value !== "") {
      commentBtn.disabled = false;
      setPostComment({ ...postComment, body: e.target.value });
    } else {
      commentBtn.disabled = true;
    }
  }

  function commentSubmit(e) {
    e.preventDefault();
    postCommentByArticleId(article_id, postComment)
      .then((comment) => {
        setCommentsByArticle([comment, ...commentsByArticle]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (isLoading) {
    return <p>Loading Comments...</p>;
  }
  if (isError) {
    return <p>Loading Comments...</p>;
  }
  return (
    <section>
      <h3>Comments</h3>
      <form onSubmit={(event) => commentSubmit(event)}>
        <input
          type="text"
          name="comment"
          placeholder="Enter a comment"
          onInput={(event) => commentInput(event)}
        />
        <button id="comment-btn" disabled>
          Comment
        </button>
      </form>
      <ul>
        {commentsByArticle.map((comment, i) => {
          return (
            <li key={i}>
              <section>
                <h4>{comment.author}</h4>
                <time dateTime={comment.created_at}>
                  {new Date(comment.created_at).toLocaleString(
                    navigator.language,
                    timeConfig
                  )}{" "}
                  {new Date(comment.created_at).toLocaleString(
                    navigator.language,
                    dateConfig
                  )}
                </time>
                <p>{comment.body}</p>
                <span>{comment.votes}</span>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Comments;
