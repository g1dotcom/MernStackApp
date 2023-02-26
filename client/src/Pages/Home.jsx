import React from "react";

const Home = ({ user }) => {
  return (
    <div>
      <h1>{user?.email}</h1>
      <h1>{user?.fullname}</h1>
    </div>
  );
};

export default Home;
