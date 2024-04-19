import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import Button from "../buttons/Button";
import { getProfile } from "../../store/users/users.actions";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/users/users.slice";
import Search from "../search/Search";
const Navbar = () => {
  const dispatch = useDispatch();
  const tokens = JSON.parse(localStorage.getItem("tokens"));

  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (tokens) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  const [open, setOpen] = useState(false);
  const navbarRef = useRef(null);
  const toggle = () => {
    setOpen(!open);
  };
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div ref={navbarRef} className={styles.container}>
      <ul className={styles.navs}>
        <li>
          <NavLink to={"/"}>
            <Button style={{ color: "white" }}>Products list</Button>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/add"}>
            <Button style={{ color: "white" }}>Add productt</Button>
          </NavLink>
        </li>
      </ul>
      <Search />
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <p style={{ color: "white" }}>{currentUser}</p>
        <img
          onClick={toggle}
          className={styles.avatar}
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
          alt="avatar"
        />
      </div>
      {open && (
        <div onClick={() => setOpen(!open)} className={styles.navbar}>
          <NavLink to={"/register"}>Register</NavLink>
          <NavLink to={"/login"}>Login</NavLink>
          <span onClick={() => dispatch(logout())}>Logout</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
