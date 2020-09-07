const mongoose = require('mongoose');

//DATABASE URL PROVIDED BY ATLAS
const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once('error', console.error.bind(console, 'Connection error with database'));
db.once('open', function () {
  console.log('Database connected..');
});