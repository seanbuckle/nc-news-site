import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getArticles } from "../api";
import Filter from "./Filter";
import NotFound from "./NotFound";

function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const dateConfig = {
    day: "numeric",
    month: "long",
  };
  const timeConfig = {
    hour: "2-digit",
    minute: "2-digit",
  };

  useEffect(() => {
    getArticles(topicQuery, sortByQuery, orderQuery)
      .then((articles) => {
        setAllArticles(articles);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [topicQuery, sortByQuery, orderQuery]);

  return (
    <main>
      {isError ? (
        <>
          <NotFound />
        </>
      ) : (
        <>
          <Filter
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          {allArticles.map((article, i) => {
            const date = new Date(article.created_at);
            const linkURL = `/${article.article_id}`;
            return (
              <Link key={i} to={linkURL}>
                <section className="ncn-card">
                  <img
                    className="ncn-card__img"
                    src={article.article_img_url}
                    alt="article image"
                  />
                  <h2 className="ncn-card__title">{article.title}</h2>
                  <p className="ncn-card__topic">{article.topic}</p>
                  <time
                    dateTime={date.toLocaleString("en-GB")}
                    className="ncn-card__time-date"
                  >
                    {date.toLocaleTimeString("en-GB", timeConfig)}{" "}
                    {date.toLocaleString("en-GB", dateConfig)}{" "}
                    {date.getFullYear() < new Date().getFullYear()
                      ? date.getFullYear()
                      : null}
                  </time>
                </section>
              </Link>
            );
          })}
        </>
      )}
    </main>
  );
}

export default Home;