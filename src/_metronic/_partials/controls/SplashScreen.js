import React from "react";
//import {CircularProgress} from "@material-ui/core";
import Spinner from './Spinner/Spinner';


export function SplashScreen() {
  return (
    <>
      {/* <div className="splash-screen">
        <CircularProgress className="splash-screen-spinner" />
      </div> */}
      <Spinner/>
    </>
  );
}
