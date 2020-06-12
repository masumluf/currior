import React, { useState } from "react";
import Moment from "react-moment";

import ModalLayout from "./ModalLayout";

import { isAuth } from "../../class/storage";
import { updateProduct } from "../../class/getProducts";

// import JsBarcode from "jsbarcode";
// import canvg from "canvg";

const ProductMap = ({
  _id,
  pickup,
  amount,
  orderid,
  description,
  pickupAddress,
  receiverPhone,
  receiverName,
  receiverAddress,
  productStatus,
  marchent_id,
  assigned,
  marchent,
  cost,
  createdAt,
  handleModal,
}) => {
  return (
    <>
      <div id='svg-container'>
        <svg id='barcode' style={{ display: "none" }}></svg>
      </div>
      <div
        className={
          assigned
            ? "card  d-flex flex-row-1 mb-3 active"
            : "card bg-light d-flex flex-row-1 mb-3 active"
        }>
        <div className='pl-2  d-flex flex-grow-1 min-width-zero'>
          <div className='card-body  align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center'>
            <a href='Pages.Product.Detail.html' className='w-20 w-sm-100'>
              <p className='list-item-heading mb-0 truncate h3'>
                {" "}
                <strong>{description}</strong>
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
                className={
                  productStatus === "pending"
                    ? "badge badge-pill badge-primary"
                    : productStatus === "in progress"
                    ? "badge badge-pill badge-warning"
                    : productStatus === "cancel"
                    ? "badge badge-pill badge-danger"
                    : "badge badge-pill badge-success"
                }>
                <i className='iconsminds-shopping-cart'></i> {productStatus}
              </span>
            </div>
          </div>
        </div>
        <div className='d-flex flex-grow-1 min-width-zero'>
          <div className='card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center'>
            <p className='mb-0  text-small w-15 w-xs-100 text-success'>
              <strong>{receiverName}</strong>
            </p>
            <p className='mb-0  text-small w-15 w-xs-100 h4'>
              <strong>{receiverAddress}</strong>
            </p>

            <p className='mb-0  text-small w-15 w-xs-100 text-primary'>
              <i className='simple-icon-call-in'></i>
              &nbsp;<strong>{receiverPhone}</strong>
            </p>

            <p className='mb-0  text-small w-15 w-xs-100 text-warning'>
              <span
                className={
                  assigned
                    ? "badge badge-pill badge-primary"
                    : "badge badge-pill badge-danger"
                }>
                <i className='simple-icon-bell'></i>&nbsp;
                {assigned ? "Assigned" : "Not assigned"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ReportList = ({ mainProducts }) => {
  const totalAmount = mainProducts.reduce(
    (sum, product) => sum + product.amount,
    0,
  );
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
      {mainProducts.map((product, index) => (
        <ProductMap {...product} key={index} />
      ))}
    </>
  );
};

export default ReportList;
