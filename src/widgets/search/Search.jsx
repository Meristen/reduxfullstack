import React, { useEffect, useState } from "react";
import styles from "./search.module.css";
import Input from "../inputs/Input";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/products/products.actions";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setSearchParams({ title: value });
    dispatch(getProducts());
  }, [value]);
  return (
    <div>
      {" "}
      <h4 style={{ color: "white" }}>Search ...</h4>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ border: "1px solid white" }}
      />
    </div>
  );
};

export default Search;
