import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
import Editman from "./Editman";
import { isAuth, getCookie } from "../../class/storage";
import { getManList } from "../../class/getProducts";

import Alert from "./Alert";
import $ from "jquery";
import { Navbar } from "../Navbar";

const DashboardDiv = ({
  name,
  address,
  _id,
  phone,
  nid,
  payment_type,
  refreshChange,
  drivingLicense,
  bikeRegNumber,
  handleModal,
  removeman,
}) => {
  return (
    <div className='row'>
      <div className='col-12 list' data-check-all='checkAll'>
        <div className='card d-flex flex-row mb-3'>
          <div className='d-flex flex-grow-1 min-width-zero'>
            <div className='card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center'>
              <Link
                className='list-item-heading mb-0 truncate w-40 w-xs-100'
                to={`/man/${_id}`}>
                <i className='iconsminds-male-2'></i> {name}
              </Link>
              <p className='mb-0 text-dark text-small w-15 w-xs-100'>
                <i className='simple-icon-home'></i> {address}
              </p>
              <p className='mb-0 text-muted text-small w-15 w-xs-100'>
                <i className='simple-icon-call-in'></i> {phone}
              </p>

              <p className='mb-0 text-muted text-small w-15 w-xs-100'>
                <button
                  type='button'
                  className='btn btn-outline-dark mb-1'
                  data-toggle='modal'
                  data-backdrop='static'
                  onClick={() => {
                    handleModal(
                      _id,
                      name,
                      address,
                      payment_type,
                      nid,
                      phone,

                      drivingLicense,
                      bikeRegNumber,
                    );
                  }}
                  data-target='#exampleModalRight'>
                  Edit
                </button>
              </p>
              <p className='mb-0 text-muted text-small w-15 w-xs-100'>
                <button
                  type='button'
                  className='btn btn-outline-danger mb-1'
                  data-toggle='modal'
                  data-target='.bd-example-modal-lg'
                  onClick={() => {
                    removeman(_id);
                  }}>
                  Delete
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Manlist = () => {
  const [finalMan, setFinalMan] = useState([]);
  const [man, setMan] = useState([]);
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});
  const [refresh, setRefresh] = useState("");
  useEffect(() => {
    (async () => {
      const results = await getManList();
      setMan(results);
      setFinalMan(results);
    })();
  }, [refresh]);

  const [values, setValues] = useState({});

  const handleModal = (
    id,
    name,
    address,
    payment_type,
    nid,
    phone,
    drivingLicense,
    bikeRegNumber,
  ) => {
    setValues({
      id,
      name,
      address,
      payment_type,
      nid,
      phone,
      drivingLicense,
      bikeRegNumber,
    });
  };

  const manSearch = (e) => {
    const results = man.filter((d) => d.name.includes(e.target.value));
    setFinalMan(results);
  };

  const refreshChange = () => {
    setRefresh(Date.now());
  };

  const removeman = (id) => {
    $("#ok_button").click(async function () {
      try {
        let result = await axios({
          method: "DELETE",
          url: `${process.env.REACT_APP_API_URL}/removeman`,
          data: {
            id,
            token: getCookie("token"),
          },
        });
        if (result) {
          setSuccess("Item Deleted Successfully.");
          refreshChange();
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          setTimeout(function () {
            setSuccess({});
          }, 3000);
        }
      } catch (e) {
        setError(e.response.data.error);
        setTimeout(function () {
          setError({});
        }, 3000);
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
        <div className='container-fluid disable-text-selection'>
          <div className='row'>
            <div className='col-12'>
              <div className='mb-2'>
                <h1>Delivery Man List</h1>
                <div className='top-right-button-container'>
                  <a
                    href='/adddeliveryman'
                    type='button'
                    className='btn btn-primary btn-lg top-right-button mr-1'>
                    ADD NEW
                  </a>
                </div>

                <nav
                  className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
                  aria-label='breadcrumb'>
                  <ol className='breadcrumb pt-0'>
                    <li className='breadcrumb-item'>
                      <a href='#'>Home</a>
                    </li>
                    <li className='breadcrumb-item'>
                      <a href='/allproduct'>Product</a>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      Data
                    </li>
                  </ol>
                </nav>
              </div>

              <div className='mb-2'>
                <a
                  className='btn pt-0 pl-0 d-inline-block d-md-none'
                  data-toggle='collapse'
                  href='#displayOptions'
                  role='button'
                  aria-expanded='true'
                  aria-controls='displayOptions'>
                  Display Options
                  <i className='simple-icon-arrow-down align-middle'></i>
                </a>
                <div className='collapse dont-collapse-sm' id='displayOptions'>
                  <span className='mr-3 mb-2 d-inline-block float-md-left'>
                    <a href='#' className='mr-2 view-icon active'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 19 19'>
                        <path
                          className='view-icon-svg'
                          d='M17.5,3H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M17.5,10H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M17.5,17H.5a.5.5,0,0,1,0-1h17a.5.5,0,0,1,0,1Z'></path>
                      </svg>
                    </a>
                    <a href='#' className='mr-2 view-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 19 19'>
                        <path
                          className='view-icon-svg'
                          d='M17.5,3H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M3,2V3H1V2H3m.12-1H.88A.87.87,0,0,0,0,1.88V3.12A.87.87,0,0,0,.88,4H3.12A.87.87,0,0,0,4,3.12V1.88A.87.87,0,0,0,3.12,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M3,9v1H1V9H3m.12-1H.88A.87.87,0,0,0,0,8.88v1.24A.87.87,0,0,0,.88,11H3.12A.87.87,0,0,0,4,10.12V8.88A.87.87,0,0,0,3.12,8Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M3,16v1H1V16H3m.12-1H.88a.87.87,0,0,0-.88.88v1.24A.87.87,0,0,0,.88,18H3.12A.87.87,0,0,0,4,17.12V15.88A.87.87,0,0,0,3.12,15Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M17.5,10H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M17.5,17H6.5a.5.5,0,0,1,0-1h11a.5.5,0,0,1,0,1Z'></path>
                      </svg>
                    </a>
                    <a href='#' className='mr-2 view-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 19 19'>
                        <path
                          className='view-icon-svg'
                          d='M7,2V8H1V2H7m.12-1H.88A.87.87,0,0,0,0,1.88V8.12A.87.87,0,0,0,.88,9H7.12A.87.87,0,0,0,8,8.12V1.88A.87.87,0,0,0,7.12,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M17,2V8H11V2h6m.12-1H10.88a.87.87,0,0,0-.88.88V8.12a.87.87,0,0,0,.88.88h6.24A.87.87,0,0,0,18,8.12V1.88A.87.87,0,0,0,17.12,1Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M7,12v6H1V12H7m.12-1H.88a.87.87,0,0,0-.88.88v6.24A.87.87,0,0,0,.88,19H7.12A.87.87,0,0,0,8,18.12V11.88A.87.87,0,0,0,7.12,11Z'></path>
                        <path
                          className='view-icon-svg'
                          d='M17,12v6H11V12h6m.12-1H10.88a.87.87,0,0,0-.88.88v6.24a.87.87,0,0,0,.88.88h6.24a.87.87,0,0,0,.88-.88V11.88a.87.87,0,0,0-.88-.88Z'></path>
                      </svg>
                    </a>
                  </span>
                  <div className='d-block d-md-inline-block'>
                    <div className='btn-group float-md-left mr-1 mb-1'>
                      <button
                        className='btn btn-outline-dark btn-xs dropdown-toggle'
                        type='button'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'>
                        Order By
                      </button>
                      <div className='dropdown-menu'>
                        <a className='dropdown-item' href='#'>
                          Active Account
                        </a>
                        <a className='dropdown-item' href='#'>
                          Pending Account
                        </a>
                      </div>
                    </div>
                    <div className='search-sm calendar-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
                      <input
                        className='form-control datepicker'
                        placeholder='Search by Name'
                        onChange={manSearch}
                      />
                    </div>
                  </div>
                  <div className='float-md-right'>
                    <span className='text-muted text-small'>
                      Displaying {finalMan.length} items{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className='separator mb-5'></div>
            </div>
          </div>

          {finalMan.map((m, index) => (
            <DashboardDiv
              {...m}
              key={index}
              handleModal={handleModal}
              refreshChange={refreshChange}
              removeman={removeman}
            />
          ))}
          <Editman {...values} setRefresh={setRefresh} />
          <Alert />
        </div>
      </main>
    </>
  );
};

export default Manlist;
