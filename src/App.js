import { RouterProvider } from "react-router-dom";
import { router } from "./router/MainRoutes";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
