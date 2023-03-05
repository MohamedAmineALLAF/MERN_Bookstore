import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

const initialState = {
  user: null,
  token: null,
  cart: [],
};

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:8000/books");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookId = createAsyncThunk(
  "book/getBookId",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8000/book/${item}`);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
    try {
      const res = await fetch(`http://localhost:8000/books/${item[0]}`, {
        method: "PUT",
        body: JSON.stringify(item[1]),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          Cookie: `ms2a=${token}`, 
        },
      });
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(logInsert({ name: "updateBook", status: "success" }));
dispatch(getBooks())
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "updateBook", status: "failed" }));
      return rejectWithValue(error);
    }
  }
);

export const insertBook = createAsyncThunk(
  "book/insertBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const state = getState();
     const token = state.users.token;
    try {
      const state = getState();
      const token = state.users.token;
      console.log("tokenSTATE", token);
      const res = await fetch("http://localhost:8000/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
          Cookie: `ms2a=${token}`, 
        },
      });
      //report
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(getBooks())
      dispatch(logInsert({ name: "insertBook", status: "success" }));
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "insertBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    // Get the token from the state
    const state = getState();
    const token = state.users.token;
    console.log("id", item._id , "token", token);
    try {
        const res =  await fetch(`http://localhost:8000/books/${item}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `ms2a=${token}`, 
        },
      }); 
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.data.message);
    // if (error.response && error.response.data.message) {
    //     return rejectWithValue(error.response.data.message)
    //   } else {
    //     return rejectWithValue(error.message)
    //   }
    }
  }
);

export const searchBooks = createAsyncThunk(
  "books/searchBooks",
  async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(
        `http://localhost:8000/books/search?q=${query.q}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filterBooks = createAsyncThunk(
  "books/filterBooks",
  async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      let url = `http://localhost:8000/books/filter?`;
      Object.keys(query).forEach((key) => {
        url += `${key}=${query[key]}&`;
      });
      const res = await fetch(url);
      //   const res = await fetch(`http://localhost:8000/books/filter?category=${query.category}&price_min=${query.price_min}&price_max=${query.price_max}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const bookSlice = createSlice({
  name: "book",
  initialState: { book: {}, books: [], isLoading: false, error: null },

  extraReducers: {
    //get book
    [getBookId.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBookId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
      console.log(state.book);
    },
    [getBookId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //get books
    [getBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //search books

    [searchBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [searchBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [searchBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //filter books

    [filterBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [filterBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [filterBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //insert book
    [insertBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [insertBook.fulfilled]: (state, action) => {
      state.isLoading = false;
     
    },
    [insertBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //delete book

    [deleteBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((el) => el._id !== action.payload.deletedBook._id);
    // state.books = state.books.map((el) => {
    //     if (el._id !== action.payload.deletedBook._id) {
    //         return el;        }
    //   });
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //update book
    [updateBook.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.books = state.books.map((el) => {
      //   if (el._id === action.payload.updatedBook._id) {
      //     return action.payload.updatedBook;
      //   }
      //   return el;
      // });
    },
    [updateBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
 
export default bookSlice.reducer;
