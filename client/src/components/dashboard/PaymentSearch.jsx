import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { isAuth } from "../../class/storage";
import "react-datepicker/dist/react-datepicker.css";

const PaymentSearch = ({
  searchItem,
  searchByPhoneNumber,
  searchProductByMan,
  searchProductByMarchent,
  refreshpayment,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [values, setValues] = useState({
    keyword: "",
  });
  const [marchent, setMarchent] = useState([]);

  const { keyword } = values;

  useEffect(() => {
    getMarchentList();
  }, []);

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

  //   const handleChange = (name) => (e) => {
  //     setValues({ ...values, [name]: e });
  //   };

  return (
    <div className='row '>
      <div className='col-12 col-xl-12 mb-2'>
        <div className='card h-100'>
          <div className='card-body mt-5'>
            <h1>Payment List</h1>
            <div className='top-right-button-container'></div>
            <nav
              className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
              aria-label='breadcrumb'>
              <ol className='breadcrumb pt-0'>
                <li className='breadcrumb-item'>
                  <a href='#'>Home</a>
                </li>
                <li className='breadcrumb-item'>
                  <a href='#'>Add Payment</a>
                </li>
              </ol>
            </nav>
            <div className='form-group mb-3'>
              <label>
                <strong className='text-info'>Search By Company Name</strong>
              </label>
              <input
                className='form-control'
                onChange={(e) => searchByPhoneNumber(e.target.value)}
                placeholder='Enter Name'
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

            <div className='form-group mt-3'>
              <label>
                <strong className='text-info'>Search By Status</strong>
              </label>
              <div className='d-flex flex-grow-1 min-width-zero'>
                <p className='mb-0  text-small w-20 w-xs-100 '>
                  <a
                    href='#'
                    onClick={() => {
                      searchProductByMarchent("Marchent");
                    }}>
                    <span className='badge badge-pill badge-success'>
                      Marchent
                    </span>
                  </a>
                </p>
                <p className='mb-0  text-small w-20 w-xs-100 text-danger'>
                  <a href='#' onClick={searchProductByMan}>
                    <span className='badge badge-pill badge-danger'>
                      DeliveryMan
                    </span>
                  </a>
                </p>

                <p className='mb-0  text-small w-20 w-xs-100 text-primary'>
                  <a href='#' onClick={refreshpayment}>
                    <strong className='h4'>
                      <i className='simple-icon-refresh'></i>Refresh
                    </strong>
                  </a>
                </p>

                <p>
                  <span className='badge badge-pill badge-primary'>
                    <i className='simple-icon-pencil'></i>
                    <a
                      href='#'
                      data-toggle='modal'
                      data-backdrop='static'
                      data-target='#exampleModalRight'>
                      <strong className='text-light'> &nbsp;Add Payment</strong>
                    </a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSearch;
