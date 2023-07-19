// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import ArticlePage from "./pages/ArticlePage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article-page/:id" element={<ArticlePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
