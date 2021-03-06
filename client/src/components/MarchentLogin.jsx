import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../class/storage";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

export const MarchentLogin = ({ history }) => {
  const [loader, setLoader] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({});
  const { username, password } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    setLoader(true);

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/marchentlogin`,
        data: { username, password },
      });
      if (result) {
        //console.log(result)
        setLoader(false);
        setError({});
        setValues({
          username: "",
          password: "",
        });
        authenticate(result);
        history.push("/dashboard");
      }
    } catch (e) {
      //console.log(e.response.data.error);
      setLoader(false);
      //toast.error(e.response.data.error);
      setError(e.response.data.error);
    }
  };

  return (
    <>
      <main className='default-transition'>
        <div className='row h-100'>
          <div className='col-12 col-md-10 mx-auto my-auto'>
            <div className='card auth-card'>
              <div className='form-side'>
                {Object.keys(error).length !== 0 && (
                  <div className='alert alert-danger ' role='alert'>
                    {JSON.stringify(error)}
                  </div>
                )}

                {isAuth() && <h1 className='mb-4'>Please Logout First</h1>}

                {!isAuth() && (
                  <>
                    <h1 className='mb-4'>Marchent Login Area</h1>
                    <form>
                      <label className='form-group has-float-label mb-4'>
                        <input
                          className={
                            error.username
                              ? " form-control is-invalid"
                              : " form-control"
                          }
                          type='username'
                          onChange={handleChange("username")}
                          value={username}
                        />
                        <div className='invalid-feedback'>{error.username}</div>
                        <span>E-mail/Phone Number</span>
                      </label>

                      <label className='form-group has-float-label mb-4'>
                        <input
                          className={
                            error.password
                              ? " form-control is-invalid"
                              : " form-control"
                          }
                          type='password'
                          placeholder=''
                          onChange={handleChange("password")}
                          value={password}
                        />
                        <div className=' invalid-feedback'>
                          {error.password}
                        </div>
                        <span>Password</span>
                      </label>
                      <div className='d-flex justify-content-end align-items-center'>
                        <button
                          className='btn btn-primary btn-lg btn-shadow'
                          type='submit'
                          onClick={sendRequest}>
                          Login
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
      {loader && <Loader />}
    </>
  );
};

export default MarchentLogin;
