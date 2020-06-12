import React, { useState, useEffect } from "react";
import axios from "axios";
import { isAuth, getCookie } from "../../class/storage";

var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

const DashboardDiv = (props) => {
  const [checkAdmin, setCheckAdmin] = useState(true);
  const [marchent, setMarchent] = useState([]);
  const [bye, setBye] = useState(true);

  const [man, setMan] = useState([]);

  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  const [values, setValues] = useState({
    pickup: true,
    amount: "",
    description: "",
    deliveryman: "",
    marchent_id: "",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  useEffect(() => {
    document.getElementById("checkbox").checked = true;
    setSuccess({});
    setError({});

    if (isAuth()) {
      if (isAuth().role === "admin") {
        getMarchentList();
        getManList();
        setCheckAdmin(false);
      } //else {
      //   setValues({
      //     ...values,
      //     marchent_id: isAuth()._id,
      //     pickupAddress: isAuth().address + isAuth().phone,
      //     deliveryman: null,
      //   });
      //}
    }
    //getCompanyList();
  }, []);

  const pickupSelect = () => {
    var checkBox = document.getElementById("checkbox");

    if (checkBox.checked == true) {
      setValues({ ...values, pickup: true });
    } else {
      setValues({ ...values, pickup: false });
    }
  };

  const { description, pickup, amount, marchent_id, deliveryman } = values;

  const getMarchentList = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/getmarchentlist`,
        data: {
          company_id: isAuth().company_id,
        },
      });
      setMarchent(result.data.marchentList);
    } catch (error) {
      console.log(error);
    }
  };

  const getManList = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/getmanlist`,
        data: {
          company_id: isAuth().company_id,
        },
      });
      setMan(result.data.manList);
    } catch (error) {
      console.log(error);
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    //console.log(company_id);
    setBye(false);
    setTimeout(function () {
      setBye(true);
    }, 3000);
    //setBye(true);

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/addpayment`,
        data: {
          description,
          amount,
          marchent_id: deliveryman ? null : marchent_id,
          deliveryman: marchent_id ? null : deliveryman,
          company_id: isAuth().company_id,
          token: getCookie("token"),
        },
      });
      if (result) {
        //console.log(result)

        setSuccess(result.data.message);
        setValues({
          description: "",
          amount: "",
        });
        setTimeout(function () {
          setSuccess({});
        }, 3000);

        // window.location.href = window.location.href;
      }
    } catch (e) {
      //console.log(e.response.data.error);

      // toast.error(e.response.data.error);
      // console.log(e);

      setError(e.response.data.error);
      setTimeout(function () {
        setError({});
      }, 3000);
    }
  };
  return (
    <>
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
              <h5 className='modal-title'>Add Payment</h5>
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

                {bye && (
                  <form>
                    <label className='form-group has-float-label mb-4'>
                      <textarea
                        className={
                          error.description
                            ? " form-control is-invalid"
                            : " form-control"
                        }
                        onChange={handleChange("description")}
                        value={description}></textarea>
                      <div className='invalid-feedback'>
                        {error.description}
                      </div>
                      <span>Payment Details</span>
                    </label>

                    <label className='form-group has-float-label mb-4'>
                      <div className='input-group-text'>
                        <input
                          type='checkbox'
                          aria-label='Checkbox for following text input'
                          id='checkbox'
                          onClick={pickupSelect}
                        />
                      </div>

                      <span>Marchent Payment?</span>
                    </label>

                    {pickup && (
                      <label className='form-group has-float-label mb-4'>
                        <select
                          className='custom-select custom-select-lg mb-3'
                          onChange={handleChange("marchent_id")}
                          value={marchent_id}
                          id='namemarchent'
                          required>
                          <option defaultValue>Select Marchent</option>
                          {marchent.map((item) => {
                            return (
                              <option value={item._id}>{item.name}</option>
                            );
                          })}
                        </select>

                        <span>Select Marchent</span>
                      </label>
                    )}

                    {!pickup && (
                      <label className='form-group has-float-label mb-4'>
                        <select
                          className='custom-select custom-select-lg mb-3'
                          onChange={handleChange("deliveryman")}
                          value={deliveryman}
                          id='namemarchent'
                          required>
                          <option defaultValue>Choose Delivery Person</option>
                          {man.map((item) => {
                            return (
                              <option value={item._id}>
                                {item.name}({item.area})
                              </option>
                            );
                          })}
                        </select>

                        <div className='invalid-feedback'>
                          {error.deliveryman}
                        </div>
                        <span>Select Delivery Man</span>
                      </label>
                    )}

                    <label className='form-group has-float-label mb-4'>
                      <input
                        className={
                          error.amount
                            ? " form-control is-invalid"
                            : " form-control"
                        }
                        type='text'
                        onChange={handleChange("amount")}
                        value={amount}
                      />{" "}
                      <div className=' invalid-feedback'>{error.amount}</div>
                      <span>Amount</span>
                    </label>

                    <div className='d-flex justify-content-end align-items-center'></div>
                  </form>
                )}
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
                Pay...
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PaymentModal = (values) => {
  return (
    <>
      <DashboardDiv {...values} />
    </>
  );
};

export default PaymentModal;
