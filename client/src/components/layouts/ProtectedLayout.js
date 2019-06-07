import React from "react";
import { Route } from "react-router-dom";
import ProtectedHeader from "./headers/ProtectedHeader";

const ProtectedLayout = ({ component: Component, ...rest }) => {

  const layout = matchProps => (
      <div>
          <ProtectedHeader />
          <div className="container">
              <Component {...matchProps} />
          </div>
      </div>
  );

  return (
    //todo figure out render prop and ...rest
    <Route {...rest} render={layout} />
  );
};

export default ProtectedLayout;
