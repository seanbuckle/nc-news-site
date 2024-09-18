import "./App.css";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Article from "./components/Article";
import Comments from "./components/Comments";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Header />
      <SideBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/:article_id"
          element={
            <Article>
              <Comments />
            </Article>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
