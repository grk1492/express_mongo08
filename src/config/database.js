const mongoose = require('mongoose')

//Le serveur MongoDB local
const server = 'localhost:27017'
const database = 'internshipDB'

/**
 * Cette classe permet de realisée une connection à la base de données MongoDB
 */
class MongoConnexion {
  constructor() {
    this.connexion()
      .then(function() {
        console.log('CONNEXION AU SERVEUR OK 👍')
      })
      .catch(error => {
        console.log(`CONNEXION AU SERVEUR NOK 👎 : ${error}`)
      })
  }

  connexion = async () => {
    await mongoose.connect(`mongodb://${server}/${database}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
  }
}

//On exporte une instance unique de la classe en tant que module
module.exports = new MongoConnexion()
