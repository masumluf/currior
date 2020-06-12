import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "./Layout";
import axios from "axios";
import Loader from "../../Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "../../class/storage";
import Navbar from "../Navbar";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

export const AddCompany = () => {
  const [uid, setUid] = useState(null);
  const [loader, setLoader] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(true);
  const [company, setCompany] = useState([]);

  const [values, setValues] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    phone: "",
    company_id: "",
    nid: "",
    payment_type: "",
    account_status: 0,
  });

  const [error, setError] = useState({});
  const {
    name,
    username,
    nid,
    payment_type,
    password,
    address,
    phone,
    company_id,
    account_status,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    setUid(uuidv4());
    if (isAuth()) {
      if (isAuth().role === "admin") {
        setValues({
          ...values,
          company_id: isAuth().company_id,
          account_status: 1,
        });
      } else {
        setCheckAdmin(false);
        getCompanyList();
      }
    }
  }, []);

  const getCompanyList = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/getcompanylist`,
      });
      setCompany(result.data.companyList);
      //console.log(result.data.companyList);
    } catch (error) {
      //console.log(error);
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    setLoader(true);
    //console.log(company_id);

    try {
      console.log(account_status);

      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/addmarchent`,
        data: {
          name,
          username,
          nid,
          payment_type,
          password,
          address,
          phone,
          company_id,
          account_status,
        },
      });

      if (result) {
        //console.log(result)
        setLoader(false);
        toast.success(result.data.message);
        setError({});
        setValues({
          name: "",
          username: "",
          password: "",
          address: "",
          phone: "",
          payment_type: "",
          nid: "",
          company_id: "",
        });
      }
    } catch (e) {
      //console.log(e.response.data.error);
      setLoader(false);
      toast.error(e.response.data.error);
      //console.log(e);

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
                <h1 className='mb-4'>Add a Marchent</h1>
                {Object.keys(error).length !== 0 && (
                  <div className='alert alert-danger ' role='alert'>
                    {JSON.stringify(error)}
                  </div>
                )}

                <div className=''></div>
                <form>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.name
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("name")}
                      value={name}
                    />
                    <div className='invalid-feedback'>{error.name}</div>
                    <span>Marchent Name</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.nid ? " form-control is-invalid" : " form-control"
                      }
                      type='text'
                      onChange={handleChange("nid")}
                      value={nid}
                    />
                    <div className='invalid-feedback'>{error.nid}</div>
                    <span>National ID Card Number</span>
                  </label>

                  {!checkAdmin && (
                    <label className='form-group has-float-label mb-4'>
                      <select
                        className='custom-select custom-select-lg mb-3'
                        onChange={handleChange("company_id")}
                        value={company_id}>
                        <option defaultValue>Open this select menu</option>
                        {company.map((item) => {
                          return (
                            <option value={item.company_id}>
                              {item.company_name}
                            </option>
                          );
                        })}
                      </select>

                      <div className='invalid-feedback'>
                        {error.company_name}
                      </div>
                      <span>Select Delivery Company</span>
                    </label>
                  )}

                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.username
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("username")}
                      value={username}
                    />
                    <div className='invalid-feedback'>{error.username}</div>
                    <span>Enter Username(Ex. Phone number/Email)</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.payment_type
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("payment_type")}
                      value={payment_type}></textarea>
                    <div className=' invalid-feedback'>
                      {error.payment_type}
                    </div>
                    <span>Payment Details</span>
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
                    <span>Marchent Address</span>
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
                    <span>Marchent Phone Number</span>
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
      {isAuth() && <Layout />}
    </>
  );
};

export default AddCompany;
