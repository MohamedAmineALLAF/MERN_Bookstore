import React, { useEffect } from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { getBooks } from "../../redux/bookSlice";
import { Col, message, Row } from "antd";

const Product = () => {
  const {id} = useParams();
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const { isLoading, books } = useSelector((state) => state.books);
  const [book, setbook ]=useState({})
  console.log(books);

  const dispatch = useDispatch();


  useEffect (() => {
    if(books.length==0)
    {
        dispatch(getBooks())
    }
    else 
    {
    setbook(books.find(o=>o._id==id))
    }
    }, [books])

   

console.log(id);
console.log(book);

  
  {/**/}const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    dispatch(
      addToCart({
        id: book._id,
        title: book.title,
        desc: book.description,
        price: book.price,
        img: book.publisher,
        quantity,
      })
    )

    message.success('Book has been added to cart')

  };

  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            
            <div className="mainImg">
              <img
                src={
                  book.publisher
                }
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{book.title}</h1>
            <p style={{
              color: 'black',
              marginBottom:'20px'
            }}>{book.description}</p>
            
            <div>
            <Row justify="space-between" style={{
              marginBottom:'20px'
            }}>
              <Col span={8}>
                <p>Author : <b>{book.author}</b> </p> 
                
              </Col>
              <Col span={8}>
              <p>ISBN : <b>{book.ISBN}</b> </p> 
              </Col>
              <Col span={8}>

              <p>Edition : <b>{book.edition}</b> </p> 
              </Col>
              
            </Row>
            </div>

            
           
            <hr />
            <div className="info" style={{
              padding:10
            }}>

            <Row justify="space-around">
              <Col span={8}>
                <h1 style={{
                  color:'black'
                }}><b>${book.price}</b> </h1> 
                
              </Col>
              <Col span={8}>
              <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
            </div> 
              </Col>
              <Col span={8}>
              <button
              className="add"
              onClick={success
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
              </Col>
              
            </Row>

            
            
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
