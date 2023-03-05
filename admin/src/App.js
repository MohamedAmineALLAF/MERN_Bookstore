import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignInSide from "./components/SignInSide";
import { useSelector } from "react-redux";
import Book from "./scenes/books";
import User from "./scenes/users";
import Category from "./scenes/categories";


function App() {


  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const {isLogedIn}=useSelector(state => state.users)


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
     
        <div className="app">
          {isLogedIn ? <Sidebar isSidebar={isSidebar} /> : <></>}
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/login" element={<SignInSide />} /> 
            {!isLogedIn ?    <Route path="/login" element={<SignInSide />} /> :  <Route path='/login' element={<Navigate to='/' />} /> }
      </Routes>
        <CssBaseline />
            <Routes>

              {isLogedIn ? <Route path="/" element={<Dashboard />} />:  <Route path='*' element={<Navigate to='/login' />} /> }
              {isLogedIn ? <Route path="/users" element={<User />} />:  <Route path='*' element={<Navigate to='/login' />} /> }
              {isLogedIn ? <Route path="/books" element={<Book />} />:  <Route path='*' element={<Navigate to='/login' />} /> }
              {isLogedIn ? <Route path="/categories" element={<Category />} />:  <Route path='*' element={<Navigate to='/login' />} /> }

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
