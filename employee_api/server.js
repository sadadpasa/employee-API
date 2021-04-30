const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 
app.use(cors());

// CONNECT TO MONGOOSE DATABASE
const uri = "mongodb+srv://admin:5dbyrs2YtwPt2ra5@cluster0.xpxn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  })
.then( () => app.listen(5000, () => console.log("im working")))
.catch( err => console.log(err))


// DATABASE SCHEMA
const employeeData = mongoose.model('Employee Data', mongoose.Schema({
    nama: String,
    posisi: String
}));


// ROUTES
app.get('/', async (req,res) => {
    const employee = await employeeData.find({}); 
    res.send(employee);
})

app.post('/', async (req,res) => {
    const newEmployee = new employeeData(req.body);
    const savedEmployee = await newEmployee.save();
    res.send(savedEmployee);
})

app.delete('/:Id', async (req,res) => {
    const deletedEmployee = await employeeData.findByIdAndDelete(req.params.Id);
    res.send(deletedEmployee);
})

app.put('/:Id', async (req,res) => {
    const updatedEmployee = await employeeData.findByIdAndUpdate({_id: req.params.Id}, req.body)
    res.send(updatedEmployee);
})
