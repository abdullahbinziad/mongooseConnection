const express = require("express");
const mongoose = require("mongoose");

const app = express()
app.use(express.json());

const port = 3000

mongoose.set('strictQuery', true);


//set default mongoose connection 
mongoose.connect('mongodb://localhost:27017/helloDB',)
.then(()=> console.log("Mongoose Connected"))
.catch((error)=> {
    
console.log("Not Connected");
console.log(error);
})




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})