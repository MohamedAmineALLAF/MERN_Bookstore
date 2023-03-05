import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import {
  CardMembership,
  DeleteOutline,
  MoreHorizSharp,
  VaccinesOutlined,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBookId, getBooks } from "../../store/bookSlice";
import ModalUpdateBook from "../../components/book/ModalUpdateBook";
import ModalAddBook from "../../components/book/ModalAddBook";
import { getCategories } from "../../store/categorySlice";

const Book = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const { books, book } = useSelector((state) => state.books);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 0.5,
    },

    {
      field: "ISBN",
      headerName: "ISBN",
      flex: 0.5,
    },
    {
      field: "publisher",
      headerName: "Image",
      flex: 0.5
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: ({ row: { category } }) => {
        return category.map((co) => {
          return <> - {co.name} </>;
        });
      },
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.5,
    },

    {
      field: "update",
      headerName: "Update Book",
      flex: 0.8,
      renderCell: ({ row: { _id } }) => {
        return (
          <>
            <Box height="55%" m="0 auto" borderRadius="4px">
              <Button
                onClick={async () => {
                  await dispatch(getBookId(_id));
                  await dispatch(getCategories());
                  handleOpen();
                }}
              >
                <Typography color={colors.grey[200]}>
                  <MoreHorizSharp />
                </Typography>
              </Button>
              <Button
                onClick={async () => {
                  await dispatch(deleteBook(_id));
                }}
              >
                <Typography color={colors.redAccent[500]}>
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
      <ModalAddBook open={openAdd} handleClose={handleCloseAdd} />
      {book ? <ModalUpdateBook open={open} handleClose={handleClose} /> : <></>}

      <Header title="Books" subtitle="Managing Books " />
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
      >
        {" "}
        <Box display="flex" justifyContent="end">
          <Button
            onClick={async () => {
              await dispatch(getCategories());
              handleOpenAdd();
            }}
            type="submit"
            color="secondary"
            variant="contained"
          >
            Add Book
          </Button>
        </Box>
        <DataGrid
          rows={books}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default Book;
