import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAuth } from "../../class/storage";
const ManReportSearch = ({ searchItem, refreshProducts }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [marchent, setMarchent] = useState([]);
  const [selectMarchent, setSelectMarchent] = useState("");

  useEffect(() => {
    getManList();
  }, []);

  const handleChange = (name) => (e) => {
    if (name === "deliveryman" && e.target.value !== "Select Deliveryman") {
      setSelectMarchent(e.target.value);
    } else {
      refreshProducts();
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

      setMarchent(result.data.manList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='row '>
      <div className='col-12 col-xl-12 mb-2'>
        <div className='card h-100'>
          <div className='card-body mt-5'>
            <h1>DeliveryMan Report</h1>
            <div className='top-right-button-container'></div>
            <nav
              className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
              aria-label='breadcrumb'>
              <ol className='breadcrumb pt-0'>
                <li className='breadcrumb-item'>
                  <a href='#'>Home</a>
                </li>
                <li className='breadcrumb-item'>
                  <a href='#' onClick={refreshProducts}>
                    <i className='simple-icon-refresh'></i>Refresh
                  </a>
                </li>
              </ol>
            </nav>

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
            {isAuth().role === "admin" && (
              <div className='form-group mt-3'>
                <label className='form-group has-float-label mb-4'>
                  <select
                    className='custom-select custom-select-lg mb-3'
                    onChange={handleChange("deliveryman")}
                    id='namemarchent'>
                    <option defaultValue>Select Deliveryman</option>
                    {marchent.map((item) => {
                      return (
                        <option value={item._id}>
                          {item.name}({item.area})
                        </option>
                      );
                    })}
                  </select>

                  <span>Select Deliveryman</span>
                </label>
              </div>
            )}

            <div className='form-group mb-1'>
              <button
                className='input-sm form-control'
                onClick={() => {
                  searchItem(startDate, endDate, selectMarchent);
                }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManReportSearch;
