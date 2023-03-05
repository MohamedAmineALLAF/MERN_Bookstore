

import axios from 'axios';
import { message } from 'antd';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";


export const payBook = createAsyncThunk(
    "order/payBook",
    async (bookData, thunkAPI) => {
      const { rejectWithValue, getState, dispatch } = thunkAPI;
      try {
        //disptch
        // dispatch(deleteBook({ id: 5 }));
        const res = await fetch("http://localhost:8000/books", {
          method: "POST",
          body: JSON.stringify(bookData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        //report
        const data = await res.json();
        dispatch(logInsert({ name: "insertBook", status: "success" }));
        return data;
      } catch (error) {
        dispatch(logInsert({ name: "insertBook", status: "failed" }));
        return rejectWithValue(error.message);
      }
    }
  );
