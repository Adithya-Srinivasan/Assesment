import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";
import Logo from "./lystloc.png";
import "./App.css";

export default function App() {
  const [nameReg, setNameReg] = useState("");
  const [companyReg, setCompanyReg] = useState("");
  const [numberReg, setNumberReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [jobtitleReg, setJobTitleReg] = useState("");
  const [phoneNum, setPhoneNum] = useState();

  const registerVal = () => {
    Axios.post("http://localhost:3001/register", {
      name: nameReg,
      number: numberReg,
      email: emailReg,
      comapny: companyReg,
      jobtitle: jobtitleReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const domainUrl = "http://localhost:3000";
  const [csrfTokenState, setCsrfTokenState] = useState("");
  const [ResponseState] = useState("not yet");

  async function getCallToForm() {
    const url = "/register";
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
    const url = "/register";
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
    ResponseState(parsedResponse);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <div className="registration">
        <img src={Logo} alt="logo" className="logo" />
        <h1 className="header">Track Your Employees On and Off field!</h1>
        <div className="header-text">
          Invest more time on business growth and less time on sales operations
          in just 4 easy steps!
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label className="field-text">Name</label>
          <Form.Field>
            <input
              className="input-field"
              type="text"
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
              {...register("nameReg", { required: true, maxLength: 10 })}
            />
          </Form.Field>
          {errors.nameReg && (
            <p className="text-error">
              Please check the Name.
              <br />
              Max upto 10 characters.
            </p>
          )}
          <br />
          <label className="field-text">Company</label>
          <Form.Field>
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setCompanyReg(e.target.value);
              }}
              {...register("companyReg", { required: true, maxLength: 50 })}
            />
          </Form.Field>
          {errors.companyReg && (
            <p className="text-error">Please enter the company name.</p>
          )}
          <br />
          <label className="field-text">E-Mail</label>
          <Form.Field>
            <input
              type="email"
              className="input-field"
              onChange={(e) => {
                setEmailReg(e.target.value);
              }}
              {...register("emailReg", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
          </Form.Field>
          {errors.emailReg && (
            <p className="text-error">
              Please check the Email.
              <br />
              It should end with @ and .com.
            </p>
          )}
          <br />
          <label className="field-text">Job Title</label>
          <Form.Field>
            <input
              type="text"
              className="input-field"
              onChange={(e) => {
                setJobTitleReg(e.target.value);
              }}
              {...register("jobtitleReg", { required: true, maxLength: 50 })}
            />
          </Form.Field>
          {errors.jobtitleReg && (
            <p className="text-error">Please enter the jobtitle.</p>
          )}

          <br />
          <label className="field-text">Number</label>
          <Form.Field>
            <div className="field-num">
              <PhoneInput
                className="input-field"
                country={"us"}
                value={phoneNum}
                onChange={(e) => {
                  setPhoneNum();
                }}
              />
              <input
                className="num-field"
                type="number"
                onChange={(e) => {
                  setNumberReg(e.target.value);
                }}
                {...register("numberReg", { required: true, maxLength: 10 })}
              />
            </div>
          </Form.Field>
          {errors.numberReg && (
            <p className="text-error">
              Please check the Number.
              <br />
              Max upto 10 Numbers.
            </p>
          )}

          <ReCAPTCHA
            sitekey="6LeJ_usjAAAAAE44jq0Y_WVVncMOMyOOKmPnf_O3"
            className="captcha"
          />
          <div className="check-main">
            <input type="checkbox" />
            <div className="check-text">
              Interseted to knowing more about Lystloc through email & call
            </div>
          </div>

          <Button
            className="reg-btn"
            onClick={() => {
              registerVal();
              testCsurfPostClick();
            }}
          >
            {" "}
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}
