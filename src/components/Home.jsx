import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getArticles } from "../api";
import Filter from "./Filter";
import SkeletonArticleList from "./SkeletonArticleList";
import NotFound from "./NotFound";

function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");
  const dateConfig = {
    day: "numeric",
    month: "short",
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles(topicQuery, sortByQuery, orderQuery)
      .then((articles) => {
        setAllArticles(articles);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [topicQuery, sortByQuery, orderQuery]);

  return (
    <>
      <Filter searchParams={searchParams} setSearchParams={setSearchParams} />
      <main className="main-home">
        {isError ? (
          <>
            <NotFound />
          </>
        ) : (
          <>
            {!isLoading ? (
              <>
                <label
                  htmlFor="filter-btn"
                  className="btn btn--outlined btn--filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
                  </svg>
                  Filters
                </label>
                <div className="card-container">
                  {allArticles.map((article, i) => {
                    const date = new Date(article.created_at);
                    const linkURL = `/${article.article_id}`;
                    return (
                      <section key={i} className="ncn-card">
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
                          {date.toLocaleString("en-GB", dateConfig)}{" "}
                          {date.getFullYear() < new Date().getFullYear()
                            ? date.getFullYear()
                            : null}
                        </time>
                        <Link key={i} to={linkURL} className="btn btn--tonal ncn-card__btn">
                          Read more
                        </Link>
                      </section>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <SkeletonArticleList />
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Home;
