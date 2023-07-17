import PropTypes from "prop-types";

function Article({ article }) {
  return (
    <div className="container-article">
      <img className="article-img" src={article.picture} alt="Robe-bella" />
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
