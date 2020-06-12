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
  deliveryman,
  receiverAddress,
  productStatus,
  marchent_id,
  assigned,
  marchent,
  cost,
  createdAt,
  handleModal,
}) => {
  const generatePdf = () => {
    const doc = new window.jsPDF("p", "pt", "a4");

    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    //const canvas = new Canvas();
    // var svg = document.getElementById("svg-container").innerHTML;
    // if (svg) svg = svg.replace(/\r?\n|\r/g, "").trim();

    // var canvas = document.createElement("canvas");
    // var context = canvas.getContext("2d");

    // context.clearRect(0, 0, canvas.width, canvas.height);
    // canvg(canvas, svg);
    // JsBarcode("#barcode", "Hi!");

    // var imgData = canvas.toDataURL("image/png");

    //const image = document.getElementById("barcode");
    //console.log(image);

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    // doc.autoTable({ html: "#my-table" });

    //doc.addSVG(image, 20, 20, 50, 60);
    //doc.addImage(imgData, "PNG", 40, 40, 75, 75);
    //doc.autoTable(());

    doc.autoTable({
      body: [
        ["Recevier Information :", "", "", ""],
        [receiverName, "", "", "Order ID #"],
        [receiverAddress, "", "", orderid],
        [receiverPhone, "", "", dd + "/" + mm + "/" + yyyy],
      ],
      theme: "plain",
    });

    doc.autoTable({
      body: [["", "", "", ""]],
    });

    doc.autoTable({
      body: [
        ["Marchent Information :"],
        [marchent.name],
        [marchent.address],
        [marchent.phone],
      ],
      theme: "plain",
    });

    doc.autoTable({
      body: [["", "", "", ""]],
    });

    doc.autoTable({
      head: [["Product Description", "", "", "Amount"]],
      body: [
        [description, "", "", amount],

        ["Delivery Charge", "", "", cost],
        ["Total Bill", "", "", cost + amount],
      ],
      theme: "grid",
    });

    doc.save("Order.pdf");
  };

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
            {isAuth().role !== "man" && (
              <div>
                <i className='simple-icon-pencil'></i>

                <a
                  href='#'
                  data-toggle='modal'
                  data-backdrop='static'
                  onClick={() =>
                    handleModal(
                      _id,
                      pickup,
                      amount,
                      orderid,
                      description,
                      pickupAddress,
                      receiverPhone,
                      receiverName,
                      deliveryman,
                      receiverAddress,
                      productStatus,
                      marchent_id,
                      assigned,
                    )
                  }
                  data-target='#exampleModalRight'>
                  <strong className='text-primary'> &nbsp;Edit</strong>
                </a>
              </div>
            )}
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
            {isAuth().role === "admin" && (
              <p className='mb-0  text-small text-primary w-15 w-xs-100 h4'>
                <span className='badge badge-pill badge-primary'>
                  <strong>
                    {deliveryman
                      ? `Delivery Man :${deliveryman.name}`
                      : "No Person"}
                  </strong>
                </span>
              </p>
            )}
            <p className='mb-0  text-small w-15 w-xs-100 text-primary'>
              <i className='simple-icon-call-in'></i>
              &nbsp;<strong>{receiverPhone}</strong>
            </p>
            <p className='mb-0  text-small w-15 w-xs-100 text-danger'>
              <strong onClick={generatePdf} style={{ cursor: "pointer" }}>
                {" "}
                <i className='iconsminds-billing'></i>Download Invoice
              </strong>
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
        {isAuth().role === "man" && (
          <div className='d-flex flex-grow-1 min-width-zero'>
            <div className='card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center'>
              <p className='mb-0  text-small w-15 w-xs-100 text-success'>
                <button
                  className='btn btn-success default  mb-1'
                  onClick={() => updateProduct(_id, "delivered")}>
                  Delivered
                </button>
              </p>
              <p className='mb-0  text-small w-15 w-xs-100 h4'>
                <button
                  className='btn btn-danger default  mb-1'
                  onClick={() => updateProduct(_id, "cancel")}>
                  Cancelled
                </button>
              </p>
              <p className='mb-0  text-small w-15 w-xs-100 h4'></p>
              <p className='mb-0  text-small w-15 w-xs-100 h4'></p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ProductList = ({ products }) => {
  const [values, setValues] = useState({
    id: "",
    description: "",
  });

  const handleModal = (
    id,
    pickup,
    amount,
    orderid,
    description,
    pickupAddress,
    receiverPhone,
    receiverName,
    deliveryman,
    receiverAddress,
    productStatus,
    marchent_id,
    assigned,
  ) => {
    setValues({
      id,
      pickup,
      amount,
      orderid,
      description,
      pickupAddress,
      receiverPhone,
      receiverName,
      deliveryman: deliveryman ? deliveryman._id : "",
      marchent_id,
      receiverAddress,
      productStatus,
      assigned,
    });
  };
  const totalAmount = products.reduce(
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
      {products.map((product, index) => (
        <ProductMap {...product} handleModal={handleModal} key={index} />
      ))}
      <ModalLayout {...values} />
    </>
  );
};

export default ProductList;
