const AbstractManager = require("./AbstractManager");

class ArticlesManager extends AbstractManager {
  constructor() {
    super({ table: "articles" });
  }

  insert(article) {
    const { title, description, price, picture } = article;
    return this.database.query(
      `INSERT INTO ${this.table} (title, description, price, picture) VALUES (?, ?, ?, ?)`,
      [title, description, price, picture]
    );
  }

  update(article) {
    const { id, title, description, price } = article;
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, description = ?, price = ? WHERE id = ?`,
      [title, description, price, id]
    );
  }

  delete(articleId) {
    return this.database.query(`delete from ${this.table} where id = ?`, [
      articleId,
    ]);
  }
}

module.exports = ArticlesManager;
