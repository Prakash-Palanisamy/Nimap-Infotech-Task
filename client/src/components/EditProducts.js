import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect,useState } from "react";


const EditProduct = (props) => {   
    
    const currentProduct_Id= localStorage.getItem('productId');
     const [products, setProducts] = useState([]);
     useEffect(() => {
       fetch(`http://localhost:4000/products/${currentProduct_Id}`)
         .then((response) => response.json())
         .then(({ products }) => {
           setProducts(products);
         });
     }, [currentProduct_Id]);
   //  console.log(products);
        const formik = useFormik({
            initialValues : {
                ProductId: '',
                ProductName: '',
                CategoryName: '',
            },
            validationSchema: yup.object({
                ProductId: yup.string()
                .required("ProductId is required"),
                ProductName: yup.string()
                .required("ProductName is required"),
                CategoryName: yup.string()
                .required("CategoryName is required"),
            }),
            onSubmit(data){
               // console.log(data);
                axios.put(`http://localhost:4000/update/${currentProduct_Id}`,data)
                .then(res => {
                    alert("Product Updated Successfully")
                })
                .catch(error => {
                    toast.error("Error");
                })
               
            }
        })

        const [category, setCategory] = useState([]);

        useEffect(() => {
            fetch(`http://localhost:4000/category`)
              .then((response) => response.json())
              .then(({category }) => {
                setCategory(category);
              });
          }, []);
        //  console.log(category);

         




    return(
        <div className ="container mt-3">
           <div className="heading">
                <h1>Edit Products</h1>
                </div>
          
            <div className="jumbotron">
                
            <form onSubmit ={formik.handleSubmit}>
             <div className= "form-group">
                <label>Product Id</label>
                <input
                className="form-control"
                type ="text"
                name = "ProductId"
                onChange ={formik.handleChange}
                defaultValue = {products.ProductId}
                />
                {
                    formik.errors.ProductId ?
                    <div className="text-danger">{formik.errors.ProductId}</div>
                    :null
                }
                </div>

                <div className= "form-group">
                <label>Product Name</label>
                <input
                className="form-control"
                type ="text"
                name = "ProductName"
                onChange ={formik.handleChange}
                defaultValue = {products.ProductName}
                />
                {
                    formik.errors.ProductName ?
                    <div className="text-danger">{formik.errors.ProductName}</div>
                    :null
                }
                </div>
                <div className= "form-group">
                <label>Catogory Name</label>
                <select 
                        className="form-control"
                        type ="text"
                        name = "CategoryName"
                        onChange ={formik.handleChange}
                        defaultValue = {products.CategoryName}
                        aria-label="Default select example"
                >
                    <option selected>Select Catogory Name</option>
                    {category.map((e) => (
                             <option key={e._id} value= {e.CategoryName} > {e.CategoryName} </option>
                                                 
                     ))}
                </select>
                {
                    formik.errors.CategoryName ?
                    <div className="text-danger">{formik.errors.CategoryName}</div>
                    :null
                }
                </div>
               
               
               
                <button type="submit" href="/" className="btn btn-primary">Update Product</button>                
            </form>
            </div>
        </div>
    )
}

export default EditProduct;