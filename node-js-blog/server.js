const express = require('express');
const session = require('express-session'); // Consider using a more secure alternative like JWT
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB database
mongoose.connect('mongodb+srv://admin:admin@project4.uxgsj2z.mongodb.net/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit();
});

// Define user schema with email, password (plain text), and access level
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accessLevel: Number
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing request body
app.use(bodyParser.json());
app.use(cors());

// Session management
app.use(session({
  secret: 'your-strong-and-unique-secret-key', // Replace with a strong, unique secret
  resave: false,
  saveUninitialized: false
}));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      accessLevel: user.accessLevel
    };

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
  

// Logout route to clear session
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Protected route example (middleware to check for logged-in user)
app.get('/protected', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  res.status(200).json({ message: 'Access granted' });
});

app.get('/currentUser', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  res.status(200).json({ user: req.session.user });
});

  

const questionSchema = new mongoose.Schema({
  title: String,
  categories: String,
  question: String,
  author: String,
  upvotes: String,
  date: String,
  answered: { type: Boolean, default: false }  // Default as false
});
const Question = mongoose.model('Questions', questionSchema);

const categorySchema = new mongoose.Schema({
  name: String
});
const Category = mongoose.model('Category', categorySchema);

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questions' },
  answer: String,
  date: { type: Date, default: Date.now }
});
const Answer = mongoose.model('Answer', answerSchema);

app.post('/addQuestion', (req, res) => {
  const questionData = req.body;
  questionData.answered = false;  
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
    const { name, email, password, accessLevel=0 } = req.body;
    const userData = { name, email, password, accessLevel };
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

app.post('/addAnswer', (req, res) => {
  const answerData = req.body;
  const answer = new Answer(answerData);

  answer.save().then(savedAnswer => {
    console.log('Answer saved:', savedAnswer);
    res.status(200).json({ message: 'Answer saved successfully!' });

    Question.findByIdAndUpdate(answerData.questionId, { answered: true }).catch(err => {
      console.error('Error updating question as answered:', err);
    });
  }).catch(err => {
    console.error('Error saving answer:', err);
    res.status(500).json({ message: 'Error saving answer.' });
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

app.get('/getAnswers/:questionId', (req, res) => {
  const questionId = req.params.questionId;

  Answer.find({ questionId: questionId }).then(answers => {
    res.json(answers);
  }).catch(err => {
    console.error('Error fetching answers:', err);
    res.status(500).json({ message: 'Error fetching answers.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
