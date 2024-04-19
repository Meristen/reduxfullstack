import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/users/users.actions";
import { useNavigate } from "react-router-dom";
import Input from "../../widgets/inputs/Input";
import Button from "../../widgets/buttons/Button";

const RegisterPage = () => {
  const [registerObj, setRegisterObj] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    const { value, name } = e.target;
    setRegisterObj({ ...registerObj, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    for (let key in registerObj) {
      if (!registerObj[key].trim()) {
        alert("some inputs are empty");
        return;
      }
    }
    dispatch(registerUser({ ...registerObj, navigate }));
  }

  const { error } = useSelector((state) => state.users);

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: "50px", fontFamily: "cursive" }}>Register form</h2>
      {error && <h2 style={{ color: "red" }}>{error}!!!</h2>}
      <Input
        onChange={handleChange}
        value={registerObj.email}
        name="email"
        placeholder="Email"
        type="email"
      />
      <Input
        onChange={handleChange}
        value={registerObj.password}
        name="password"
        placeholder="Password"
        type="password"
      />
      <Input
        onChange={handleChange}
        value={registerObj.password_confirm}
        name="password_confirm"
        placeholder="Password confirm"
        type="password"
      />
      <Button color="blue">Register</Button>
    </form>
  );
};

export default RegisterPage;
