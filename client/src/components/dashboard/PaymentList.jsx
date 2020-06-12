import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";

import { isAuth } from "../../class/storage";

import Alert from "./Alert";

const PaymentMap = ({
  _id,
  amount,
  description,
  marchent,
  deliveryman,
  createdAt,
  removePayment,
}) => {
  const generatePdf = () => {
    const doc = new window.jsPDF("p", "pt", "a4");

    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    doc.autoTable({
      body: [["Invoice No #", "", Date.now()]],
    });

    doc.autoTable({
      body: [[""]],
      theme: "plain",
    });

    doc.autoTable({
      body: [["Date :", "", "", dd + "/" + mm + "/" + yyyy]],
    });

    doc.autoTable({
      head: [["Description", "Amount"]],
      body: [[description, amount]],
      theme: "grid",
    });

    doc.save("Invoice.pdf");
  };

  return (
    <>
      <div className='card  d-flex flex-row-1 mb-3 active'>
        <div className='pl-2  d-flex flex-grow-1 min-width-zero'>
          <div className='card-body  align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
            <a href='Pages.Product.Detail.html' className='w-20 w-sm-100'>
              <p className='list-item-heading mb-0 truncate h3'>
                {" "}
                <strong className='text-danger'>{description}</strong>
              </p>
            </a>
            <p className='mb-0 text-muted text-small w-15 w-sm-100'>
              <span className='badge badge-pill badge-dark'>
                ট {amount === null ? "0.00" : amount === 0 ? "0.00" : amount}
              </span>
            </p>
            <p className='mb-0 text-muted text-small w-15 w-sm-100'>
              Product Added
              <strong className='text-body'>
                {" "}
                {<Moment fromNow>{createdAt}</Moment>}
              </strong>
            </p>
            <div className='w-15 w-sm-100'>
              <span
                className='badge badge-pill badge-danger'
                onClick={() => {
                  removePayment(_id);
                }}
                style={{ cursor: "pointer" }}
                data-toggle='modal'
                data-target='.bd-example-modal-lg'>
                <i className='iconsminds-remove'></i> Remove
              </span>
            </div>
          </div>
        </div>
        <div className='d-flex flex-grow-1 min-width-zero'>
          <div className='card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center'>
            {isAuth().role === "admin" && (
              <p className='mb-0  text-small text-dark w-15 w-xs-100 h4'>
                <strong>
                  <i className='simple-icon-user-following'></i> &nbsp;
                  {deliveryman
                    ? `Delivery Man : ${deliveryman.name} (${deliveryman.area})`
                    : marchent
                    ? `Marchent Name : ${marchent.name}`
                    : "invalid Payment"}
                </strong>
              </p>
            )}

            {isAuth().role === "admin" && (
              <p className='mb-0  text-small text-primary w-15 w-xs-100 h4'>
                <strong>
                  <i className='simple-icon-call-in'></i> &nbsp;
                  {deliveryman
                    ? `Phone : ${deliveryman.phone} `
                    : marchent
                    ? `Phone : ${marchent.phone}`
                    : "No number found"}
                </strong>
              </p>
            )}

            <p className='mb-0  text-small w-15 w-xs-100 text-success'>
              <strong onClick={generatePdf} style={{ cursor: "pointer" }}>
                {" "}
                <i className='iconsminds-billing'></i>Download Invoice
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const PaymentList = ({ payment, removePayment }) => {
  const totalAmount = payment.reduce((sum, payment) => sum + payment.amount, 0);
  return (
    <>
      <div className='col-12'>
        <div className='card-body text-right h2'>
          <strong>
            Total Amount Found{" "}
            <span className='badge badge-pill badge-primary'>
              {totalAmount} Taka
            </span>
          </strong>
        </div>
      </div>
      {payment.map((payment, index) => (
        <PaymentMap {...payment} key={index} removePayment={removePayment} />
      ))}
      <PaymentModal />
      <Alert />
    </>
  );
};

export default PaymentList;
