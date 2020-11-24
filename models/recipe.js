//Models folder and create a new file called `recipe.js`.
module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.TEXT,
  });
  return Recipe;
};