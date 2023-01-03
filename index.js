const { query } = require("express");
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


//get all products
app.get('/products',async (req, res) => {

try {
    const products = await Product.find();

    if(products){
        res.status(200).send(products)
    }
    else{
        res.status(400).send("There was no products");
    }
} catch (error) {
    res.status(500).send({message: error.message});
}
})



//get single  products
app.get('/products/:id',async (req, res) => {

    try {
        const id = req.params.id;
        const products = await Product.findOne({_id: id}) 
    
        if(products){
            res.status(200).send({
                data: products
            })
        }
        else{
            res.status(400).send("There was no products");
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
    })
    

//post products 
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