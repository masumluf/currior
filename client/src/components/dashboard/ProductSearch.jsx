import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAuth } from "../../class/storage";
const ProductSearch = ({
  searchItem,
  searchByPhoneNumber,
  searchProductByStatus,
  refreshProducts,
  searchProductByMarchent,
  searchProductByMan,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [values, setValues] = useState({
    keyword: "",
  });
  const [marchent, setMarchent] = useState([]);
  const [man, setMan] = useState([]);

  const { keyword } = values;

  useEffect(() => {
    getMarchentList();
    getManList();
  }, []);

  const handleChange = (name) => (e) => {
    if (name === "marchent" && e.target.value !== "Select Marchent") {
      searchProductByMarchent(e.target.value);
    } else if (name === "man" && e.target.value !== "Choose Delivery Person") {
      searchProductByMan(e.target.value);
    } else {
      refreshProducts();
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

  return (
    <div className='row '>
      <div className='col-12 col-xl-12 mb-2'>
        <div className='card h-100'>
          <div className='card-body mt-5'>
            <h1>Product List</h1>
            <div className='top-right-button-container'></div>
            <nav
              className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
              aria-label='breadcrumb'>
              <ol className='breadcrumb pt-0'>
                <li className='breadcrumb-item'>
                  <a href='#'>Home</a>
                </li>
                <li className='breadcrumb-item'>
                  <a href='#'>Add Product</a>
                </li>
              </ol>
            </nav>
            <div className='form-group mb-3'>
              <label>
                <strong className='text-info'>Search By Phone Number</strong>
              </label>
              <input
                className='form-control'
                onChange={(e) => searchByPhoneNumber(e.target.value)}
                placeholder='Enter Phone Number'
              />
            </div>

            <div className='form-group mb-3'>
              <label>
                <strong className='text-danger'>Search By Date Range</strong>
              </label>
              <div className='input-daterange input-group' id='datepicker'>
                <DatePicker
                  className='form-control'
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                />
                <span className='input-group-addon'></span>

                <DatePicker
                  className='input-sm form-control'
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                />
              </div>
            </div>

            <div className='form-group mb-1'>
              <button
                className='input-sm form-control'
                onClick={() => {
                  searchItem(startDate, endDate);
                }}>
                Search
              </button>
            </div>

            {isAuth().role === "admin" && (
              <div className='form-group mt-3'>
                <label className='form-group has-float-label mb-4'>
                  <select
                    className='custom-select custom-select-lg mb-3'
                    onChange={handleChange("marchent")}
                    id='namemarchent'>
                    <option defaultValue>Select Marchent</option>
                    {marchent.map((item) => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </select>

                  <span>Select Marchent</span>
                </label>
              </div>
            )}

            {isAuth().role === "admin" && (
              <div className='form-group mt-3'>
                <label className='form-group has-float-label mb-4'>
                  <select
                    className='custom-select custom-select-lg mb-3'
                    onChange={handleChange("man")}
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

                  <span>Select Delivery Man</span>
                </label>
              </div>
            )}

            <div className='form-group mt-3'>
              <label>
                <strong className='text-info'>Search By Status</strong>
              </label>
              <div className='d-flex flex-grow-1 min-width-zero'>
                <p className='mb-0  text-small w-20 w-xs-100 '>
                  <a
                    href='#'
                    onClick={() => {
                      searchProductByStatus("delivered");
                    }}>
                    <span className='badge badge-pill badge-success'>
                      Delivered
                    </span>
                  </a>
                </p>
                <p className='mb-0  text-small w-20 w-xs-100 text-danger'>
                  <a
                    href='#'
                    onClick={() => {
                      searchProductByStatus("cancel");
                    }}>
                    <span className='badge badge-pill badge-danger'>
                      Cancelled
                    </span>
                  </a>
                </p>
                <p className='mb-0  text-small w-20 w-xs-100 text-warning'>
                  <a
                    href='#'
                    onClick={() => {
                      searchProductByStatus("in progress");
                    }}>
                    <span className='badge badge-pill badge-warning'>
                      In progress
                    </span>
                  </a>
                </p>
                <p className='mb-0  text-small w-20 w-xs-100 text-primary'>
                  <a
                    href='#'
                    onClick={() => {
                      searchProductByStatus("pending");
                    }}>
                    <span className='badge badge-pill badge-primary'>
                      Pending
                    </span>
                  </a>
                </p>
                <p className='mb-0  text-small w-20 w-xs-100 text-primary'>
                  <a href='#' onClick={refreshProducts}>
                    <strong className='h4'>
                      <i className='simple-icon-refresh'></i>Refresh
                    </strong>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
