'use strict';
module.exports = (sequelize, DataTypes) => {
  const blog = sequelize.define('blog', {
    PostId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Title: DataTypes.STRING,
    Post: DataTypes.STRING,
  }, {});
  blog.associate = function(models) {
    // associations can be defined here
  };
  return blog;
};