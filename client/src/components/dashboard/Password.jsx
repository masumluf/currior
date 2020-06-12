import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import { isAuth, getCookie } from "../../class/storage";
import { Navbar } from "../Navbar";

export const Setting = () => {
  const [values, setValues] = useState({
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [loader, setLoader] = useState(false);
  const { password, confirmpassword } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    setLoader(true);
    //console.log(company_id);

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/password`,
        data: {
          password,
          confirmpassword,
          token: getCookie("token"),
        },
      });

      if (result) {
        //console.log(result)
        setLoader(false);

        setSuccess(result.data.message);
        setValues({
          password: "",
          confirmpassword: "",
        });
      }
    } catch (e) {
      //console.log(e.response.data.error);
      setLoader(false);

      //console.log(e);

      setError(e.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <Layout />

      <main>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1>Change Password</h1>
              <nav
                className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
                aria-label='breadcrumb'>
                <ol className='breadcrumb pt-0'>
                  <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/picture'>Change Picture</Link>
                  </li>
                  <li className='breadcrumb-item'>Change Password</li>
                </ol>
              </nav>
              <div className='separator mb-5'></div>
            </div>
          </div>
          <div className='col-lg-12 col-xl-12'>
            {Object.keys(error).length !== 0 && (
              <div className='alert alert-danger ' role='alert'>
                {JSON.stringify(error)}
              </div>
            )}
            {Object.keys(success).length !== 0 && (
              <div className='alert alert-success ' role='alert'>
                {JSON.stringify(success)}
              </div>
            )}
            <div className='card auth-card'>
              <div className='form-side'>
                <h6 className='mb-4'>Password Control Center</h6>
                <form>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className='form-control'
                      type='password'
                      onChange={handleChange("password")}
                      value={password}
                      placeholder='Enter New Password'
                    />
                    <span>New Password</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className='form-control'
                      type='password'
                      onChange={handleChange("confirmpassword")}
                      value={confirmpassword}
                      placeholder='Enter Password Again'
                    />
                    <span>Confirm Password</span>
                  </label>
                  <div className='d-flex justify-content-between align-items-center'>
                    <button
                      className='btn btn-primary btn-lg btn-shadow'
                      type='submit'
                      onClick={sendRequest}>
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {loader && <Loader />}
    </>
  );
};

export default Setting;
