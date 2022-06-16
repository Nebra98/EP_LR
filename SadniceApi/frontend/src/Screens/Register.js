import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigacija from "../Components/Navigacija";

const Register = (props) => {
  const navigate = useNavigate();
  const [korisnicko_ime, setKorisnicko_ime] = useState("");
  const [email, setEmail] = useState("");
  const [lozinka, setLozinka] = useState("");
  const [potvrdi_lozinku, setPotvrdi_lozinku] = useState("");
  const [admin, setAdmin] = useState(false);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

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
      })
        .then(() => {
          console.log("new user added");
        })
        .then(navigate("/"));
    }
  };

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <div className="registracija">
      <div className="opacity">
        <Navigacija></Navigacija>
      </div>

      <div className="block opacity1">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Napravite račun</h1>
          </div>
          <div>
            <label htmlFor="name">Korisničko ime</label>
            <input
              type="text"
              id="name"
              placeholder="Unesite korisničko ime"
              required
              value={korisnicko_ime}
              onChange={(e) => setKorisnicko_ime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              id="email"
              placeholder="Unesite email adresu"
              required
              value={email}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Šifra</label>
            <input
              type="password"
              id="password"
              placeholder="Unesite Šifru"
              required
              value={lozinka}
              onChange={(e) => setLozinka(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Ponovite Šifru</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Unesite šifru ponovo"
              required
              value={potvrdi_lozinku}
              onChange={(e) => setPotvrdi_lozinku(e.target.value)}
            />
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Registracija
            </button>
          </div>
          <div>
            <label />
            <div>
              Već imate račun?{" "}
              <Link to={`/signin?redirect=${redirect}`}>Prijava</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
