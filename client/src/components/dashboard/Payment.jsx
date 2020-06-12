import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { isAuth, getCookie } from "../../class/storage";
import { getAllPayment } from "../../class/getProducts";
import moment from "moment";
import PaymentSearch from "./PaymentSearch";
import PaymentList from "./PaymentList";
import $ from "jquery";
import axios from "axios";
import { Navbar } from "../Navbar";

export const Allproduct = () => {
  const [payment, setPayment] = useState([]);
  const [loader, setLoader] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});

  useEffect(() => {
    setLoader(true);
    (async () => {
      const results = await getAllPayment(
        isAuth()._id,
        isAuth().role,
        isAuth().company_id,
      );
      setPayment(results);
      setLoader(false);
    })();
  }, [phoneNumber]);

  const searchByPhoneNumber = (number) => {
    if (number.toString().length === 0) {
      setPhoneNumber(Date.now());
      //console.log(phoneNumber);
    }
    const results = payment.filter((d) => d.receiverPhone.includes(number));
    setPayment(results);
  };

  const searchItem = (item1, item2) => {
    let result = payment.filter(
      (d) =>
        d.createdAt >= moment(item1).format() &&
        d.createdAt <= moment(item2).format(),
    );
    setPayment(result);

    //console.log(moment(item1).format(), moment(item2).format());
  };

  const searchProductByMarchent = () => {
    const results = payment.filter((d) => (d.marchent ? d.marchent : 0));
    setPayment(results);
  };

  const searchProductByMan = () => {
    const results = payment.filter((d) => (d.deliveryman ? d.deliveryman : 0));
    setPayment(results);
  };

  const refreshpayment = () => {
    setLoader(true);
    setPhoneNumber(Date.now());
  };

  const removePayment = (id) => {
    $("#ok_button").click(async function () {
      try {
        let result = await axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_API_URL}/removepayment`,
          data: {
            id,
            token: getCookie("token"),
          },
        });
        if (result) {
          setSuccess("Item Deleted Successfully.");
          setPhoneNumber(Date.now());
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
      } catch (e) {
        setError(e.response.data.error);
      }
    });
  };

  return (
    <>
      <Navbar />
      <Layout />
      <main>
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
        <PaymentSearch
          searchItem={searchItem}
          searchProductByMarchent={searchProductByMarchent}
          searchProductByMan={searchProductByMan}
          refreshpayment={refreshpayment}
        />
        <div className='row'>
          <div className='col-12'>
            <PaymentList payment={payment} removePayment={removePayment} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Allproduct;
