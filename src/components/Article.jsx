import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, updateArticleById } from "../api";
import SkeletonArticle from "./SkeletonArticle";
import NotFound from "./NotFound";

function Article({ children }) {
  const { article_id } = useParams();
  const [articleById, setArticleById] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dateConfig = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then((article) => {
        setArticleById(article);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  const date = new Date(articleById.created_at);

  function incrementArticleVote(num) {
    const incr = { inc_votes: num };
    updateArticleById(article_id, incr)
      .then((article) => {
        setArticleById(article);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }

  return (
    <main className="main-article">
      {!isError ? (
        <>
          {!isLoading ? (
            <>
              <h2>{articleById.title}</h2>
              <img src={articleById.article_img_url} alt="" />
              <div className="vote-group">
                <p>{articleById.author}</p>
                <div>
                  <button
                    onClick={() => incrementArticleVote(1)}
                    className="btn--icon btn--icon-outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="m280-400 200-200 200 200H280Z" />
                    </svg>
                  </button>
                  <span>{articleById.votes}</span>
                  <button
                    onClick={() => incrementArticleVote(-1)}
                    className="btn--icon btn--icon-outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M480-360 280-560h400L480-360Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <time dateTime="">
                {date.toLocaleString("en-GB", dateConfig)}
              </time>
              <p>{articleById.body}</p>
            </>
          ) : (
            <>
              <SkeletonArticle />
            </>
          )}

          {children}
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </main>
  );
}

export default Article;
