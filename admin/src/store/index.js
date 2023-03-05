import { configureStore } from '@reduxjs/toolkit';
import users from './userSlice';
import books from './bookSlice';
import categories from './categorySlice';


export default configureStore({
  reducer: { users ,books,categories}
});