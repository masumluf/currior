import React, { useState, useEffect } from "react";
import axios from "axios";
import { isAuth, getCookie } from "../../class/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);
toast.configure();

const DashboardDiv = (props) => {
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  const [values, setValues] = useState({
    id: "",
    name: "",
    address: "",
    payment_type: "",
    nid: "",
    phone: "",
    drivingLicense: "",
    bikeRegNumber: "",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  useEffect(() => {
    setSuccess({});
    setError({});
    setValues({
      ...values,
      id: props.id,
      name: props.name,
      address: props.address,
      payment_type: props.payment_type,
      nid: props.nid,
      phone: props.phone,
      drivingLicense: props.drivingLicense,
      bikeRegNumber: props.bikeRegNumber,
    });

    //getCompanyList();
  }, [props]);

  const {
    id,
    name,
    address,
    payment_type,
    nid,
    phone,
    bikeRegNumber,
    drivingLicense,
  } = values;

  const sendRequest = async (e) => {
    e.preventDefault();

    try {
      let result = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/updateman`,
        data: {
          id,
          name,
          address,
          payment_type,
          nid,
          phone,
          drivingLicense,
          bikeRegNumber,
          token: getCookie("token"),
        },
      });
      if (result) {
        //console.log(result)

        setSuccess(result.data.message);
        setTimeout(function () {
          setSuccess({});
          props.setRefresh(Date.now());
        }, 3000);

        // window.location.href = window.location.href;
      }
    } catch (e) {
      //console.log(e.response.data.error);

      // toast.error(e.response.data.error);
      setError(e.response.data.error);
      setTimeout(function () {
        setError({});
      }, 3000);
    }
  };
  return (
    <div
      className='modal fade modal-right'
      id='exampleModalRight'
      tabindex='-1'
      role='dialog'
      aria-labelledby='exampleModalRight'
      aria-hidden='true'
      style={{ display: "none" }}>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Update Information</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>×</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='form-side'>
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
              <div className=''></div>

              <form>
                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.name ? " form-control is-invalid" : " form-control"
                    }
                    type='text'
                    onChange={handleChange("name")}
                    value={values.name}
                  />{" "}
                  <div className=' invalid-feedback'>{error.name}</div>
                  <span>Marchent Name</span>
                </label>
                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.phone ? " form-control is-invalid" : " form-control"
                    }
                    type='number'
                    onChange={handleChange("phone")}
                    value={values.phone}
                  />
                  <div className='invalid-feedback'>{error.phone}</div>
                  <span>Marchent Phone</span>
                </label>
                <label className='form-group has-float-label mb-4'>
                  <textarea
                    className={
                      error.address
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    onChange={handleChange("address")}
                    value={values.address}></textarea>
                  <div className=' invalid-feedback'>{error.address}</div>
                  <span>Marchent Address</span>
                </label>
                <label className='form-group has-float-label mb-4'>
                  <textarea
                    className={
                      error.payment_type
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    onChange={handleChange("payment_type")}
                    value={values.payment_type}></textarea>
                  <div className=' invalid-feedback'>{error.payment_type}</div>
                  <span>Marchent Payment Details</span>
                </label>
                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.nid ? " form-control is-invalid" : " form-control"
                    }
                    type='number'
                    placeholder=''
                    onChange={handleChange("nid")}
                    value={values.nid}
                  />
                  <div className=' invalid-feedback'>{error.nid}</div>
                  <span>Marchent NID</span>
                </label>
                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.drivingLicense
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    type='text'
                    placeholder=''
                    onChange={handleChange("drivingLicense")}
                    value={values.drivingLicense}
                  />
                  <div className=' invalid-feedback'>
                    {error.drivingLicense}
                  </div>
                  <span>Marchent Driving License</span>
                </label>
                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.bikeRegNumber
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    type='text'
                    placeholder=''
                    onChange={handleChange("bikeRegNumber")}
                    value={values.bikeRegNumber}
                  />
                  <div className=' invalid-feedback'>{error.bikeRegNumber}</div>
                  <span>Marchent bikeRegNumber</span>
                </label>

                <div className='d-flex justify-content-end align-items-center'></div>
              </form>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-outline-primary'
              data-dismiss='modal'>
              Cancel
            </button>
            <button
              className='btn btn-primary btn-lg btn-shadow'
              type='submit'
              onClick={sendRequest}>
              Update
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export const Editmarchent = (values) => {
  return (
    <>
      <DashboardDiv {...values} />
    </>
  );
};

export default Editmarchent;
