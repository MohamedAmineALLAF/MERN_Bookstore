import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { filterBooks, getBooks, searchBooks } from "../../redux/bookSlice";
import "./Products.scss";
import { Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { getCategories } from "../../redux/categorySlice";
import SearchIcon from "@mui/icons-material/Search";
import { Collapse, Space } from 'antd';
const { Panel } = Collapse;

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [value, setValue] = React.useState([20, 80]);
  const { isLoading, categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, [dispatch]);



 
function valuetext(value) {
  return `${value} MAD`;
}

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  const [category, setCategory] = React.useState('');

  const handleChangeSelect = (event) => {
    setCategory(event.target.value);
    console.log(category);

  };

  

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    const query = {
      category: category,
        
      price_min:value[0],

        price_max:value[1]
    };
    console.log(value);

    dispatch(filterBooks(query));
   
};

const inputHandler = (e) => {
  setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};


const [input, setInput] = useState({
  q:""
 });

const handleSubmitSearch = (e) => {
  e.preventDefault();

  const query = {
   
    q:input.q
    
  };
  dispatch(searchBooks(query));
  };





  return (
    <div className="products">
      <div className="left" style={{
        padding:30
      }}>
        {/* <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item}>
              <input
                type="checkbox"
                id={item}
                value={item}
                onChange={handleChange}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>*/}

<h2 style={{
  marginBottom:15
}} >Filter options</h2>

    <Collapse defaultActiveKey={['1']} style={{
      marginBottom:10
    }}>
          <Panel header="Filter by category" key="1">
          <Box sx={{
            marginBottom: '10px',
            maxWidth: '90%'
          }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Age"
                onChange={handleChangeSelect}
                
              >
                {isLoading ? "Loading..." : categories?.map((item)=> <MenuItem value={item._id} >{item.name}</MenuItem> )}
                
              </Select>
            </FormControl>
          </Box>
          </Panel>
        </Collapse>
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Filter by price" key="1">
          <Box sx={{ width: 300 }}>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}

          />
          

        </Box>
          </Panel>
        </Collapse>
        
        <div className="filterItem" >
        <Button variant="contained" onClick={handleSubmitFilter} style={{
          marginTop:15,
          width:'100%'
        }} disableElevation
        >Filter</Button>
          
         
        </div>
      {/*  <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>   */}
      </div>
      <div className="right">
        <img
          className="catImg"
          src="/img/banner.jpg"
          alt=""
        />

{/*<form onSubmit={handleSubmitSearch}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="search book" onChange={inputHandler}  value={input.q}
              name="q" />
                    </div>
                    <button type="submit" className="btn btn-primary">search</button>
                </form>

                
                <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      elevation={2}
    >
     
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={inputHandler} 
        name="q"
        value={input.q}
        
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmitSearch}>
        <SearchIcon />
      </IconButton>
      
    </Paper> */}
                
                
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats}/>

       
      </div>
    </div>
  );
};

export default Products;
