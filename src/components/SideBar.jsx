import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api";


function SideBar() {
    const [topics, setTopics] = useState([])
    useEffect(() => {
        getTopics().then((topics) => {
            setTopics(topics)
        })
    })
    return ( 
        <aside className="site-sidebar">
            <nav>
                <ul>
                    {topics.map((topic,i) => {
                        const topicQuery = `/?topic=${topic.slug}`;
                        return (
                            <li key={i}>
                                <Link to={topicQuery}>{topic.slug}</Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
     );
}

export default SideBar;