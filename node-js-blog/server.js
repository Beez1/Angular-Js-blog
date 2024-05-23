const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('../my-app/src/app/auth/passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Login welcome.' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout bem-sucedido.' });
});

mongoose.connect('mongodb+srv://admin:admin@project4.uxgsj2z.mongodb.net/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecting to MongoDB established.');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit();
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  acessLevel: Number
});
const User = mongoose.model('User', userSchema);

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

const categorySchema = new mongoose.Schema({
  name: String
});
const Category = mongoose.model('Category', categorySchema);

app.post('/addQuestion', (req, res) => {
  const questionData = req.body;
  const question = new Question(questionData);

  question.save().then(savedQuestion => {
    console.log('Question saved:', savedQuestion);
    res.status(200).json({ message: 'Question saved successfully!' });
  }).catch(err => {
    console.error('Error saving question:', err);
    res.status(500).json({ message: 'Error saving question.' });
  });
});

app.post('/saveUser', async (req, res) => {
  try {
    const { name, email, password, acessLevel } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // hash the password
    const userData = { name, email, password: hashedPassword, acessLevel };
    const user = new User(userData);

    await user.save();
    
    console.log('User saved:', user);
    res.status(200).json({ message: 'User saved successfully!' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user.' });
  }
});

app.post('/addCategory', (req, res) => {
  const categoryData = req.body;
  const category = new Category(categoryData);

  category.save().then(savedCategory => {
    console.log('Category saved:', savedCategory);
    res.status(200).json({ message: 'Category saved successfully!' });
  }).catch(err => {
    console.error('Error saving category:', err);
    res.status(500).json({ message: 'Error saving category.' });
  });
});

app.get('/categories', (req, res) => {
  Category.find().then(categories => {
    res.json(categories);
  }).catch(err => {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Error fetching categories.' });
  });
});

app.get('/users', (req, res) => {
  User.find().then(users => {
    res.json(users);
  }).catch(err => {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users.' });
  });
});

app.get('/displayQuestions', (req, res) => {  
  Question.find().then(question => {
    res.json(question);
  }).catch(err => {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: 'Error fetching questions.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
