import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import Moment from "react-moment";
import { isAuth } from "../../class/storage";
import { useParams } from "react-router-dom";

import "./glide.core.min.css";
import { Navbar } from "../Navbar";

const PaymentCard = ({ amount, description, createdAt }) => {
  return (
    <>
      <div className='d-flex flex-row mb-3'>
        <a className='d-block position-relative' href='#'></a>
        <div className='pl-3 pt-2 pr-2 pb-2'>
          <a href='#'>
            <p className='list-item-heading'>{description}</p>
            <div className='pr-4 d-none d-sm-block'>
              <p className='text-muted mb-1 text-small'>{amount}</p>
            </div>
            <div className='text-primary text-small font-weight-medium d-none d-sm-block'>
              {<Moment fromNow>{createdAt}</Moment>}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export const Marchent = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [marchent, setMarchent] = useState([]);
  const [payments, setPayments] = useState([]);
  const fetchData = async (id) => {
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/singleman`,
        data: {
          id,
        },
      });
      return result.data.marchent;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    (async () => {
      const { payments, products, marchents } = await fetchData(id);
      setPayments(payments);
      setProducts(products);
      setMarchent(marchents);
    })();
  }, [id]);

  //let { name } = JSON.stringify(marchent[0][1]);

  //console.log(obj);

  const delivered = products.filter(
    (product) => product.productStatus === "delivered",
  );

  const cancel = products.filter(
    (product) => product.productStatus === "cancel",
  );

  const totalMoney = payments.reduce((sum, current) => sum + current.amount, 0);

  const r = JSON.stringify(marchent[0]);
  console.log(r);

  return (
    <>
      <Navbar />
      <Layout />

      <main>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1>
                {marchent.name}({marchent.area})
              </h1>
              <nav
                className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
                aria-label='breadcrumb'>
                <ol className='breadcrumb pt-0'>
                  <li className='breadcrumb-item'>
                    <a href='#'>Home</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href='#'>Library</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Data
                  </li>
                </ol>
              </nav>
              <div className='separator mb-5'></div>
            </div>
          </div>
          <div className='col-lg-12 col-xl-12'>
            <div className='icon-cards-row'>
              <div className='glide dashboard-numbers glide--ltr glide--slider glide--swipeable'>
                <div className='glide__track' data-glide-el='track'>
                  <ul className='glide__slides'>
                    <li
                      className='glide__slide glide__slide--active'
                      style={{ width: "222.667px", marginRight: "3.5px" }}>
                      <a
                        className='card'
                        draggable='true'
                        data-href='#'
                        href='#'>
                        <div className='card-body text-center'>
                          <i className='iconsminds-clock'></i>
                          <p className='card-text mb-0'>Total products</p>
                          <p className='lead text-center'>{products.length}</p>
                        </div>
                      </a>
                    </li>
                    <li
                      className='glide__slide'
                      style={{
                        width: "222.667px",
                        marginLeft: "3.5px",
                        marginRight: "3.5px",
                      }}>
                      <a
                        className='card'
                        draggable='true'
                        data-href='#'
                        href='#'>
                        <div className='card-body text-center'>
                          <i className='iconsminds-basket-coins'></i>
                          <p className='card-text mb-0'>Total Delivered</p>
                          <p className='lead text-center'>{delivered.length}</p>
                        </div>
                      </a>
                    </li>
                    <li
                      className='glide__slide'
                      style={{
                        width: "222.667px",
                        marginLeft: "3.5px",
                        marginRight: "3.5px",
                      }}>
                      <a
                        className='card'
                        draggable='true'
                        data-href='#'
                        href='#'>
                        <div className='card-body text-center'>
                          <i className='iconsminds-arrow-refresh'></i>
                          <p className='card-text mb-0'>Total Cancel</p>
                          <p className='lead text-center'>{cancel.length}</p>
                        </div>
                      </a>
                    </li>
                    <li
                      className='glide__slide'
                      style={{ width: "222.667px", marginLeft: "3.5px" }}>
                      <a
                        className='card'
                        draggable='true'
                        data-href='#'
                        href='#'>
                        <div className='card-body text-center'>
                          <i className='iconsminds-mail-read'></i>
                          <p className='card-text mb-0'>
                            Total Payment Received
                          </p>
                          <p className='lead text-center'>{totalMoney}</p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-12 col-lg-12 mb-4'>
            <div className='card'>
              <div className='card-header'>
                <ul className='nav nav-tabs card-header-tabs ' role='tablist'>
                  <li className='nav-item'>
                    <a
                      className='nav-link active'
                      id='first-tab'
                      data-toggle='tab'
                      href='#first'
                      role='tab'
                      aria-controls='first'
                      aria-selected='true'>
                      Personal Information
                    </a>
                  </li>

                  <li className='nav-item'>
                    <a
                      className='nav-link'
                      id='third-tab'
                      data-toggle='tab'
                      href='#third'
                      role='tab'
                      aria-controls='third'
                      aria-selected='false'>
                      Payment Details
                    </a>
                  </li>
                </ul>
              </div>
              <div className='card-body'>
                <div className='tab-content'>
                  <div
                    className='tab-pane fade active show'
                    id='first'
                    role='tabpanel'
                    aria-labelledby='first-tab'>
                    <p className='font-weight-bold'>
                      <span className='text-muted'>Address : </span>
                      {marchent.address}
                    </p>
                    <p className='font-weight-bold'>
                      <span className='text-muted'>Phone Number : </span>
                      {marchent.phone}
                    </p>

                    <p className='font-weight-bold'>
                      <span className='text-muted'>
                        National ID Card Number :{" "}
                      </span>
                      {marchent.nid}
                    </p>

                    <p className='font-weight-bold'>
                      <span className='text-muted'>Username : </span>
                      {marchent.username}
                    </p>

                    {marchent.drivingLicense && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>Driving License : </span>
                        {marchent.drivingLicense}
                      </p>
                    )}

                    {marchent.bikeRegNumber && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>
                          Bike Registration Number:{" "}
                        </span>
                        {marchent.bikeRegNumber}
                      </p>
                    )}

                    {marchent.referal && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>Referal Person: </span>
                        {marchent.referal}
                      </p>
                    )}

                    {marchent.area && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>Covering Area : </span>
                        {marchent.area}
                      </p>
                    )}
                  </div>

                  <div
                    className='tab-pane fade'
                    id='third'
                    role='tabpanel'
                    aria-labelledby='third-tab'>
                    <div id='accordion'>
                      <div>
                        <button
                          className='btn btn-link p-0 pb-2 font-weight-bold'
                          data-toggle='collapse'
                          data-target='#collapseOne'
                          aria-expanded='true'
                          aria-controls='collapseOne'>
                          <p>Payment Details As below</p>
                        </button>

                        <div
                          id='collapseOne'
                          className='collapse show'
                          data-parent='#accordion'>
                          <div className='pb-4'>{marchent.payment_type}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-xl-12 col-lg-12 mb-4'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>Recent Payment History</h5>
                <div className='scroll dashboard-list-with-thumbs ps ps--active-y'>
                  {payments.map((payment) => (
                    <PaymentCard {...payment} />
                  ))}

                  <div
                    className='ps__rail-x'
                    style={{ left: "0px", bottom: "0px" }}>
                    <div
                      className='ps__thumb-x'
                      tabindex='0'
                      style={{ left: "0px", width: "0px" }}></div>
                  </div>
                  <div
                    className='ps__rail-y'
                    style={{ top: "0px", height: "500px", right: "0px" }}>
                    <div
                      className='ps__thumb-y'
                      tabindex='0'
                      style={{ top: "0px", height: "395px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Marchent;
