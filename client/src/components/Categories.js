import React from 'react'
import {useFormik} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table,Button,Container, Row, Col,DropdownButton,Dropdown} from 'react-bootstrap'
import { useEffect, useState } from "react";

const Category = () => {
    

   
    const deleteCategory =(id) =>{
        axios.delete(`http://localhost:4000/categorydelete/${id}`)
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
        <br/>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Category Name</th>
                <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {category.map((c) => (
              <tr key={c._id}>
                <td>{c.CategoryName}</td>
                <td><Button href="/category" onClick={()=> deleteCategory(c._id)}>&#10060; Delete</Button></td>
                </tr>
              ))}

               
            </tbody>
        </Table>
</div>    )
}

export default Category
