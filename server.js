const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const mongoDB = require('mongodb').MongoClient;
const connString = "mongodb+srv://test:test@cluster0.or3z4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


mongoDB.connect(connString, { useUnifiedTopology: true})
    .then(client => {
        console.log("connected to the database");
        const database = client.db('foodPhotos')
        const votes = database.collection('votes');


        app.get('/', (req, res) => {
            database.collection('votes').find().toArray()
              .then(results => {
                res.render('index.ejs', { votes: results })
              })
              .catch(error => console.error(error))
          })

          // update vote count
          app.put('/votes', (req, res) => {
              console.log(req)
              votes.updateOne(
                  {name: req.body.name},
                {
                    $set: {
                      name: req.body.name,
                      srcUrl: req.body.srcUrl,
                      altText: req.body.altText,
                      votes: req.body.votes
                    }
                  },
                  { //upsert means insert a document if no docs can be updated
                    upsert: true
                  }
                )
              .then(result => {
                   res.json('Success')
                   
                 })
              .catch(err => console.error(err))
          })  
          

    })
    

app.listen(3000, function() {
    console.log('listening on 3000')
})


