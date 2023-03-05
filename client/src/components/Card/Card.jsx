import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartReducer";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { message } from "antd";



const Card = ({ item }) => {
  const dispatch = useDispatch();

  const success = () => {
    dispatch(
      addToCart({
        id: item._id,
        title: item.title,
        desc: item.description,
        price: item.price,
        img: item.publisher,
        quantity:1,
      })
    )

    message.success('Book has been added to cart')

  };
  
  return (
    <>
    
      <div className="card">
      <Link className="link" to={`/book/${item._id}`}>
        <div className="image" >
         
          <img
            src={
              item.publisher
            }
            alt=""
            className="mainImg"
          />
          
        </div>
        <p style={{
          textAlign:"center",
          marginBottom: "10px",
          fontSize:'20px',
          fontFamily:'Josefin Sans',
          fontWeight:'bold',
         

        }} >{item.title}</p>
        <h3>${item.price}</h3>
        </Link>
        <Button variant="contained" onClick={success} disableElevation fullWidth
        >ADD TO CART</Button>
        

      </div>
    
   
    </>
  );
};

export default Card;
