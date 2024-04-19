import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../store/products/products.actions";
import Button from "../../../widgets/buttons/Button";
import Cards from "../../../widgets/productCard/Cards";
import styles from "./products.module.css";
import { useSearchParams } from "react-router-dom";
const ProductsList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log("qwert");
  useEffect(() => {
    setSearchParams({ page });
  }, [page]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, searchParams]);

  const { products } = useSelector((state) => state.products);
  // console.log(products);
  return (
    <>
      <div className={styles.containerCard}>
        {products?.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
      <div>
        <Button onClick={() => setPage(page - 1)}>Prev</Button>
        <span>{page}</span>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </>
  );
};

export default ProductsList;
