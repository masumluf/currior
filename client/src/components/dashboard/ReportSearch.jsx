import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAuth } from "../../class/storage";
const ReportSearch = ({ searchItem, refreshProducts }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [marchent, setMarchent] = useState([]);
  const [selectMarchent, setSelectMarchent] = useState("");

  useEffect(() => {
    getMarchentList();
  }, []);

  const handleChange = (name) => (e) => {
    if (name === "marchent" && e.target.value !== "Select Marchent") {
      setSelectMarchent(e.target.value);
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

  return (
    <div className='row '>
      <div className='col-12 col-xl-12 mb-2'>
        <div className='card h-100'>
          <div className='card-body mt-5'>
            <h1>Marchent Report</h1>
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

export default ReportSearch;
