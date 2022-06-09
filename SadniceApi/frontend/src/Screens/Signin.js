import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { signin } from "../actions/userActions";
// import Header from "../components/Header";

const Signin = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  //   const userSignin = useSelector((state) => state.userSignin);
  //   const { userInfo } = userSignin;
  const { userInfo } = 1;

  //   const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    //     dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div>
      {/* <Header></Header> */}

      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>

        <div>
          <label htmlFor="email">Email adress</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>
              Create you account
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
