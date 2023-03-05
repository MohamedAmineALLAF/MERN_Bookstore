import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import List from "../../components/List/List";
import useFetch from "../../hooks/useFetch";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { filterBooks, getBooks } from "../../redux/bookSlice";
import "./Search.scss";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getCategories } from "../../redux/categorySlice";

const Search = () => {

    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }

  let query = useQuery();
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [value, setValue] = React.useState([20, 37]);
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


  return (
    <div className="products">
      <div className="left">
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
        
        <div className="filterItem" >
          <h3>Filter by category</h3>
          <Box sx={{
            marginBottom: '10px',
            maxWidth: '80%'
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

          <h3>Filter by price</h3>
          <Box sx={{ width: 300 }}>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}

          />
          <Button variant="contained" onClick={handleSubmitFilter} style={{
          marginTop:15,
          width:100
        }} disableElevation
        >Filter</Button>

        </Box>
         
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
        <div style={{
            marginTop:40,
            marginBottom:40,
            textAlign: "center"
        }}>
            <h2>Search results for '{query.get('q')}'</h2>
        </div>
        
        <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats}/>
      </div>
    </div>
  );
};

export default Search;
