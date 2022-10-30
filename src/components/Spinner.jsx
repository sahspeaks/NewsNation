import React from "react";
import loading from "./loading1.gif";

const Spinner = () => {

  return (
    <div className="text-center">
      <img className="my-2" src={loading} alt="loading" />
    </div>
  );

}
export default Spinner;