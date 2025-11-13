import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <RingLoader color="green"/>
    </div>
  );
};

export default Loading;
