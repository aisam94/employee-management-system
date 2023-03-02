import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { isExpired } from "react-jwt";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const token = userInfo ? userInfo.token : "";

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo && userInfo.length !== 0 && !isExpired(token)) {
      navigate("/record");
    }
  }, [navigate, userInfo]);

  return (
    <div className="mb-12">
      <main className="flex flex-col items-center justify-center  space-y-5 pt-4 mt-5 md:mt-20">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>

        {/* Form */}
        <form
          className="flex flex-col space-y-4"
          onSubmit={(event) => submit(event)}
        >
          {/*Input Form*/}
          <div className="flex flex-col shadow-md ">
            {/*Email*/}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary"
              onChange={(event) => change(event)}
              required
            />

            {/*Password*/}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="px-2 py-1 border border-gray appearance-none focus:outline-none focus:border-primary"
              onChange={(event) => change(event)}
              required
            />
          </div>

          {/* Submit button */}
          <input
            type="submit"
            value="LOGIN"
            className="py-2 text-white bg-secondary  hover:bg-secondary-focus"
          />
        </form>

        {/* Remember me? */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 text-primary border-gray  focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block">
              Remember me
            </label>
          </div>

          {/* Forgot password */}
          <button className="text-primary hover:text-primary-focus">
            Forgot your password?
          </button>
        </div>

        {/* Dont have acc. register here */}
        <NavLink to="/register" className="text-primary hover:text-primary-focus">
          Do not have an account? Register here.
        </NavLink>
      </main>
    </div>
  );
};

export default Login;
