import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { NavLink, useNavigate } from "react-router-dom";
import { UserGroupIcon } from "@heroicons/react/solid";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-purple-700 shadow-lg text-white py-3 px-2">
      <div className="flex items-center">
        <UserGroupIcon className="h-9 w-9 mx-4" onClick={() => navigate("/")} />
        {userInfo && <h1 className="text-lg">{userInfo.company}</h1>}
      </div>

      <div className="flex ">
        {/* <NavLink className="mx-2" to="/about">
          <h1>About</h1>
        </NavLink> */}
        {userInfo === undefined || userInfo.length === 0 ? (
          <div className="flex">
            <NavLink className="mx-2" to="/login">
              <h1>Sign In</h1>
            </NavLink>
            <NavLink className="mx-2 text-orange-200 font-bold" to="/register">
              <h1>Free Sign Up </h1>
            </NavLink>
          </div>
        ) : (
          <div className="flex">
            <NavLink className="mx-2" to="/department">
              <h1>Departments</h1>
            </NavLink>
            <NavLink className="mx-2" to="/roles">
              <h1>Roles</h1>
            </NavLink>
            <NavLink className="mx-2" to="/record">
              <h1>Employee records</h1>
            </NavLink>
            <button className="text-orange-200 font-bold" onClick={logOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
