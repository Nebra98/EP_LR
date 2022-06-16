import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigacija from "../Components/Navigacija";

const Signin = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  async function submitHandler(e) {
    e.preventDefault();
    console.log(username);
    console.log(password);
    fetch("http://localhost:5000/login", {
      method: "GET",
      headers: new Headers({
        "Access-Control-Allow-Origin": "null",
        Authorization: "Basic " + btoa(username + ":" + password),
      }),
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
    <div className="prijava">
      <div className="opacity">
        <Navigacija></Navigacija>
      </div>
      <div className="block opacity1">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Prijava</h1>
          </div>

          <div>
            <label htmlFor="username">Korisničko ime</label>
            <input
              type="text"
              id="username"
              placeholder="Unesite korisničko ime"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Šifra</label>
            <input
              type="password"
              id="password"
              placeholder="Unesite šifru"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Prijava
            </button>
          </div>
          <div>
            <label />
            <div>
              Novi korisnik?{" "}
              <Link to={`/register?redirect=${redirect}`}>
                Napravite svoj račun
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signin;
