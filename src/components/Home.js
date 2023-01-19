import React from "react";

const Home = () => {
  return (
    <div>
      <h1>URL - {process.env.REACT_APP_API_URL}</h1>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
