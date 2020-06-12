import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "./Layout";
import axios from "axios";
import Loader from "../../Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Navbar } from "../Navbar";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

export const AddCompany = () => {
  const [uid, setUid] = useState(null);
  const [loader, setLoader] = useState(false);

  const [values, setValues] = useState({
    company_name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    company_id: "",
  });

  const [error, setError] = useState({});
  const { company_name, email, password, address, phone } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    setUid(uuidv4());
  }, []);

  const sendRequest = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Requesting.." });
    setLoader(true);

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/addcompany`,
        data: { company_name, email, password, address, phone, uid },
      });
      if (result) {
        //console.log(result)
        setLoader(false);
        toast.success(result.data.message);
        setError({});
        setValues({
          company_name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          company_id: "",
        });
      }
    } catch (e) {
      //console.log(e.response.data.error);
      setLoader(false);
      toast.error(e.response.data.error);
      console.log(e);

      setError(e.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <main className='default-transition'>
        <div className='row h-100'>
          <div className='col-12 col-md-10 mx-auto my-auto'>
            <div className='card auth-card'>
              <div className='form-side'>
                <a href='Dashboard.Default.html'>
                  <span className='logo-single'></span>
                </a>
                <h1 className='mb-4'>Add a Company</h1>
                <div className='invalid-feedback'>{error.uid}</div>
                <form>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.company_name
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("company_name")}
                      value={company_name}
                    />
                    <div className='invalid-feedback'>{error.company_name}</div>
                    <span>Company Name</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.email
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='email'
                      onChange={handleChange("email")}
                      value={email}
                    />
                    <div className='invalid-feedback'>{error.email}</div>
                    <span>E-mail</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.address
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("address")}
                      value={address}></textarea>
                    <div className=' invalid-feedback'>{error.address}</div>
                    <span>Company Address</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.phone
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='number'
                      onChange={handleChange("phone")}
                      value={phone}
                    />{" "}
                    <div className=' invalid-feedback'>{error.phone}</div>
                    <span>Company Phone Number</span>
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
                    <div className=' invalid-feedback'>{error.password}</div>
                    <span>Password</span>
                  </label>
                  <div className='d-flex justify-content-end align-items-center'>
                    <button
                      className='btn btn-primary btn-lg btn-shadow'
                      type='submit'
                      onClick={sendRequest}>
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer />
      {loader && <Loader />}
      <Layout />
    </>
  );
};

export default AddCompany;
