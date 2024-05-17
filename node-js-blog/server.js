const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors()); 

mongoose.connect('mongodb+srv://admin:admin@project4.uxgsj2z.mongodb.net/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connecting to MongoDB estable.');
}).catch(err => {
  console.error('Erro to connect to MongoDB:', err);
  process.exit();
});

//---------------------------------------------------------------
//define bd schemas

//user 
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

//questions
const questionSchema = new mongoose.Schema({
  title: String,
  categories: String,
  question: String,
  author: String,
  upvotes: String,
  date: String,
  answered: String
});
const Question = mongoose.model('Questions', questionSchema);

//---------------------------------------------------------------
//edn bd schemas

//---------------------------------------------------------------
//add data to bd

//add questions
app.post('/addQuestion', (req, res) => {
  const questionData = req.body;
  const question = new Question(questionData);   

  question.save().then(savedQuestion => {
    console.log('Question saved:', savedQuestion);
    res.status(200).json({ message: 'Question saved successfully!' });    
  }).catch(err => {
    console.error('Error saving Question:', err);
    res.status(500).json({ message: 'Error saving Question.' });
  });
});


//register new user login
app.post('/saveUser', (req, res) => {
  const userData = req.body;
  const user = new User(userData);

  user.save().then(savedUser => {
    console.log('User saved:', savedUser);
    res.status(200).json({ message: 'User saved successfully!' }); // response JSON seucess client
  }).catch(err => {
    console.error('Error saving user:', err);
    res.status(500).json({ message: 'Error saving user.' }); //response in JSON to error client
  });
});

// end add data to bd
//---------------------------------------------------------------

//find in database
app.get('/users', (req, res) => {
  User.find().then(users => {
    res.json(users); // Send the users data as JSON response
  }).catch(err => {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users.' });
  });
});

app.get('/displayQuestions', (req, res) => {  
  Question.find().then(question => {
    res.json(question); // Send questions data as JSON response
  }).catch(err => {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Error fetching questions.' });
  });
});



app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

