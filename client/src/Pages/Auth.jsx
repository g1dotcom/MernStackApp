import React, { useEffect, useState } from "react";
import { login, register } from "../axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Auth = ({ setUser }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [signin, setSignin] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    correctionPassword: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setFormData({ ...formData, phoneNumber: phoneNumber });
  }, [phoneNumber]);

  useEffect(() => {
    if (
      formData.password.length >= 6 &&
      formData.correctionPassword === formData.password
    ) {
      setDisabled(false);
    }
  }, [formData]);

  const navigate = useNavigate();

  console.log(formData);
  return (
    <div>
      <div className="flex flex-col justify-center items-center w-screen h-screen font-serif ">
        <form
          {...(signin
            ? {
                onSubmit: (e) => {
                  e.preventDefault();
                  register(formData)
                    .then((res) => {
                      toast.success("You have successfully registered");
                      window.location.reload();
                    })
                    .catch((err) => {
                      toast.error(err.response.data.message);
                    });
                  navigate("/");
                },
              }
            : {
                onSubmit: (e) => {
                  e.preventDefault();
                  login(formData)
                    .then((res) => {
                      localStorage.setItem(
                        "user",
                        JSON.stringify(res.data.user)
                      );
                      setUser(res.data.user);
                      navigate("/home");
                    })
                    .catch((err) => {
                      toast.error(err.response.data.message);
                    });
                },
              })}
          className="flex flex-col justify-center items-center  w-1/2 bg-primary p-5 rounded-2xl"
        >
          <h1 className="text-white my-5 font-bold tracking-widest">
            {signin ? "SING IN" : "LOGIN"}
          </h1>
          {signin ? (
            <div className="form-control w-full max-w-xs ">
              <label className="label text-white">Username</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                type="fullname"
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
          {formData.password.length < 6 ? (
            <span className=" text-white">
              şifreniz en az 6 haneli olmalıdır
            </span>
          ) : null}
          <div className="form-control w-full max-w-xs">
            <label className="label text-white">Password Correct</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, correctionPassword: e.target.value })
              }
              type="password"
              placeholder="enter password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {formData.correctionPassword !== formData.password ? (
            <span>Sifeler uyusmuyor</span>
          ) : null}

          {signin ? (
            <div className="form-control w-full max-w-xs">
              <label className="label text-white">Phone Number</label>
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                defaultCountry="TR"
              />
            </div>
          ) : null}
          <button
            type="submit"
            disabled={
              formData.email === "" ||
              formData.password === "" ||
              formData.password.length < 6 ||
              (signin && formData.fullname === "") ||
              (signin && formData.phoneNumber === "")
            }
            className="rounded-full btn btn-success my-5"
          >
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
