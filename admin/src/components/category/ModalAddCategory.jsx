import React, { useRef, useState } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import { Avatar, Button, Grid, Modal, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { insertCategory } from '../../store/categorySlice';


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


const ModalAddCategory = ({open,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

      const dispatch = useDispatch();


      const handleFormSubmit = (values) => {
        console.log(values);
 dispatch(insertCategory(values));
      };
    
    

    return (
        <Modal
        open={open}
        onClose={handleClose}
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
              Add category
            </Typography>

            </Box>
            
            <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
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
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
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
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />  
             
            
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add category
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


  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
  
  });
  const initialValues = {
    name : "",
        description:"",
    
  };
  

export default ModalAddCategory;

