import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";

function SideBar() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topics) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      {!isLoading ? (
        <nav className="site-nav">
          <ul>
            {topics.map((topic, i) => {
              const topicQuery = `/?topic=${topic.slug}`;
              return (
                <li key={i}>
                  <Link to={topicQuery}>{topic.slug}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </>
  );
}

export default SideBar;
