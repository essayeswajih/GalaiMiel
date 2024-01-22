const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt')


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days in milliseconds
  },
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'galaimiel',
  port:3309
});

db.connect(err=>{
  if (err) console.log(err,'database connection error ...');
  else console.log('database connected ...');
});

//------------------------------set-session--------------------------
app.post('/set-session', (req, res) => {
  req.session.user=req.body.user;
  req.session.save();
  req.s
  res.status(200).json({"Session set with user :":req.session.user});
});
//------------------------------get-session----------------------
app.post('/get-session', (req, res) => {
  let username = req.session?.user?.nom | "Guest";
  let id = req.session?.user?.id | -1;
  res.status(200).json({ "username": username, "id": id });
});
//------------------------------register--------------------------
app.post('/register', (req, res) => {
  const fristName = req.body.fristName;
  const secondName = req.body.secondName;
  const tel = req.body.tel;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err, 'errors');
      return res.status(500).send('Internal Server Error');
    }

    const q = 'INSERT INTO users (nom, prenom, tel, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(q, [ fristName, secondName ,tel , email, hashedPassword], (err, result) => {
      if (err) {
        console.log(err, 'errors');
        return res.status(500).send('Internal Server Error');
      }
      res.status(200).send('Registration successful');
    });
  });
});
//------------------------------log-in--------------------------
app.post('/login', (req, res) => {
  /*if (req.session.user.id) {
    return res.redirect('/');
  }*/

  const email = req.body?.email;
  const password = req.body?.password;

  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [email], (err, result) => {
    if (err) {
      console.log(err, 'errors');
      return res.status(500).send('Internal Server Error');
    }
    if (result.length > 0) {
      const hashedPasswordFromDB = result[0].password;
      bcrypt.compare(password, hashedPasswordFromDB, (compareErr, isMatch) => {
        if (compareErr) {
          console.error(compareErr);
          return res.status(500).send('Internal Server Error');
        }

        if (isMatch) {
          result[0].password="u cant";
          res.send(result[0]);
        } else {
          res.status(401).send('Invalid username or password 1');
          return false;
        }
      });
    } else {
      res.status(401).send('Invalid username or password 2');
      return false;
    }
  });
  return true;
});

//------------------------------log-out---------------------------
app.post('/logout', (req, res) => {
  req.session.destroy((err)=>{
    if(err){
      res.status(500).send('Could Not Logout');
    }
    res.status(200).send('Logout Done');
  }); 
});



app.get('/product/all', (req, res) => {
  let query = "SELECT * FROM product";
  db.query(query, (err, result) => {
    if (err) {
      console.error('ERROR', err);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.status(200).send({ message: "Data found", data: result });
      } else {
        res.status(404).send({ message: "Data not found" });
      }
    }
  });
});

app.get('/product/:id',(req,res)=>{
  let id = req.params.id;
  let query = `SELECT * FROM product WHERE id=${id}`;
  db.query(query,(err,result)=>{
    if(err){
      console.log(err,'error in getting data from the table');
    }
    if(result.length > 0 ){
      res.send(result[0]);
    }
    else{
      res.send({message:"data not found"});
    }
  });
});
//------------------------------Search Mode-------[Dark/Light]-------
app.post('/design/get/mode', (req, res) => {
  let id = req.body.userId;
  const query = `SELECT mode FROM design WHERE id_user = ${id} `;
  db.query(query, (err, result) => {
    if (err) {
      console.log("Error in fetching user's design mode");
      return res.status(500).send({ message: 'Internal Server Error' });
    }
    if (result.length > 0) {
      const userDesignMode = result[0].mode;
      return res.status(200).send({ message: 'User design mode fetched successfully', mode: userDesignMode });
    } else {
      // feha khedma
      return res.status(404).send({ message: 'User design mode not found' });
    }
  });
});

//------------------------------Update Mode-------[Dark/Light]-------
app.post('/design/set/mode', (req, res) => {
  let userId = req.body.userId;
  let newDesignMode = req.body.newDesignMode;

  const updateQuery = `UPDATE design SET mode = '${newDesignMode}'WHERE id_user = ${userId}`;

  db.query(updateQuery, (err, result) => {
    if (err) {
      console.log("Error in updating user's design mode");
      return res.status(500).send({ message: 'Internal Server Error' });
    }

    if (result.affectedRows > 0) {
      return res.status(200).send({ message: 'User design mode updated successfully' });
    } else {
      return res.status(404).send({ message: 'User not found or design mode not updated' });
    }
  });
});
app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});
//-----------------------
app.use((req, res) => {
  console.log("Received a request for "+req.url);
  res.status(404).send('Not Found');
});

app.listen(port,()=>{
  console.log("Server is running on http://localhost: " + port );
});