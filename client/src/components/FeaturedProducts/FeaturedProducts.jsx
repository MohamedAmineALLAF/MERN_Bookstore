import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getFeatBooks } from "../../redux/bookSlice";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  const { isLoading, books } = useSelector((state) => state.books);
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeatBooks());
  }, [dispatch]);



  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        
      </div>
      <div className="bottom">
        {isLoading
          ? "loading"
          : books?.map((item) => <Card item={item} key={item.id} />)}

          


      </div>
    </div>
  );
};

export default FeaturedProducts;
