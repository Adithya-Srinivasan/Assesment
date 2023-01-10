import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [usernameReg, setUernameReg] = useState("");
  const [numberReg, setNumberReg] = useState("");
  const [emailReg, setEmailReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      number: numberReg,
      email: emailReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const domainUrl = "http://localhost:3000";
  const [csrfTokenState, setCsrfTokenState] = useState("");
  const [setHaveWeReceivedPostResponseState] = useState("not yet");

  async function getCallToForm() {
    const url = "/form";
    let fetchGetResponse = await fetch(`${domainUrl}${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });
    let parsedResponse = fetchGetResponse.json();
    setCsrfTokenState(parsedResponse);
  }

  useEffect(() => {
    getCallToForm();
  }, []);

  async function testCsurfPostClick() {
    const url = "/process";
    let fetchPostResponse = await fetch(`${domainUrl}${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "xsrf-token": csrfTokenState,
      },
      credentials: "include",
      mode: "cors",
    });
    let parsedResponse = await fetchPostResponse.text();
    setHaveWeReceivedPostResponseState(parsedResponse);
  }

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUernameReg(e.target.value);
          }}
        />
        <br />
        <label>Number</label>
        <input
          type="number"
          onChange={(e) => {
            setNumberReg(e.target.value);
          }}
        />{" "}
        <br />
        <label>Number</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <button
          onClick={() => {
            register();
            testCsurfPostClick();
          }}
        >
          {" "}
          Register
        </button>
      </div>
    </div>
  );
}
