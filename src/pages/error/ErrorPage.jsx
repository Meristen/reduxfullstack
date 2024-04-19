import React from "react";
import Button from "../../widgets/buttons/Button";

const ErrorPage = () => {
  return (
    <div>
      Something went wrong!!!
      <Button color="green" onClick={() => window.location.reload()}>
        Try to reload
      </Button>
    </div>
  );
};

export default ErrorPage;
