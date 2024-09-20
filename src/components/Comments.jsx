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

      {!isError ? (
        <>
          <ul>
            {!isLoading ? (
              <>
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
                      {comment.author === user ? (
                        <button
                          onClick={() => removeComment(comment.comment_id, i)}
                          className="btn--icon" aria-label="remove comment"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                          >
                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                          </svg>
                        </button>
                      ) : null}
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
