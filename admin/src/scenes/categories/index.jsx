import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { DeleteOutline, MoreHorizSharp } from "@mui/icons-material";

import ModalAddNews from "../../components/category/ModalAddCategory";
import ModalUpdateNews from "../../components/category/ModalUpdateCategory";
import moment from "moment";
import { deleteCategory, getCategories, getCategoryId } from "../../store/categorySlice";
import ModalAddCategory from "../../components/category/ModalAddCategory";
import ModalUpdateCategory from "../../components/category/ModalUpdateCategory";

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { categories ,category } = useSelector((state) => state.categories);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const columns = [
    { field: "name",     
     headerName: "Name",
     flex: 1
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,

  },
   
 
    {
      field: "createdAt",
      headerName: "Date de creation",
      flex: 1,
      renderCell: ({ row: { createdAt } }) => {
        return (  moment(createdAt).utc().format('YYYY-MM-DD') );
      },
    },
    {
      field: "update",
      headerName: "Update news",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => {
        return (
          <>
           
          <Box  
           height="55%"
           m="0 auto"
            
            borderRadius="4px">
          <Button  onClick={async()=>{
           await dispatch(getCategoryId(_id))
          handleOpen()}
          }>

          <Typography color={colors.grey[200]} >
          <MoreHorizSharp />
            </Typography>
            </Button>
            <Button  onClick={async()=>{await dispatch(deleteCategory(_id))}
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
    <Box m="20px">
      <ModalAddCategory open={openAdd} handleClose={handleCloseAdd} />
{category ? <ModalUpdateCategory open={open} handleClose={handleClose} />:<></>}

      <Header
        title="Categories"
        subtitle="List of Categories "
      />
      <Box
        m="40px 0 0 0"
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
      >
        <Box display="flex" justifyContent="end" mt="-20px">
              <Button onClick={handleOpenAdd} type="submit" color="secondary" variant="contained">
                Add category
              </Button>
            </Box>
        <DataGrid
          rows={categories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Category;
