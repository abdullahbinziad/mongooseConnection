const express = require("express");
const mongoose = require("mongoose");

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = 3000

mongoose.set('strictQuery', true);


//set default mongoose connection 


const connectDB = async ()=>{


    try {
       await mongoose.connect('mongodb://127.0.0.1:27017/helloDB',);
       console.log("DB is connected");
    } catch (error){
        console.log("DB is not connected ")
        console.log(error.message);
        process.exit(1);
    }
 };
    

 //creating schema of MongoDb

 const productSchema = new mongoose.Schema({
    title: String,
    price:Number,
    description: String,
    creatDate :{
        type: Date,
        default: Date.now,
    },
 });

 //create products models 

 const Product = mongoose.model("Products", productSchema);



//creating route
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.post("/products", async (req,res)=>{
    try{
 //get data from req body 
const newProduct = new Product({
     title: req.body.title,
     price: req.body.price,
     description: req.body.description
});
 const productData = await newProduct.save();
res.status(201).send(productData);
    }catch(error){
        res.status(500).send({message: error.message});
    }
})

app.listen(port,async () => {
  console.log(`Example app listening on port ${port}`)
  await connectDB();
})