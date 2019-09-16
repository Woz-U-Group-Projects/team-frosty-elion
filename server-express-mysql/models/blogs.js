"use strict";

module.exports = (sequelize, DataTypes) => {
  var blogs = sequelize.define(
    "blogs", {
      postId: {
        type: DataTypes.INTEGER(5).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      post: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, 
    {}
  );

  return blogs;
};
