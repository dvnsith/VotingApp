const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const mongoDB = require('mongodb').MongoClient;
const connString = "mongodb+srv://test:test@cluster0.or3z4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const passport = require("/StudentWork/JavaScript/VotingApp/setup");
const auth = require("/StudentWork/JavaScript/VotingApp/auth");
const PORT = 5000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('messages', (msg) => {
    io.emit('messages', msg)
  });

  socket.on('votes', (vote) => {
    io.emit('votes', vote)
  });

  socket.on('votes2', (vote2) => {
    io.emit('votes2', vote2)
  });

});


mongoose
    .connect(connString, { useNewUrlParser: true })
    .then(console.log(`MongoDB connected ${connString}`))
    .catch(err => console.log(err));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));  

// app.use(
//   session({
//       secret: "very secret this is",
//       resave: false,
//       saveUninitialized: true,
//       store: MongoStore.create({ mongoUrl: connString })
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use("/api/auth", auth);
// // app.get("/", (req, res) => res.send("Good morning sunshine!"));

// app.listen(PORT, () => console.log(`Backend listening on port ${PORT}!`));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));  

app.use(
  session({
      secret: "very secret this is",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: connString })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", auth);
// app.get("/", (req, res) => res.send("Good morning sunshine!"));
app.listen(3000, () => { console.log('app listening on *:3000');});

server.listen(PORT, () => console.log(`server listening on *:${PORT}`));


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
          

          app.put('/votes', (req, res) => {
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