const express = require('express');
const bodyParser = require('body-parser');



const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://pedromiguel:Pp75112928@cursojs.e2nu7.mongodb.net/USERS?retryWrites=true&w=majority', {
  useNewUrlParser: true,
   useUnifiedTopology:true,
   useCreateIndex : true
})


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


require('./app/controllers/index')(app);





app.get('/', (req,res) => {
    res.send('Ok')
})


app.listen('3000', () => {
    console.log('Server is running!')
})

