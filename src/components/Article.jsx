import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById, updateArticleById } from "../api";
import NotFound from "./NotFound";

function Article({children}) {
  const { article_id } = useParams();
  const [articleById, setArticleById] = useState([]);
  const [isError, setIsError] = useState(false);

  const dateConfig = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  useEffect(() => {
    getArticleById(article_id)
      .then((article) => {
        setArticleById(article);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [article_id]);

  if (isError) {
    return <NotFound />;
  }

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
    <main>
      <h2>{articleById.title}</h2>
      <img src={articleById.article_img_url} alt="" />
      <p>{articleById.author}</p>
      <button onClick={() => incrementArticleVote(1)}>
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
      <button onClick={() => incrementArticleVote(-1)}>
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
      <time dateTime="">{date.toLocaleString("en-GB", dateConfig)}</time>
      <p>{articleById.body}</p>
      {children}
    </main>
  );
}

export default Article;
