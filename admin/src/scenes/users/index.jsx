import {  Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataUser } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { CardMembership, DeleteOutline, MoreHorizSharp, VaccinesOutlined } from "@mui/icons-material";

import ModalAddUser from "../../components/user/ModalAddUser";
import ModalUpdateUser from "../../components/user/ModalUpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserId, getUsers } from "../../store/userSlice";
import { tab } from "@testing-library/user-event/dist/tab";




const User = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users ,user } = useSelector((state) => state.users);




  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const columns = [
    {
      field: "membership",
      headerName: "Membership ",
      flex:0.5,
      renderCell: ({ row: { isActive } }) => {
        return (
          <>
          <Box
           
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isActive === false
                ? colors.redAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="33px"
          >
            
            {isActive === true &&  <CardMembership />}
            {isActive === false && <CardMembership />}
            
           
          </Box>
        
          </>
          
        );
      },
    },
    {
      field: "name",
      headerName: " Name",
      
      flex: 0.7,

    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.7,

    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 0.9,
      renderCell: ({ row: { isAdmin } }) => {
        return (
          <>
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isAdmin === false
                ? colors.blueAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            
            {isAdmin === true &&  <AdminPanelSettingsOutlinedIcon />}
            {isAdmin === false && <LockOpenOutlinedIcon />}
            
            <Typography color={colors.grey[200]} sx={{ ml: "5px" }}>
              {isAdmin ? "Admin" : "User" }
            </Typography>
          </Box>
         
          </>
          
        );
      },
    },
    {
      field: "update",
      headerName: "Update user",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => {
        return (
          <>
          <Box  
           height="55%"
           m="0 auto"
           borderRadius="4px">
          <Button  onClick={async()=>{
           await dispatch(getUserId(_id))
          handleOpen()}
          }> 
          <Typography color={colors.grey[200]} >
          <MoreHorizSharp />
            </Typography>
            </Button>
            <Button  onClick={async()=>{await dispatch(deleteUser(_id))}
          }> 
          <Typography  color={colors.redAccent[500]} >
          <DeleteOutline />
            </Typography>
            </Button>
          </Box>
          </>
          
        );
      },
    },
  ];

  return (
    <Box mx="20px">
<ModalAddUser open={openAdd} handleClose={handleCloseAdd} />
{user ? <ModalUpdateUser open={open} handleClose={handleClose} />:<></>}

      <Header title="USERS" subtitle="Managing the users " />
      <Box
        m="20px 0 0 0"
        height="72vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      > <Box display="flex" justifyContent="end">
              <Button onClick={handleOpenAdd} type="submit" color="secondary" variant="contained">
                Add Users
              </Button>
            </Box>
            <DataGrid
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};


export default User;
