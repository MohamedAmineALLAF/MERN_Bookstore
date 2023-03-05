import React, { useEffect } from "react";
import "./List.scss";
import Cardb from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/bookSlice";


const List = ({ subCats, maxPrice, sort, catId }) => {
 {/*  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  ); */}

  const { isLoading, books,book } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (

    

    <div className="list">
      {isLoading
        ? "loading"
        : books?.map((item) => <Cardb item={item} key={item._id} />)}
    </div>
  );
};

export default List;
