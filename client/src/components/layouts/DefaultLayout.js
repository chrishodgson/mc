import React from "react";
import { Route } from "react-router-dom";
import DefaultHeader from "./headers/DefaultHeader";

const DefaultLayout = ({ component: Component, ...rest }) => {

  const layout = matchProps => (
      <div className="default-layout">
          <DefaultHeader />
          <div className="container mt-5 pt-5">
              <Component {...matchProps} />
          </div>
      </div>
  );

  return (
    //todo figure out render prop and ...rest
    <Route {...rest} render={layout} />
  );
};

export default DefaultLayout;