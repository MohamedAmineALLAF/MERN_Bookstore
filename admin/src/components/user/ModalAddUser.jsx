import React, { useRef, useState } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import { Avatar, Button, Grid, Modal, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { register } from '../../store/userSlice';
import { useDispatch } from 'react-redux';



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


const ModalAddUser = ({open,handleClose}) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

      const dispatch = useDispatch();


      const handleFormSubmit = (values) => {
        console.log(values);
 dispatch(register(values));
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
              Add user
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
                label=" Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
             <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add user
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


    const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
  
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    // lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address: yup.string().required("required"),
    password: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
  });


  

  const initialValues = {
    name : "",
        // lastName:"",
         email:"",
          password:"",
           address:"",
            phone:""
  };
  

export default ModalAddUser;

