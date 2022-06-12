import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const useAuth = () => {
  let user = JSON.parse(localStorage.getItem("userInfo"));

  return user && user.admin;
};

const Navigacija = (props) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const isAuth = useAuth();

  //   const dispatch = useDispatch();
  const signoutHandler = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("sadnica");
    localStorage.removeItem("usluga");

    window.location.reload();
  };
  return (
    <header className="block row center color">
      <div>
        <a href="/">
          <h1>HOME</h1>
        </a>
      </div>
      <div>
        <Link to="/korpa">Korpa</Link>{" "}
        <div className="dropdown space">
          <Link to="#">
            Shop <i className="fa fa-caret-down"></i>{" "}
          </Link>
          <ul className="dropdown-content">
            <li>
              <Link to="/shop/sadnica" className="test">
                Sadnice
              </Link>
            </li>
            <li>
              <Link to="/shop/usluga" className="test">
                Usluge
              </Link>
            </li>
          </ul>
        </div>
        {userInfo ? (
          <div className="dropdown space">
            <Link to="#">
              {userInfo.naziv} <i className="fa fa-caret-down"></i>{" "}
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/povijest" className="test">
                  Povijest Narudžbi
                </Link>
              </li>
              {isAuth ? (
                <div>
                  <li>
                    <Link to="/novesadnice" className="test">
                      Nova Sadnica
                    </Link>
                  </li>
                  <li>
                    <Link to="/noveusluge" className="test">
                      Nova Usluga
                    </Link>
                  </li>
                </div>
              ) : null}
              <li>
                <Link to="#signout" onClick={signoutHandler} className="test">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin" className="space">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
export default Navigacija;
