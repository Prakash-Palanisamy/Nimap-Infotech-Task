const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


mongoose.connect('mongodb://localhost:27017/Nimap_Infotech', { useNewUrlParser: true , useUnifiedTopology: true }, () =>
{
    console.log("Sever connected");
})

const productSchema = new mongoose.Schema({
    ProductId: String,
    ProductName: String,
    CategoryName: String,
});

const categorySchema = new mongoose.Schema({
  CategoryName: String,
});

const Product = mongoose.model("products", productSchema);
const Category = mongoose.model("Category", categorySchema);

const app = express();

app.use(cors());
app.use(express.json());

app.post("/addCategory", async (req, res) =>{
  const category = new Category ({
    CategoryName: req.body.CategoryName,
  })
 try{
    const data= await category.save()
    res.json(data)
 }catch(err){
   res.send('Error')
 }
});

app.post("/addProducts", async (req, res) =>{
  const product = new Product ({
    ProductId: req.body.ProductId,
    ProductName:req.body.ProductName,
    CategoryName: req.body.CategoryName,
  })
 try{
    const data= await product.save()
    res.json(data)
 }catch(err){
   res.send('Error')
 }
});

app.put("/update/:id", async (req, res) =>{
  const id =req.params.id;
 try{
    const product = await Product.findById(id)
        product.ProductId= req.body.ProductId,
        product.ProductName=req.body.ProductName,
        product.CategoryName= req.body.CategoryName
        
    const data= await product.save()
    res.json(data)
 }catch(err){
   res.send('Error')
 }
});


 app.get("/category", async (req, res) => {
    const category = await Category.find({})
    res.json({
    category,
   });
  });

  // app.get("/producttest", async (req, res) => {
  //   const products = await Product.find({})
  //   res.json({
  //     products,
  //  });
  // });

  app.get("/allproducts", async (req, res) => {
    const allproducts = await Product.find({})
    res.json({
      allproducts
    });
  });

app.get("/products", async (req, res) => {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
   const total = await Product.countDocuments({});
    const products = await Product.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      products,
    });
  });
  
 app.get("/products/:id", async (req, res) => {
   const id=req.params.id;
   const products = await Product.findById(id);
   res.json({
     products
   });
 });

  
  app.delete("/delete/:id", async (req,res) => {
    const id =req.params.id;
    await Product.findByIdAndRemove(id).exec();
    res.send(id);
  });

  app.delete("/categorydelete/:id", async (req,res) => {
    const id =req.params.id;
    await Category.findByIdAndRemove(id).exec();
    res.send(id);
  });

const db = mongoose.connection;

db.once("open", () => {
  app.listen(4000);
});