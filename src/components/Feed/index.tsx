// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import Swipe from "../Swipe/index";
import Firebase from "../../firebase";
import { Redirect, useHistory } from "react-router-dom";

interface FeedProps {
  onClick: any;
}

export default function Feed({ onClick }: FeedProps) {
  const [isAuth, auth] = useState(true);
  let [userData, setUserData] = useState(Firebase.userData);
  let history = useHistory();

  let signOut = function () {
    Firebase.auth
      .signOut()
      .then(() => {
        history.replace("/login");
      })
      .catch(function (error) {
        // An error happened.
        alert(error.code);
        alert(error.message);
      });
  };

  useEffect(() => {
    Firebase.auth.onAuthStateChanged(function (user) {
      if (user !== null) {
        auth(true);
        setUserData(user);
      } else {
        auth(false);
      }
    });
  });

  return isAuth ? (
    <main>
      <Swipe
        touchEnd={() => {
          onClick(true);
        }}
      ></Swipe>
      <div className="home" onClick={() => onClick(false)}>
        <h1>This is home</h1>
        <div>
          <p>Display name: {userData?.displayName}</p>
          <br></br>
          <p>Email: {userData?.email}</p>
          <br></br>
          <p>PhotoUrl: {userData?.photoURL}</p>
          <br></br>
          <p>
            Email verified (true/false): {userData?.emailVerified.toString()}
          </p>
          <br></br>
        </div>
        <button onClick={signOut}>sign out</button>
      </div>
      <button className="sbbtn" onClick={() => onClick(true)}></button>
    </main>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
