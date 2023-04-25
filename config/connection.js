const { Sequelize } = require('sequelize');
require('dotenv').config();

let connection;
if(process.env.JAWSDB_URL) {
  connection = new Sequelize(process.env.JAWSDB_URL)
} else {
  connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
    },
  );
}

module.exports = connection; 

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PW,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306,
//     },
//   );
// }

// const connection = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql'
//   }
// );

// module.exports = connection;

// const isProduction = process.env.PORT;
// const connection = isProduction ? new Sequelize (process.env.DB_CONNECTION_STRING) : new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql'
//   }
// );

