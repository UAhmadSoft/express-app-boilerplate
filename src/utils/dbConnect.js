const mongoose = require('mongoose');

const DBCluster = process.env.DATABASE;
const DBLocal = process.env.DATABASE_LOCAL;

let DB_URL = DBCluster;

DB_URL = DB_URL.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

if (process.argv[2] && process.argv[2] === 'dblocal') DB_URL = DBLocal;

console.log(`DB_URL`, DB_URL);

module.exports = () => {
  console.log('connecting to DB...');
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log('DB Connection Failed !');
      console.log(`err`, err);
    });
};
