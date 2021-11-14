const mongoose = require('mongoose');
const Customer = require('./models/customers');

mongoose.connect('mongodb+srv://Mayank:Mayank@cluster0.1trpb.mongodb.net/Bank', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message)); 

const seedUsers = [
    {
        name: 'Mayank',
        email: 'mayank@gmail.com',
        credits: 10000
    },
    {
        name: 'Shreya',
        email: 'shreya@gmail.com',
        credits: 7000
    },
    {
        name: 'Shekhar',
        email: 'shekhar@gmail.com',
        credits: 4500
    },
    {
        name: 'Balveer',
        email: 'balveer@yahoo.com',
        credits: 8600
    },
    {
        name: 'Ronit',
        email: 'ronit@gmail.com',
        credits: 7500
    },
    {
        name: 'Ashish',
        email: 'ashish@yahoo.com',
        credits: 6900
    },
    {
        name: 'Manisha',
        email: 'manisha@gmail.com',
        credits: 3000
    },
    {
        name: 'Juhi',
        email: 'juhi@yahoo.com',
        credits: 2100
    },
    {
        name: 'Harsh',
        email: 'harsh@gmail.com',
        credits: 5300
	}
]

Customer.insertMany(seedUsers)
    .then(res => console.log(res))
    .catch(err => console.log(err))
