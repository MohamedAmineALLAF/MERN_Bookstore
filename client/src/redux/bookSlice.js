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

export const getFeatBooks = createAsyncThunk(
  "book/getFeatBooks",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:8000/featbooks");
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
        const res = await fetch(`http://localhost:8000/book/${item._id}`);
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
        const { rejectWithValue ,dispatch} = thunkAPI;
        try {
            const res = await fetch(`http://localhost:8000/books/${item[0]._id}`, {
                method: "PUT",
                body: JSON.stringify(item[1]),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
            }
            });
          
            const data = await res.json();
            dispatch(logInsert({ name: "updateBook", status: "success" }));
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


export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (item, thunkAPI) => {

    const { rejectWithValue } = thunkAPI;
    console.log("id",item._id);
    try {
      await fetch(`http://localhost:8000/books/${item._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const searchBooks = createAsyncThunk('books/searchBooks', async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8000/books/search?q=${query.q}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
});


export const filterBooks = createAsyncThunk('books/filterBooks', async (query, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        let url = `http://localhost:8000/books/filter?`;
        Object.keys(query).forEach(key => {
            url += `${key}=${query[key]}&`;
        });
        const res = await fetch(url);
    //   const res = await fetch(`http://localhost:4000/books/filter?category=${query.category}&price_min=${query.price_min}&price_max=${query.price_max}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
});


const bookSlice = createSlice({
  name: "book",
  initialState: { book: {} ,books: [], isLoading: false, error: null  },

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

    //feat
    [getFeatBooks.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getFeatBooks.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    },
    [getFeatBooks.rejected]: (state, action) => {
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
        if(action.payload.book){
            state.books.push(action.payload.book);
        }
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
        state.books = state.books.filter((el) => el._id !== action.payload._id);
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
        console.log("action",action.payload);
        state.books = state.books.map((el) => {
            if (el._id === action.payload._id) {
                return action.payload;
            }
            return el;
        })
        console.log("yooooo",state.books);
    },
    [updateBook.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    }
  },
});

export default bookSlice.reducer;
