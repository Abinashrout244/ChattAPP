import React from "react";

const FullPageSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-2xl font-semibold text-gray-700">{label}</p>
    </div>
  );
};

export default FullPageSpinner;
