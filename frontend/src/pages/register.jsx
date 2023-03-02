import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { isExpired } from "react-jwt";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const token = userInfo ? userInfo.token : "";

  const submit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("password not matching");
    } else {
      dispatch(register(name, email, company, password));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, company, password, confirmPassword } = formData;

  const change = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (userInfo && userInfo.length !== 0 && !isExpired(token)) {
      navigate("/record");
    }
  }, [navigate, userInfo]);

  return (
    <div className="mb-12">
      <main className="flex flex-col items-center justify-center space-y-5 pt-4 mt-5 md:mt-20">
        <h1 className="font-bold text-3xl">Register your account</h1>
        {/* Form */}
        <form className="flex flex-col space-y-4" onSubmit={(e) => submit(e)}>
          <div className="shadow-md flex flex-col">
            {/*Username*/}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              className="appearance-none border border-gray py-1 px-2 focus:outline-none focus:border-primary"
              onChange={(e) => change(e)}
              required
            />

            {/*Email*/}
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              className="appearance-none border border-gray py-1 px-2 focus:outline-none focus:border-primary"
              onChange={(e) => change(e)}
              required
            />

            {/*Company name*/}
            <input
              type="text"
              placeholder="Company name"
              name="company"
              value={company}
              className="appearance-none border border-gray py-1 px-2 focus:outline-none focus:border-primary"
              onChange={(e) => change(e)}
              required
            />

            {/*Password*/}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="appearance-none border border-gray py-1 px-2 focus:outline-none focus:border-primary"
              onChange={(e) => change(e)}
              required
            />

            {/*Password 2*/}
            <input
              type="password"
              placeholder="Reenter password"
              name="confirmPassword"
              value={confirmPassword}
              className="appearance-none border border-gray py-1 px-2 focus:outline-none focus:border-primary"
              onChange={(e) => change(e)}
              required
            />
          </div>
          {/* Register button */}
          <input
            className="text-white py-4 bg-secondary hover:bg-secondary-focus"
            type="submit"
            value="REGISTER"
          />
        </form>
        {/* Already have an account?  */}
        <NavLink to="/login" className="text-primary hover:text-primary-focus">
          Already have an account? Sign in here.
        </NavLink>
      </main>
    </div>
  );
};

export default Register;
