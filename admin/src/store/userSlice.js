import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export const getUsers = createAsyncThunk(
  "users/getUsers",
  
  async (_, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
        try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getUserId = createAsyncThunk(
  "users/getUserId",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:8000/api/users/admin/${item}`,{
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
           Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const makeActive = createAsyncThunk(
  "users/makeActive",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
    try {
      const res = await fetch(`http://localhost:8000/api/users/admin/${item}/unblock`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(logInsert({ name: "updateUser", status: "success" }));

      return data;
    } catch (error) {
      dispatch(logInsert({ name: "updateUser", status: "failed" }));
      return rejectWithValue(error);
    }
  }
);


export const removeActive = createAsyncThunk(
  "users/removeActive",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
    try {
      const res = await fetch(`http://localhost:8000/api/users/admin/${item}/block`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(logInsert({ name: "updateUser", status: "success" }));

      return data;
    } catch (error) {
      dispatch(logInsert({ name: "updateUser", status: "failed" }));
      return rejectWithValue(error);
    }
  }
);



export const removeAdmin = createAsyncThunk(
  "users/removeAdmin",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
    try {
      const res = await fetch(`http://localhost:8000/api/users/admin/${item}/removeadmin`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(logInsert({ name: "updateUser", status: "success" }));

      return data;
    } catch (error) {
      dispatch(logInsert({ name: "updateUser", status: "failed" }));
      return rejectWithValue(error);
    }
  }
);

export const makeAdmin = createAsyncThunk(
  "users/makeAdmin",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
    try {
      const res = await fetch(`http://localhost:8000/api/users/admin/${item}/makeadmin`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(logInsert({ name: "updateUser", status: "success" }));

      return data;
    } catch (error) {
      dispatch(logInsert({ name: "updateUser", status: "failed" }));
      return rejectWithValue(error);
    }
  }
);




export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (item, thunkAPI) => {
    const { rejectWithValue, dispatch ,getState} = thunkAPI;
    const state = getState();
    const token = state.users.token;
    try {
      const res = await fetch(`http://localhost:8000/api/users/admin/${item[0]}`, {
        method: "PUT",
        body: JSON.stringify(item[1]),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      dispatch(logInsert({ name: "updateUser", status: "success" }));

      return data;
    } catch (error) {
      dispatch(logInsert({ name: "updateUser", status: "failed" }));
      return rejectWithValue(error);
    }
  }
);



export const login = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
console.log(credentials);
        const state = getState();
        const token = state.users.token;        
      const res = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${token}` ,          
        },
      });
      //report
     
      const data = await res.json();
      if (res.status >= 400) {
        return rejectWithValue(data.message);
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('isLogedIn', true)
      dispatch(logInsert({ name: "login", status: "success" }));
      console.log(data);
      return data;
    } catch (error) {
      dispatch(logInsert({ name: "login", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);


export const register = createAsyncThunk(
  "user/register",
  async (credentials, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      // const state = getState();
      //   const token = state.users.token;       
        const res = await fetch("http://localhost:8000/api/users/signup",
        {
          method: "POST",
          body: JSON.stringify(credentials),
          
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // "Authorization": `Bearer ${token}` ,          
           }
        });
       
        const data = await res.json();
        if (res.status >= 400) {
          return rejectWithValue(data.message);
        }
        // localStorage.setItem('token', data.token)
        dispatch(getUsers());

        dispatch(logInsert({ name: "register", status: "success" }));

        console.log(data);
        return data;

    } catch (error) {
        dispatch(logInsert({ name: "register", status: "failed" }));
        return rejectWithValue(error.message);
    }

  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState,dispatch } = thunkAPI;
    // Get the token from the state
    const state = getState();
    const token = state.users.token;
    console.log("id", item , "token", token);
    try {
        const res =  await fetch(`http://localhost:8000/api/users/admin/${item}`, {
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
      dispatch(getUsers());

      return data;
    } catch (error) {
      return rejectWithValue(error.data.message);

    }
  }
);
const token = localStorage.getItem('token')
  ? localStorage.getItem('token')
  : null


  const isLogedIn = localStorage.getItem('isLogedIn')
  ? localStorage.getItem('isLogedIn')
  : false

const initialState = {
    isLoading: false,
    user: null,
    token,
    error: null,
    success: false,
    users: [],
    isLogedIn,
    isActive:false
  }


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token') // deletes token from storage
      localStorage.removeItem('isLogedIn') // deletes isLogedIn
      Cookies.remove("ms2a") // deletes token from cookies
      state.user = null
    //   state.token = null
      state.user = null
      state.error = null
      state.isLoading = false
      state.isLogedIn =false
    },
  },

  extraReducers: {
    //get User
    [getUserId.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },

    [getUserId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isMember = action.payload.user.isMember
    },
    [getUserId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //get Users
    [getUsers.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      console.log( "test" ,state.users);

    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //login
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogedIn =true;
      state.token = action.payload.token;

      // state.user = action.payload.user
      
      Cookies.set("ms2a", action.payload.token);
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
 
    //register
    [register.pending]: (state, action) => {
        state.isLoading = true;

        state.error = null;
    },
    [register.fulfilled]: (state, action) => {
        state.isLoading = false;
        // state.token = action.payload.token;
        // if (action.payload.newUser) {
        //   state.users.push(action.payload.newUser);
        // }
        // Cookies.set("ms2a", action.payload.token);

}
,
    [register.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    }
    ,

    //update user
    [updateUser.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((el) => {
        if (el._id === action.payload.updatedUser._id) {
          return action.payload.updatedUser;
        }
        return el;
      });
    },
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //update user
    [makeAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [makeAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((el) => {
        if (el._id === action.payload.updatedUser._id) {
          return action.payload.updatedUser;
        }
        return el;
      });
    },
    [makeAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //update user
    [removeAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [removeAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((el) => {
        if (el._id === action.payload.updatedUser._id) {
          return action.payload.updatedUser;
        }
        return el;
      });

    },
    [removeAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //update user
    [makeActive.pending]: (state, action) => {
      state.isLoading = true;
      state.isActive=true;
      state.error = null;
    },
    [makeActive.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((el) => {
        if (el._id === action.payload.updatedUser._id) {
          return action.payload.updatedUser;
        }
        return el;
      });
    },
    [makeActive.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    //update user
    [removeActive.pending]: (state, action) => {
      state.isLoading = true;
      state.isActive=false;
      state.error = null;
    },
    [removeActive.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((el) => {
        if (el._id === action.payload.updatedUser._id) {
          return action.payload.updatedUser;
        }
        return el;
      });
    },
    [removeActive.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    

     //delete User
     [deleteUser.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.users = state.users.filter((el) => el._id !== action.payload.deletedUser._id);
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
}
}
);
export const userAction = userSlice.actions
export default userSlice.reducer;
