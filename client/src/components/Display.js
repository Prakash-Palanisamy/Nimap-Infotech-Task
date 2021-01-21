import React from 'react'
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table,Button,Container, Row, Col,DropdownButton,Dropdown} from 'react-bootstrap'
import { useEffect, useState } from "react";

const Display = () => {
    const formik = useFormik({
        initialValues : {
            CategoryName: '',
        },
        validationSchema: yup.object({
            CategoryName: yup.string()
            .required("CategoryName is required"),
        }),
        onSubmit(data){
          //  console.log(data);
            axios.post('http://localhost:4000/addCategory',data)
            .then(res => {
                alert("Category Inserted Successfully")
            })
            .catch(error => {
                toast.error("Error");
            })
           
        }
    })


    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [products, setProducts] = useState([]);
  
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  
     useEffect(() => {
       fetch(`http://localhost:4000/products?page=${pageNumber}`)
         .then((response) => response.json())
         .then(({ totalPages, products }) => {
           setProducts(products);
           setNumberOfPages(totalPages);
         });
     }, [pageNumber]);
   // console.log(products);
    const gotoPrevious = () => {
      setPageNumber(Math.max(0, pageNumber - 1));
    };
  
    const gotoNext = () => {
      setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    const updateProduct =(id) =>{
        axios.delete(`http://localhost:4000/update/${id}`)
        localStorage.setItem('productId', id);
    };

    const deleteProduct =(id) =>{
        axios.delete(`http://localhost:4000/delete/${id}`)
    };

    
    const [allproducts, setAllProducts] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:4000/allproducts`)
        .then((response) => response.json())
        .then(({allproducts }) => {
          setAllProducts(allproducts);
        });
    }, []);

   // console.log(allproducts)

   const fetchDataCategoryWise =(categoryName) =>{
    // setProducts(products);
   let filteredProducts = allproducts.filter(product => product.CategoryName === categoryName);
   setProducts(filteredProducts);   
   console.log(filteredProducts);
   };
    
    const [category, setCategory] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:4000/category`)
        .then((response) => response.json())
        .then(({category }) => {
          setCategory(category);
        });
    }, []);

 //   console.log(category)
    return (
    <div className="container">
        <Container >
            <Row>
               
                <Col style={{backgroundColor:'#51E1ED', padding:'1rem'}}>
                <form onSubmit ={formik.handleSubmit}>

                <div className= "form-group">
                <label> <strong> Enter Category Name</strong></label>
                <input
                className="form-control"
                type ="text"
                name = "CategoryName"
                onChange ={formik.handleChange}
                value = {formik.values.CategoryName}
                />
                {
                    formik.errors.CategoryName ?
                    <div className="text-danger">{formik.errors.CategoryName}</div>
                    :null
                }
                </div>               
                <button type="submit" className="btn btn-primary">Add Category</button>                
            </form>
                </Col>
                <Col>    
                <h1>Filter Products</h1>            
                <DropdownButton
                  alignRight
                  title="Select Category"
                  id="dropdown-menu-align-right"
               >
                  {category.map((c) => (
              <Dropdown.Item eventKey={c.CategoryName}  onSelect={ ()=>fetchDataCategoryWise(c.CategoryName)}>{c.CategoryName}</Dropdown.Item>
            ))}
              </DropdownButton>

                </Col>
            </Row>
         </Container>
        <br/>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Category Name</th>
                <th>Edit</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.ProductId}</td>
                <td>{product.ProductName}</td>
                <td>{product.CategoryName}</td>
                <td><Button href={`/edit_product/${product._id}`} onClick={()=> updateProduct(product._id)}>Edit</Button></td>
                <td><Button href="/" onClick={()=> deleteProduct(product._id)}>Delete</Button></td>
                </tr>
              ))}

               
            </tbody>
        </Table>
<div className="pagination">
            <button onClick={gotoPrevious}> &#9985; Previous</button>
            {pages.map((pageIndex) => (
                <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                {pageIndex + 1}
                </button>
            ))}
            <button onClick={gotoNext}>Next </button>

     </div>
</div>    )
}

export default Display
