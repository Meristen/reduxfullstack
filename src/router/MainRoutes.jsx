import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../pages/products/addProduct/AddProduct";
import RegisterPage from "../pages/auth/RegisterPage";
import LoginPage from "../pages/auth/LoginPage";
import MainLayout from "./MainLayout";
import ErrorPage from "../pages/error/ErrorPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import ProductsList from "../pages/products/productList/ProductsList";
import EditProduct from "../pages/products/edit/EditProduct";

export const router = createBrowserRouter([
  {
    id: "root",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    children: [
      { path: "/", element: <ProductsList /> },
      { path: "/add", element: <AddProduct /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/edit/:id", element: <EditProduct /> },
    ],
  },
]);
