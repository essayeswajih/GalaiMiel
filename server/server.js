const express = require('express');
const session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: false,
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
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const tel = req.body.tel;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err, 'errors');
      return res.status(500).send('Internal Server Error');
    }

    const q = 'INSERT INTO users (nom, prenom, tel, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(q, [firstName, lastName, tel, email, hashedPassword], (err, result) => {
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
          q2="SELECT mode From design WHERE id_user = ?"
          db.query(q2,result[0].id,(err, result2) => {
            if(err){console.log(err)}
            else{
              const userData = {
                id: result[0].id,
                email: result[0].email,
                nom: result[0].nom,
                mode:result2[0]?.mode,
              };
              if(result2.length==0){
                q3="INSERT INTO `design` (`id_user`, `mode`) VALUES (?, 'Dark');"
                db.query(q3,[result[0].id],(err,result3)=>{
                  if(err){
                    res.send("err");
                  }
                  else{
                    userData.mode="Dark";
                    console.log(userData.mode);
                    const token = jwt.sign(userData, "your-secret-key", { expiresIn: "3d" });
                    res.json({ id: userData.id, token: token ,mode:userData.mode});
                  }
                });
              }
              else{
                console.log(userData.mode);
                const token = jwt.sign(userData, "your-secret-key", { expiresIn: "3d" });
                res.json({ id: userData.id, token: token ,mode:userData.mode});
              }
            }
          });

        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

//------------------------------log-out---------------------------
app.post('/logout', (req, res) => {
  // Clear the token from local storage
  localStorage.removeItem('token');
  res.status(200).send('Logout Done');
});

app.post('/product/all', (req, res) => {
  let query = "SELECT * FROM product";
  db.query(query, (err, result) => {
    if (err) {
      console.error('ERROR', err);
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: "Data found", data: result });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    }
  });
});
app.post("/products/searchByCategory",(req,res)=>{
  let category_name= "%" + req.body.category + "%";
  console.log(category_name);
  let sql="SELECT * FROM product where category like ? ";
  db.query(sql,[category_name],(err,rows)=> {
    if(!err){
      res.status(200).json(rows);
    }else{
      console.log(err);
      res.status(500).json({message:"Server error"})
    }
  })
});
app.post('/product/:id',(req,res)=>{
  let id = req.params.id;
  let query = `SELECT * FROM product WHERE id=${id}`;
  db.query(query,(err,result)=>{
    if(err){
      console.log(err,'error in getting data from the table');
    }
    if(result.length > 0 ){
      res.status(200).send(result[0]);
    }
    else{
      res.status(401).send({message:"data not found"});
    }
  });
});
app.post('/cart/:id', async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);

    let commands = await new Promise((resolve, reject) => {
      let query = 'SELECT * FROM commands WHERE id_user = ?';
      db.query(query, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    let count = 0;
    let products = [];

    if (commands.length > 0) {
      for (let command of commands) {
        let id_p = command.id_produit;
        let query1 = "SELECT * FROM product WHERE id = ?";
        let product = await new Promise((resolve, reject) => {
          db.query(query1, [id_p], (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result[0]); // Assuming you want to return the first row
            }
          });
        });

        products.push(product);
        count += 1;
      }
      res.json({ "commands": commands, "products": products, "count": count });
    } else {
      res.send({ message: "data not found" });
    }
  } catch (error) {
    console.log(error, 'error in getting data from commands or product');
    res.status(500).send({ error: 'Internal Server Error' });
  }
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
// Secure endpoint
app.get('/secure-endpoint', authenticateToken, (req, res) => {
  res.json({ message: 'Secure endpoint accessed successfully', user: req.userData });
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing Token' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    }
    req.userData = decoded;
    next();
  });
}

app.get('/', (req, res) => {
  res.send('Welcome to the home page');
});
//-----------------------
app.use((req, res) => {
  console.log("Received a request for "+req.url);
  res.status(404).send('URL Not Found');
});

app.listen(port,()=>{
  console.log("Server is running on http://localhost: " + port );
});