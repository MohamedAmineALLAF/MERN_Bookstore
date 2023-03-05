import { CardMembership, MoreHorizSharp } from "@mui/icons-material";
import { Box, Button, Typography,useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
const UsersList = ({ isLoading, users, getUser }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(users);

  const columns = [
    {
      field: "membership",
      headerName: "Membership ",
      flex:0.5,
      renderCell: ({ row: { isMember } }) => {
        return (
          <>
          <Box
           
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              isMember === false
                ? colors.redAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="33px"
          >
            
            {isMember === true &&  <CardMembership />}
            {isMember === false && <CardMembership />}
            
           
          </Box>
        
          </>
          
        );
      },
    },
    {
      field: "firstName",
      headerName: "first Name",
      
    },
    
    {
      field: "lastName",
      headerName: "last Name",
    },
    {
      field: "phone",
      headerName: "Phone Number",
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
      flex: 1,
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
                ? colors.greenAccent[600]
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
          <Box  
           height="55%"
           m="0 auto"
            backgroundColor={ colors.blueAccent[500] }
            borderRadius="4px">
          <Button  > 
          <Typography color={colors.grey[200]} >
          <MoreHorizSharp />
            </Typography>
            </Button>
          </Box>
          </>
          
        );
      },
    },
  ];
  const userList =
    users.length > 0
      ? 
      <DataGrid  rows={users} columns={columns} getRowId={(row) => row._id}  /> 
      : "There is no users available!";

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? "loading..." : {userList}}
    </div>
  );
};

export default UsersList;
