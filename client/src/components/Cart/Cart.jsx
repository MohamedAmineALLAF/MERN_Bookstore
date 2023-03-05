import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  console.log(products);

  const handleCheckout = async () => {
    await axios
      .post(`http://localhost:4000/paybook`, {
        products: products,
        userId: 'iduser',
        total: totalPrice()
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  
  const handlePayment = async () => {
    try {
      
      const res = await axios.post('http://localhost:8000/paybook', {
        products: products,
        userId: 'iduser',
        total: totalPrice()
    });
      console.log(res);
      window.location = res.data.url;

    } catch (err) {
      console.log(err);
    }
  };




  return (
    <div className="cart">
      <h1 style={{
        textAlign: 'center',
      }} >Shopping cart</h1>

      <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 350,borderBottom:'1px solid #e0e0e0' ,marginBottom:5}} aria-label="simple table">
                    
                    <TableBody>
                      {products.map((item) => (
                          <TableRow
                          key={item.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center"><img alt="example" src={item.img} style={{
                            width: '70px',
                            height: '80px',
                          }}/></TableCell>
                          <TableCell align='center'>
                              <h3>{item.title}</h3>
                              <p>{item.quantity} x <b>${item.price}</b></p>
                          </TableCell>
                          
                          
                          <TableCell align="center">
                          <ClearIcon
                          style={{
                            cursor: 'pointer',

                          }}
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
          
                      
          
                          </TableCell>
          
                          </TableRow>
          
                    
                  ))}
                    
                    </TableBody>
                    </Table>
            </TableContainer>

      
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
