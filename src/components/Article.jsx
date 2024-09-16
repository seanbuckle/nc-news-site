import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../api";
import NotFound from "./NotFound";

function Article() {
  const { article_id } = useParams();
  const [articleById, setArticleById] = useState([]);
  const [isError, setIsError] = useState(false);

  const dateConfig = {
    day: "numeric",
    month: "long",
    year: "numeric"
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

  const date = new Date(articleById.created_at)

  return (
    <main>
      <h2>{articleById.title}</h2>
      <img src={articleById.article_img_url} alt="" />
      <p>{articleById.author}</p>
      <time dateTime="">{date.toLocaleString("en-GB", dateConfig)}</time>
      <p>{articleById.body}</p>
    </main>
  );
}

export default Article;
