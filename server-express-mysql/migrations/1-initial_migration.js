'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "blogs", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2019-09-15T20:18:28.387Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "blogs",
        {
            "postId": {
                "type": Sequelize.INTEGER(5).UNSIGNED,
                "field": "postId",
                "unique": true,
                "allowNull": false,
                "autoIncrement": true,
                "primaryKey": true
            },
            "title": {
                "type": Sequelize.STRING(255),
                "field": "title",
                "allowNull": true
            },
            "post": {
                "type": Sequelize.STRING(255),
                "field": "post",
                "allowNull": true
            },
            "last_update": {
                "type": Sequelize.DATE,
                "field": "last_update",
                "defaultValue": Sequelize.Literal,
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
