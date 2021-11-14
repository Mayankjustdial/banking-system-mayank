const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path');
const mongoose = require('mongoose');
const port =  process.env.PORT || '8080';
const methodOverride =require('method-override');


app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use('/public',express.static(__dirname + "/public"));

const Customer = require('./models/customers');
const Transaction = require('./models/transaction');


//Db connect
mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message)); 


//Routes
app.get('/',(req,res)=>{
	res.render('home');
});

app.get('/view', async (req, res) => {
	const customers = await Customer.find({});
	console.log(customers);
	res.render('customerlist', {customers} );
});

app.get('/view/:id', async (req,res)=>{
	const { id } = req.params;
 	const customer = await Customer.findById(id);
	const customers = await Customer.find({});
	res.render('transfer', {customer, customers });
});

app.get("/view/:id1/:id2", async(req, res) =>{
  const {id1, id2} = req.params;
  const fromUser = await Customer.findById(id1);
  const toUser = await Customer.findById(id2);
  res.render("form", {fromUser, toUser});
});

app.put("/view/:id1/:id2", async(req, res) =>{
  const {id1, id2} = req.params;
  const credit = parseInt(req.body.credit);
  const fromUser = await Customer.findById(id1);
  const toUser = await Customer.findById(id2);

  if(credit <= fromUser.credits && credit > 0){
      
  let fromCreditsNew = fromUser.credits - credit;
  let toCreditsNew = parseInt(toUser.credits + credit);
  await Customer.findByIdAndUpdate(id1, {credits : fromCreditsNew}, 
    { runValidators: true, new: true });
  await Customer.findByIdAndUpdate(id2, {credits : toCreditsNew}, 
      { runValidators: true, new: true });

      let newTransaction = new Transaction();
      newTransaction.fromName = fromUser.name;
      newTransaction.toName = toUser.name;
      newTransaction.transfer = credit;
      await newTransaction.save();
      
      res.redirect("/view");
  }
  else{
      res.render('error');
  }
});



app.get("/history", async(req, res)=>{
  const transactions = await Transaction.find({});
  res.render("history", {transactions});
});

app.get('/about',(req,res)=>{
	res.render('about');
});



//server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

