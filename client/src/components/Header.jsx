import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BsChevronDoubleDown } from "react-icons/bs";

const Header = ({ user, setUser }) => {
  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <a>
              <h1>{user?.fullname}</h1> <BsChevronDoubleDown />
            </a>
            <ul className="p-2 bg-base-100">
              <Link to="/">
                {user ? (
                  <ul className="p-2 bg-base-100">
                    <li>
                      <button
                        onClick={(e) => {
                          localStorage.removeItem("user");
                          setUser(null);
                        }}
                        className="btn btn-ghost"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="p-2 bg-base-100">
                    <li>
                      {" "}
                      <button className="btn btn-ghost">Login</button>
                    </li>
                  </ul>
                )}{" "}
              </Link>
              ;
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
