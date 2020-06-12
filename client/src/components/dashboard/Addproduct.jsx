import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Layout from "./Layout";
import axios from "axios";
import { createBrowserHistory } from "history";
import { withRouter } from "react-router";
import Loader from "../../Loader";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "../../class/storage";
import { Navbar } from "../Navbar";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

toast.configure();

export const AddCompany = ({ router }) => {
  const history = createBrowserHistory();
  const [uid, setUid] = useState(null);
  const [loader, setLoader] = useState(false);
  const [company, setCompany] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [checkAdmin, setCheckAdmin] = useState(true);
  const [marchent, setMarchent] = useState([]);
  const [mname, setMname] = useState("");
  const [man, setMan] = useState([]);
  const [productStatus, setProductStatus] = useState("pending");
  const [assigned, setAssigned] = useState(false);

  const company_id = isAuth().company_id;

  const [values, setValues] = useState({
    orderid: Date.now(),
    description: "",
    pickupAddress: "",
    receiverPhone: "",
    receiverAddress: "",
    receiverName: "",
    amount: "",
    cost: 60,
    marchent_id: null,
    deliveryman_id: null,

    pickup: false,
  });

  const [error, setError] = useState({});
  const {
    orderid,
    description,
    pickupAddress,
    receiverPhone,
    receiverName,
    amount,
    cost,
    receiverAddress,

    marchent_id,
    pickup,
    deliveryman_id,
  } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const pickupSelect = () => {
    var checkBox = document.getElementById("checkbox");

    if (checkBox.checked == true) {
      setValues({ ...values, pickup: true });
      setShowAddress((showAddresss) => !showAddresss);
    } else {
      setValues({ ...values, pickup: false });
      setShowAddress((showAddresss) => !showAddresss);
    }
  };

  // const setUpName = () => {
  //   let marchentName = $("#namemarchent").children(":selected").html();
  //   setValues({ ...values, marchent_name: marchentName });
  //   //console.log("clicked");
  // };

  useEffect(() => {
    if (isAuth()) {
      if (isAuth().role === "admin") {
        getMarchentList();
        getManList();
        setCheckAdmin(false);
        setProductStatus("in progress");
        setAssigned(true);
      } else {
        setValues({
          ...values,
          marchent_id: isAuth()._id,
          pickupAddress: isAuth().address + isAuth().phone,
          productStatus: "pending",
          assigned: false,
          deliveryman_id: null,
        });
      }
    }
    //getCompanyList();
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
      console.log(error);
    }
  };

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

    setLoader(true);
    //console.log(company_id);

    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/addproduct`,
        data: {
          orderid,
          description,
          pickupAddress,
          receiverPhone,
          receiverName,
          amount,
          cost,
          receiverAddress,
          company_id,
          marchent_id,
          deliveryman_id,
          pickup,
          productStatus,
          assigned,
        },
      });
      if (result) {
        //console.log(result)
        setLoader(false);
        toast.success(result.data.message);
        setError({});
        setValues({
          orderid: Date.now(),
          description: "",
          pickupAddress: "",
          receiverPhone: "",
          receiverName: "",
          amount: "",
          receiverAddress: "",
          pickup: false,
        });
        window.location.href = window.location.href;
      }
    } catch (e) {
      //console.log(e.response.data.error);
      setLoader(false);
      // toast.error(e.response.data.error);
      // console.log(e);

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
                <h1 className='mb-4'>Add a Product To Delivery</h1>
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
                        error.orderid
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='text'
                      onChange={handleChange("orderid")}
                      value={orderid}
                      readOnly
                    />
                    <div className='invalid-feedback'>{error.orderid}</div>
                    <span>Order id</span>
                  </label>

                  <label className='form-group has-float-label mb-4'>
                    <textarea
                      className={
                        error.description
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      onChange={handleChange("description")}
                      value={description}></textarea>
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

                  {showAddress && (
                    <label className='form-group has-float-label mb-4'>
                      <textarea
                        className={
                          error.pickupAddress
                            ? " form-control is-invalid"
                            : " form-control"
                        }
                        onChange={handleChange("pickupAddress")}
                        value={pickupAddress}></textarea>
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
                        value={marchent_id}
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
                        onChange={handleChange("deliveryman_id")}
                        value={deliveryman_id}
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

                      <div className='invalid-feedback'>
                        {error.deliveryman_id}
                      </div>
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
                      value={receiverName}
                    />{" "}
                    <div className=' invalid-feedback'>
                      {error.receiverName}
                    </div>
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
                      value={receiverPhone}
                    />
                    <div className='invalid-feedback'>
                      {error.receiverPhone}
                    </div>
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
                      value={receiverAddress}></textarea>
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
                      value={amount}
                    />
                    <div className=' invalid-feedback'>{error.amount}</div>
                    <span>Amount</span>
                  </label>
                  <label className='form-group has-float-label mb-4'>
                    <input
                      className={
                        error.cost
                          ? " form-control is-invalid"
                          : " form-control"
                      }
                      type='number'
                      placeholder=''
                      onChange={handleChange("cost")}
                      value={cost}
                    />
                    <div className=' invalid-feedback'>{error.cost}</div>
                    <span>Delivery Charge</span>
                  </label>
                  <div className='d-flex justify-content-end align-items-center'>
                    <button
                      className='btn btn-primary btn-lg btn-shadow'
                      type='submit'
                      onClick={sendRequest}>
                      Add Product
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

export default withRouter(AddCompany);
