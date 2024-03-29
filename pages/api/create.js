// Datastax

import cassandra from 'cassandra-driver'
import root from 'app-root-path'
import monk from 'monk'

// const client = new cassandra.Client({
//   cloud: { secureConnectBundle: *******},
//   credentials: ********,
//   keyspace: 'data'
// })

// function createTable () {
//   const query = 'CREATE TABLE IF NOT EXISTS data.users (id int PRIMARY KEY, lastname text, email text, firstname text);'
//   return client.execute(query)
// }

export default function handler (req, res) {
  if (req.method === 'POST') {
    // createTable()
    if (req.body.googleId) {
      const user = req.body
      _insertUser(res, user.googleId, user.familyName, user.email, user.givenName)
    }
  } else {
    res.send('Method not allowed')
  }
}

// function insertUser (id, lastname, email, firstname) {
//   // TO DO: execute a simple statement that inserts one user into the table
//   const insert = 'INSERT INTO users (id, lastname, email, firstname) VALUES (?,?,?,?,?)'
//   const params = [id, lastname, email, firstname]
//   return client.execute(insert, params)
// }

// function selectUser (lastname) {
//   // TO DO: execute a simple statement that retrieves one user from the table
//   const select = 'SELECT firstname, age FROM users WHERE lastname = :lastname'
//   const params = [lastname]
//   return client.execute(select, params)
// }

// async function writeDoc () {
//   await client.connect()
//   // await insertUser(user, id, lname, email, fname)
//   const rs1 = await selectUser('Jones')
//   const user1 = rs1.first()

//   if (user1) {
//     console.log('name = %s, age = %d', user1.firstname, user1.age)
//   } else {
//     console.log('No results')
//   }

//   // await updateUser(36, 'Jones')

//   const rs2 = await selectUser('Jones')
//   const user2 = rs2.first()

//   if (user2) {
//     console.log('name = %s, age = %d', user2.firstname, user2)
//   }
// }

const db = monk('mongodb+srv://na-admin:tYPhfsVwT63qFuuy@bucket1.qpofb.mongodb.net/locker')
const col = db.get('users')

function _insertUser (res, id, last, email, name, cb) {
  col.findOne({ id }).then(response => {
    if (!response) {
      col.insert({
        id,
        last,
        email,
        name
      }).then(() => {
        res.send('Done')
      })
    }
  })
}
