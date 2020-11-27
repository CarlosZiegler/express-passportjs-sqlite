const db = require('../db.config');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const seed = async () => {
  await db.sync({ force: true });

  const password = `1212`;
  const email = 'carlos@gmail.com';
  const hash = await bcrypt.hash(password, 10);
  User.create({
    password: hash,
    email: email,
  })
    .then((user) => {
      console.log('seeded user', user);
      User.findOne({ where: { email: `${user.email}` } })
        .then((user) => {
          console.log('found in db after adding');
          db.close();
        })
        .catch((error) => {
          console.error('error looking for new user in db: ', error);
          db.close();
        });
    })
    .catch((error) => {
      console.error('failed to seed, ', error);
      db.close();
    });
};

seed();
