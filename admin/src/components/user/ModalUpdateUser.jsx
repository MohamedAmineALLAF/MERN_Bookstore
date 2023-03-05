import React, { useEffect, useRef, useState } from 'react'
import {  Formik } from "formik";
import * as yup from "yup";
import { Avatar, Button, FormControlLabel, Grid, Modal, Switch, TextField, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { makeAdmin, makeActive, removeAdmin, removeActive, updateUser } from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';


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


const ModalUpdateUser = ({open,handleClose}) => {

      const isNonMobile = useMediaQuery("(min-width:600px)");
      const dispatch = useDispatch();
      const {user,isActive}=useSelector(state=>state.users)
      const [checked,setChecked] = useState(false)
      const [checkedActive,setCheckedActive] = useState(false)

      const initialValues = {
        name : user.name,
        email:user.email,
        address:user.address,
        phone:user.phone,
      };


useEffect(() => {
  
  setChecked(user.isAdmin)
  setCheckedActive(user.isActive)

}, [])

        const handleFormSubmit = (values) => {
        const item = [user._id,values]

        dispatch(updateUser(item));

      };

    const handleAdmin = (event) => {

      setChecked(event.target.checked)
      if (!checked) {
        dispatch(makeAdmin(user._id));

      }else {
        dispatch(removeAdmin(user._id));

      }
    }

    const handleActive = (event) => {

      setCheckedActive(event.target.checked)
      if (!checkedActive) {
        dispatch(makeActive(user._id));

      }else {
        dispatch(removeActive(user._id));

      }
    }
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
              Update user
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
{/* {isActive  ? <>
  <TextField
        id="date"
        label="Start Date"
        type="date"
        onChange={handleChange}
        defaultValue={values.ActiveshipStartDate}
        value={dayjs(values.ActiveshipStartDate).format("YYYY-MM-DD")}

        name="ActiveshipStartDate"
        sx={{ gridColumn: "span 2" }}
        InputLabelProps={{ shrink: true, required: true }}
      />

<TextField
        id="date"
        label="End Date"
        type="date"
        onChange={handleChange}
        value={dayjs(values.ActiveshipEndDate).format("YYYY-MM-DD")}

        name="ActiveshipEndDate"
        sx={{ gridColumn: "span 2" }}
                InputLabelProps={{ shrink: true, required: true }}

      />
  
</>
: <></>} */}

            </Box>

            <Box sx={{
              my: 3,
              mx: 4,
            
            }}>

            <FormControlLabel  label="make Admin " control={<Switch  checked={checked} onChange={handleAdmin} color="secondary" />}/>
            <FormControlLabel  label="make Active " control={<Switch  checked={checkedActive} onChange={handleActive} color="secondary" />}/>

            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update user
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
    email: yup.string().email("invalid email").required("required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("required"),
    address: yup.string().required("required")
    
  });
 
  

export default ModalUpdateUser;

