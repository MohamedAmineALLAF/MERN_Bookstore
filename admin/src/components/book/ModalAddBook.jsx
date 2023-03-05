import React, { useRef, useState } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import { Avatar, Button, Grid, MenuItem, Modal, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { insertBook } from '../../store/bookSlice';
import { useDispatch, useSelector } from 'react-redux';



const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:4,
  p: 4,
};


 const ModalAddBook = ({open,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

      const dispatch = useDispatch();
      const {categories} = useSelector(state => state.categories)
console.log(categories);
const [authors, setAuthors] = useState(["yonko","ali","ana","howa","yew","kow"])
// const [categories, setCategories] = useState(["yonko","ali","ana","howa","yew","kow"])

const [AuthorSelected, setAuthorSelected] = useState([])
const [CategorySelected, setCategorySelected] = useState([])

      const handleFormSubmit = (values) => {
        values.category=CategorySelected
        values.author=AuthorSelected
        console.log(values);
 dispatch(insertBook(values));
      };
    
    
      const handleAuthor = (event) => {
        const value = event.target.value
        setAuthorSelected(typeof value === "string" ? value.split(',') :value)
  
      }
      const handleCategory = (event) => {
        const value = event.target.value
        setCategorySelected(typeof value === "string" ? value.split(',') :value)
  
      }

    return (
        <Modal
        open={open}
        onClose={()=>{handleClose()
          setCategorySelected([])
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Grid item xs={12} sm={8} md={5} sx={style} square>

          <Box>
            <Box sx={{
              my: 3,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
 
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
             
            <Typography component="h1" variant="h5">
              Add Book
            </Typography>

            </Box>
            
            <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      >

        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                sx={{ gridColumn: "span 2" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ISBN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ISBN}
                name="ISBN"
                sx={{ gridColumn: "span 2" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label=" Image"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.publisher}
                name="publisher"
                sx={{ gridColumn: "span 2" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Edition"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.edition}
                name="edition"
                sx={{ gridColumn: "span 2" }}
              />

            <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Stock dispo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stock}
                name="stock"
                sx={{ gridColumn: "span 2" }}
              />
  <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                rows={5}
                multiline
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                select
                label="Authors"
                onChange={handleAuthor}
                value={AuthorSelected}
                name="author"
                sx={{ gridColumn: "span 4" }}
                SelectProps={{multiple: true}}
              >

                  {
                    authors.map((elem,index)=>{
                      return <MenuItem  key={index} value={elem}>{elem}</MenuItem> 
                  })}

 
                </TextField>
                <TextField
                fullWidth
                variant="filled"
                select
                label="Categories"
                onChange={handleCategory}
                value={CategorySelected}
                name="category"
                sx={{ gridColumn: "span 4" }}
                SelectProps={{multiple: true}}
              >

                  {
                    categories.map((elem,index)=>{
                      return <MenuItem  key={index} value={elem}>{elem.name}</MenuItem> 
                  })}

                </TextField>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add book
              </Button>
            </Box>
          </form>
        )}
      </Formik>
            
          </Box>
        </Grid>
      </Modal>
      );
    }

  const initialValues = {
    title:"", 
    author:[], 
    ISBN:"", 
    publisher:"", 
    edition:0, 
    description:"", 
    price:0,
    category:[], 
    stock:0
  }

  export default ModalAddBook;
