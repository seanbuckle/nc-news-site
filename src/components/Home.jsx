import { useEffect, useState } from "react";
import { getArticles } from "../api";

function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const dateConfig = {
    day: "numeric",
    month: "long",
  };
  const timeConfig = {
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    getArticles().then((articles) => {
      setAllArticles(articles);
      console.log(allArticles);
    });
  }, []);
  return (
    <main>
      {allArticles.map((article, i) => {
        const date = new Date(article.created_at);
        return (
          <section key={i}>
            <img src={article.article_img_url} alt="article image" />
            <h2>{article.title}</h2>
            <p>{article.topic}</p>
            <time dateTime={date.toLocaleString("en-GB")}>
              {date.toLocaleTimeString("en-GB", timeConfig)}{" "}
              {date.toLocaleString("en-GB", dateConfig)}{" "}
              {date.getFullYear() < new Date().getFullYear()
                ? date.getFullYear()
                : null}
            </time>
          </section>
        );
      })}
    </main>
  );
}

export default Home;
