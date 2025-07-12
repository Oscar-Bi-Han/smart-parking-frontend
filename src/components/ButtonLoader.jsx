import React from "react";

const ButtonLoader = () => (
  <div className="flex items-center space-x-1 p-1">
    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
    <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
  </div>
);

export default ButtonLoader;
