import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "../../api";
import "./style.css";

export const Regular = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginEmail = useRef();
  const loginPassword = useRef();

  const registerEmail = useRef();
  const registerPassword = useRef();
  const registerUsername = useRef();

  const onLoginClick = async () => {
    setLoading(true);
    try {
      const u = {
        email: loginEmail.current.value,
        password: loginPassword.current.value,
      };
      const user = await Api.loginUser(u);
      props.onLogin(user);
      toast("Login successfull!", { type: "success" });
      navigate("/");
    } catch (e) {
      if (
        (e?.response?.data === "user not found in database") ||
        "incorrect password!"
      ) {
        toast("Email or password incorrect!", { type: "error" });
      } else {
        toast("Login unsuccessfull!", { type: "error" });
      }
    }
    setLoading(false);
  };

  const onRegisterClick = async () => {
    setLoading(true);
    try {
      const user = {
        name: registerUsername.current.value,
        email: registerEmail.current.value,
        password: registerPassword.current.value,
        isBusiness: false,
      };
      await Api.registerUser(user);
      toast("Register successfull!", { type: "success" });
    } catch (e) {
      if (
        e?.response?.data ===
        `user with email ${registerEmail.current.value} already exists`
      ) {
        toast("Email already exists", { type: "error" });
      } else {
        toast("Register unsuccessfull!", { type: "error" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <h1>Regular account</h1>
        <br />
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          defaultChecked
        />
        <label htmlFor="tab-1" className="tab">
          Sign In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                email
              </label>
              <input type="text" className="input" ref={loginEmail} />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                type="password"
                className="input"
                data-type="password"
                ref={loginPassword}
              />
            </div>
            <div className="group">
              {!!loading && (
                <button
                  className="button"
                  type="submit"
                  disabled
                  onClick={onLoginClick}
                >
                  <span
                    className="spinner-border spinner-border-sm spinner-login"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sign In
                </button>
              )}
              {!loading && (
                <button className="button" type="submit" onClick={onLoginClick}>
                  Sign In
                </button>
              )}
            </div>
          </div>
          <div className="sign-up-htm">
            <div className="group">
              <label htmlFor="user" className="label">
                Username
              </label>
              <input type="text" className="input" ref={registerUsername} />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Email
              </label>
              <input type="text" className="input" ref={registerEmail} />
            </div>
            <div className="group">
              <label htmlFor="pass" className="label">
                Password
              </label>
              <input
                type="password"
                className="input"
                data-type="password"
                ref={registerPassword}
              />
            </div>
            <div className="group">
              {!!loading && (
                <button
                  className="button"
                  type="submit"
                  disabled
                  onClick={onRegisterClick}
                >
                  <span
                    className="spinner-border spinner-border-sm spinner-login"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sign Up
                </button>
              )}
              {!loading && (
                <button
                  className="button"
                  type="submit"
                  onClick={onRegisterClick}
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
