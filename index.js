const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = 3000;

// Create a Schema object
const userSchema = new mongoose.Schema({
  myName: { type: String, unique: true, required: true },
  mySID: { type: Number, required: true },
});

// Create a Model object
// defining model
const User = mongoose.model('s24students', userSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
  const URI = req.body.myuri;
  // connect to the database and log the connection
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(5000, () => {
            console.log(`Server is running on port ${3000}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
  // add the data to the database
  const myName = 'Efe Awowede'
  const mySID = 300385671
  const newUser = new User({ myName, mySID });

  // send a response to the user
    newUser.save()
        .then(() => res.send(`<h1>Document  Added</h1>`))
        .catch((err) => res.status(400).json('Could not add user: ' + err))
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
