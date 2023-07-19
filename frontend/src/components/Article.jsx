import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from "react-router-dom";

function Article({ article }) {
  return (
    <div className="container-article">
      <Link to={`article-page/${article.id}`}>
        <img className="article-img" src={article.picture} alt="Robe-bella" />
      </Link>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
