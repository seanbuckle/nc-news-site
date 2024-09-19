import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentsByArticleId,
  postCommentByArticleId,
  deleteCommentById,
} from "../api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import SkeletonComments from "./SkeletonComments";

function Comments() {
  const { article_id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [commentsByArticle, setCommentsByArticle] = useState([]);
  const [postComment, setPostComment] = useState({ username: user });
  const [commentAdd, setCommentAdd] = useState(false);
  const [commentRemove, setCommentRemove] = useState(false);
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
        setCommentAdd(true);
        setCommentsByArticle([comment, ...commentsByArticle]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeComment(comment_id, i) {
    deleteCommentById(comment_id)
      .then(() => {
        const comments = commentsByArticle.filter(
          (comment, index) => index !== i
        );
        setCommentsByArticle(comments);
      })
      .catch((err) => {
        return <p>Error removing comment</p>;
      });
  }
  return (
    <section>
      <h3>Comments</h3>
      {!commentAdd ? (
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
      ) : (
        <>
          <p>Comment Added</p>
          {setTimeout(() => {
            setCommentAdd(false);
          }, 5000)}
        </>
      )}
      {!isError ? (
        <>
          <ul>
            {!isLoading ? (
              <>
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

                        {comment.author === user ? (
                          <button
                            onClick={() => removeComment(comment.comment_id, i)}
                          >
                            Remove
                          </button>
                        ) : null}
                      </section>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                <SkeletonComments />
              </>
            )}
          </ul>
        </>
      ) : (
        <p>No comments</p>
      )}
    </section>
  );
}

export default Comments;