import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";




  export const getCategories = createAsyncThunk(
    "category/getCategories",
    async (_, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch("http://localhost:8000/categories");
        const data = await res.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const getCategoryId = createAsyncThunk(
    "category/getCategoryId",
    async (item, thunkAPI) => {
      const { rejectWithValue } = thunkAPI;
      try {
        const res = await fetch(`http://localhost:8000/category/${item}`);
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  
  export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (item, thunkAPI) => {
      const { rejectWithValue, dispatch ,getState} = thunkAPI;
      const state = getState();
      const token = state.users.token;
      try {
        const res = await fetch(`http://localhost:8000/category/${item[0]}`, {
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
        dispatch(logInsert({ name: "updateCategory", status: "success" }));
        dispatch(getCategories())
        return data;
      } catch (error) {
        dispatch(logInsert({ name: "updateCategory", status: "failed" }));
        return rejectWithValue(error);
      }
    }
  );
  

  export const insertCategory = createAsyncThunk(
    "category/insertCategory",
    async (newData, thunkAPI) => {
      const { rejectWithValue, getState, dispatch } = thunkAPI;
      const state = getState();
       const token = state.users.token;
      try {
        const res = await fetch("http://localhost:8000/categories", {
          method: "POST",
          body: JSON.stringify(newData),
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
        dispatch(logInsert({ name: "insertCategory", status: "success" }));
        dispatch(getCategories())
        return data;
      } catch (error) {
        dispatch(logInsert({ name: "insertCategory", status: "failed" }));
        return rejectWithValue(error.message);
      }
    }
  );
  

  export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (item, thunkAPI) => {
      const { rejectWithValue, getState ,dispatch} = thunkAPI;
      // Get the token from the state
      const state = getState();
      const token = state.users.token;
      try {
          const res =  await fetch(`http://localhost:8000/category/${item}`, {
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
        dispatch(getCategories())

        return data;
      } catch (error) {
        return rejectWithValue(error.data.message);
     
      }
    }
  );
  




  // ****************************************************************




const CategorySlice = createSlice({
    name: "category",
    initialState: { category: {}, categories: [], isLoading: false, error: null },
  
    extraReducers: {
      //get new
      [getCategoryId.pending]: (state, action) => {
        state.isLoading = true;
        state.error = null;
      },
      [getCategoryId.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.category = action.payload;
      },
      [getCategoryId.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      //get Category
      [getCategories.pending]: (state, action) => {
        state.isLoading = true;
        state.error = null;
      },
      [getCategories.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.categories = action.payload.data;
      },
      [getCategories.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  
  
      //insert new
      [insertCategory.pending]: (state, action) => {
        state.isLoading = true;
        state.error = null;
      },
      [insertCategory.fulfilled]: (state, action) => {
        state.isLoading = false;
       
      },
      [insertCategory.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      //delete new
      [deleteCategory.pending]: (state, action) => {
        state.isLoading = true;
        state.error = null;
      },
      [deleteCategory.fulfilled]: (state, action) => {
        state.isLoading = false;
        // state.Category = state.Category.filter((el) => el._id !== action.payload.category._id);
      
      },
      [deleteCategory.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      //update new
      [updateCategory.pending]: (state, action) => {
        state.isLoading = true;
        state.error = null;
      },
      [updateCategory.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.Category = state.Category.map((el) => {
          if (el._id === action.payload.category._id) {
            return action.payload.category;
          }
          return el;
        });
      },
      [updateCategory.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
  });
  
  
  export default CategorySlice.reducer;
  