import React, { useState } from "react";
import { login } from "../axios";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [signin, setSignin] = useState(true);
  const navigate = useNavigate();

  console.log(formData);
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-screen h-screen font-serif ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(formData)
              .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                console.log(res.data.user);
                setUser(res.data.user);
                navigate("/");
              })
              .catch((err) => {
                console.log(err.response.data.message);
              });
          }}
          className="flex flex-col justify-center items-center  w-1/2 bg-primary p-5 rounded-2xl"
        >
          <h1 className="text-white my-5 font-bold tracking-widest">
            {signin ? "SING IN" : "LOGIN"}
          </h1>
          {signin ? (
            <div className="form-control w-full max-w-xs ">
              <label className="label text-white">Username</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          ) : null}
          <div className="form-control w-full max-w-xs">
            <label className="label text-white">Email</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              placeholder="enter email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label text-white">Password</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="enter password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {signin ? (
            <div className="form-control w-full max-w-xs">
              <label className="label text-white">Phone Number</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          ) : null}
          <button type="submit" className="rounded-full btn btn-success my-5">
            {signin ? "SING IN" : "LOGIN"}
          </button>
          <h1 className="text-white">
            {signin ? (
              <span onClick={() => setSignin(false)}>Have Already Account</span>
            ) : (
              <span onClick={() => setSignin(true)}> Sign In </span>
            )}
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Auth;
