const crypto = require('node:crypto')

const hashPassword = (from) => {
  const salt = crypto.randomBytes(10).toString('hex');
  const hash = crypto
    .pbkdf2Sync(from, salt, 10, 32, 'sha256')
    .toString('hex');

  console.log("salt:", salt)
  console.log("hash:", hash)
  console.log("password:", hash + '.' + salt)
}

const password = process.argv[2]
hashPassword(password)