let db = require('../db');
let Sequelize = require('sequelize');

let Model = db.defineModel('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    timestamps: false,
    freezeTableName:true
});

module.exports = Model;