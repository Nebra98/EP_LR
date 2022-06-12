import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Signin = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getResult, setGetResult] = useState(null);

  const formatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  async function submitHandler(e) {
    e.preventDefault();
    console.log(username);
    fetch("http://localhost:5000/login", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "null",
        Authorization: "Basic " + btoa(username + ":" + password),
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((json) => localStorage.setItem("userInfo", JSON.stringify(json)))
      .then((json) => window.location.reload());
  }

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>

        <div>
          <label htmlFor="username">Email adress</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
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
