import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { signin } from "../actions/userActions";
// import Header from "../components/Header";

const Signin = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const username = useRef(null);
  // const password = useRef(null);
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
      .then((json) =>
        localStorage.setItem("token", JSON.stringify(json.token))
      );
    // const user = username.current.value;
    // if (user) {
    //   try {
    //     let url = new URL("http://localhost:5000/login");
    //     const params = { korisnicko_ime: user };
    //     url.search = new URLSearchParams(params);
    //     console.log(fetch(url, { mode: "no-cors" }));
    //     const res = await fetch(url, {
    //       mode: "no-cors",
    //     });
    //     if (!res.ok) {
    //       const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //       throw new Error(message);
    //     }
    //     const data = await res.json();
    //     console.log(data);
    //     const result = {
    //       status: res.status + "-" + res.statusText,
    //       headers: {
    //         "Content-Type": res.headers.get("Content-Type"),
    //         "Content-Length": res.headers.get("Content-Length"),

    //         Authorization: "Basic " + btoa("username:password"),
    //       },

    //       data: data,
    //     };
    //     setGetResult(formatResponse(result));
    //   } catch (err) {
    //     setGetResult(err.message);
    //   }
    // }
  }

  return (
    <div>
      {/* <Header></Header> */}

      <form className="form">
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
            // ref={username}
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
            // ref={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="button" onClick={submitHandler}>
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
