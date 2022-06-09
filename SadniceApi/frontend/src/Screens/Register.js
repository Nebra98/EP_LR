import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { register } from "../actions/userActions";
// import Header from "../components/Header";

const Register = (props) => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  const [korisnicko_ime, setKorisnicko_ime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [potvrdi_lozinku, setPotvrdi_lozinku] = useState("");
  const [admin, setAdmin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  //   const userRegister = useSelector((state) => state.userRegister);
  //   const { userInfo } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (lozinka !== potvrdi_lozinku) {
      alert("Password and confirm password are different");
    } else {
      const data = { korisnicko_ime, email, lozinka, admin };
      console.log(JSON.stringify(data));
      fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "cors",
      }).then(() => {
        console.log("new user added");
      });
      //   dispatch(register(name, email, password));
    }
  };
  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [navigate, redirect, userInfo]);
  return (
    <div>
      {/* <Header countCartItems={cartItems.length}></Header> */}

      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            value={korisnicko_ime}
            onChange={(e) => setKorisnicko_ime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email adress</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            required
            value={potvrdi_lozinku}
            onChange={(e) => setPotvrdi_lozinku(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
