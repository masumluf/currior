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
  const [company, setCompany] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(true);
  const [marchent, setMarchent] = useState([]);
  const [mname, setMname] = useState("");
  const [man, setMan] = useState([]);
  const [productStatus, setProductStatus] = useState("pending");
  const [assigned, setAssigned] = useState(false);

  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});

  const [values, setValues] = useState({
    id: "",
    pickup: false,
    amount: "",
    description: "",
    pickupAddress: "",
    receiverPhone: "",
    receiverName: "",
    deliveryman: "",
    marchent_id: "",
    receiverAddress: "",
  });

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  useEffect(() => {
    document.getElementById("checkbox").checked = props.pickup ? true : false;
    setSuccess({});
    setError({});
    setValues({
      ...values,
      id: props.id,
      pickup: props.pickup,
      amount: props.amount,
      description: props.description,
      pickupAddress: props.pickupAddress,
      receiverPhone: props.receiverPhone,
      receiverName: props.receiverName,
      deliveryman: props.deliveryman,
      marchent_id: props.marchent_id,
      receiverAddress: props.receiverAddress,
    });
    if (isAuth()) {
      if (isAuth().role === "admin") {
        getMarchentList();
        getManList();
        setCheckAdmin(false);
        setProductStatus("in progress");
        setAssigned(true);
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
  }, [props]);

  const {
    id,
    description,
    pickupAddress,
    receiverPhone,
    receiverName,
    amount,
    receiverAddress,
    marchent_id,
    pickup,
    deliveryman,
  } = values;

  console.log(props.deliveryman);

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
  const pickupSelect = () => {
    var checkBox = document.getElementById("checkbox");

    if (checkBox.checked == true) {
      setValues({ ...values, pickup: true });
    } else {
      setValues({ ...values, pickup: false });
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();

    //console.log();

    try {
      let result = await axios({
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/updateproduct`,
        data: {
          id,
          description,
          pickupAddress,
          receiverPhone,
          receiverName,
          amount,
          receiverAddress,
          marchent_id,
          pickup,
          deliveryman,
          token: getCookie("token"),
        },
      });
      if (result) {
        //console.log(result)

        setSuccess(result.data.message);

        // window.location.href = window.location.href;
      }
    } catch (e) {
      //console.log(e.response.data.error);

      // toast.error(e.response.data.error);
      // console.log(e);

      setError(e.response.data.error);
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
                  <textarea
                    className={
                      error.description
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    onChange={handleChange("description")}
                    value={values.description}></textarea>
                  <div className='invalid-feedback'>{error.description}</div>
                  <span>Product Details</span>
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
                  <div className='invalid-feedback'>{error.nid}</div>
                  <span>Pick up?</span>
                </label>

                {values.pickupAddress && (
                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.pickupAddress
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("pickupAddress")}
                      value={values.pickupAddress}></textarea>
                    <div className=' invalid-feedback'>
                      {error.pickupAddress}
                    </div>
                    <span>Pickup Address</span>
                  </label>
                )}

                {!checkAdmin && (
                  <label className='form-group has-float-label mb-4'>
                    <select
                      className='custom-select custom-select-lg mb-3'
                      onChange={handleChange("marchent_id")}
                      value={values.marchent_id}
                      id='namemarchent'>
                      <option defaultValue>Select Marchent</option>
                      {marchent.map((item) => {
                        return <option value={item._id}>{item.name}</option>;
                      })}
                    </select>

                    <div className='invalid-feedback'>{error.name}</div>
                    <span>Select Marchent</span>
                  </label>
                )}

                {!checkAdmin && (
                  <label className='form-group has-float-label mb-4'>
                    <select
                      className='custom-select custom-select-lg mb-3'
                      onChange={handleChange("deliveryman")}
                      value={values.deliveryman}
                      id='namemarchent'>
                      <option defaultValue>Choose Delivery Person</option>
                      {man.map((item) => {
                        return (
                          <option value={item._id}>
                            {item.name}({item.area})
                          </option>
                        );
                      })}
                    </select>

                    <div className='invalid-feedback'>{error.deliveryman}</div>
                    <span>Select Delivery Man</span>
                  </label>
                )}

                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.receiverName
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    type='text'
                    onChange={handleChange("receiverName")}
                    value={values.receiverName}
                  />{" "}
                  <div className=' invalid-feedback'>{error.receiverName}</div>
                  <span>Receiver Name</span>
                </label>

                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.receiverPhone
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    type='number'
                    onChange={handleChange("receiverPhone")}
                    value={values.receiverPhone}
                  />
                  <div className='invalid-feedback'>{error.receiverPhone}</div>
                  <span>Receiver Phone</span>
                </label>

                <label className='form-group has-float-label mb-4'>
                  <textarea
                    className={
                      error.receiverAddress
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    onChange={handleChange("receiverAddress")}
                    value={values.receiverAddress}></textarea>
                  <div className=' invalid-feedback'>
                    {error.receiverAddress}
                  </div>
                  <span>Receiver Address</span>
                </label>

                <label className='form-group has-float-label mb-4'>
                  <input
                    className={
                      error.amount
                        ? " form-control is-invalid"
                        : " form-control"
                    }
                    type='number'
                    placeholder=''
                    onChange={handleChange("amount")}
                    value={values.amount}
                  />
                  <div className=' invalid-feedback'>{error.amount}</div>
                  <span>Amount</span>
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

export const ModalLayout = (values) => {
  return (
    <>
      <DashboardDiv {...values} />
    </>
  );
};

export default ModalLayout;
