const AbstractManager = require("./AbstractManager");

class ArticlesManager extends AbstractManager {
  constructor() {
    super({ table: "articles" });
  }

  insert(articles) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      articles.title,
    ]);
  }

  update(articles) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [articles.title, articles.id]
    );
  }
}

module.exports = ArticlesManager;
