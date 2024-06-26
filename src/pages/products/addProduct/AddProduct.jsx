import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../../widgets/inputs/Input";
import Button from "../../../widgets/buttons/Button";
import {
  addProduct,
  getCategories,
} from "../../../store/products/products.actions";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const { categories } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  function handleChange(e) {
    const { value, name, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  }

  console.log(product);

  function handleSubmit(e) {
    e.preventDefault();
    for (let key in product) {
      if (key !== "image" && !product[key].trim()) {
        alert("some inputs are empty");
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("image", product.image);

    dispatch(addProduct(formData));
    setProduct({
      category: "",
      title: "",
      description: "",
      price: "",
      image: null,
    });

    navigate("/");
    console.log(product);
  }

  const { error } = useSelector((state) => state.products);

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: "50px", fontFamily: "cursive" }}>AddProduct</h2>
      {error && <h2 style={{ color: "red" }}>{error}!!!</h2>}
      <Input
        onChange={handleChange}
        value={product.title}
        name="title"
        placeholder="title"
        type="text"
      />
      <Input
        onChange={handleChange}
        value={product.description}
        name="description"
        placeholder="description"
        type="text"
      />
      <Input
        onChange={handleChange}
        value={product.price}
        name="price"
        placeholder="price"
        type="text"
      />
      <select onChange={handleChange} name="category" id="">
        {categories.map((cat) => (
          <option value={cat.id} key={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>
      <input
        onChange={handleChange}
        name="image"
        accept="image/*"
        type="file"
      />
      <Button color="green">Add</Button>
    </form>
  );
};

export default AddProduct;
