import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const FrontPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/record");
  //   }
  // }, [navigate, userInfo]);

  return (
    <main className="flex flex-col items-center ">
      <h1 className="font-bold text-3xl mt-10">
        Manage your employee data with simplicity
      </h1>
      <p className="text-xl text-justify mx-auto my-10 w-1/2 leading-loose ">
        Fulfill your organization's management needs with this website. Gain
        better understanding of your entire workforce with a proper system. Get
        started by creating an account or login if you already have one.
      </p>
      <NavLink
        to="/register"
        className="m-2 p-5 text-white bg-purple-700  hover:bg-purple-800"
      >
        SIGN UP FOR FREE
      </NavLink>
    </main>
  );
};

export default FrontPage;
