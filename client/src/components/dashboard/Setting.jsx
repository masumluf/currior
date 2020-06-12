import React, { useState, useEffect, Profiler } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { isAuth, getCookie } from "../../class/storage";

import "./glide.core.min.css";
import { Navbar } from "../Navbar";

export const Setting = () => {
  const [profile, setProfile] = useState([]);

  const fetchData = async () => {
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/profile`,
        data: {
          token: getCookie("token"),
        },
      });
      return result.data.result;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    (async () => {
      const result = await fetchData();
      setProfile(result);
    })();
  }, []);

  //let { name } = JSON.stringify(marchent[0][1]);

  return (
    <>
      <Navbar />
      <Layout />

      <main>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1>Setting</h1>
              <nav
                className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
                aria-label='breadcrumb'>
                <ol className='breadcrumb pt-0'>
                  <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/picture'>Change Picture</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link to='/password'>Change Password</Link>
                  </li>
                </ol>
              </nav>
              <div className='separator mb-5'></div>
            </div>
          </div>
          <div className='col-lg-12 col-xl-12'>
            <h1>
              {profile.company_name ? profile.company_name : profile.name}
            </h1>

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
                      {profile.address}
                    </p>
                    <p className='font-weight-bold'>
                      <span className='text-muted'>Phone Number : </span>
                      {profile.phone}
                    </p>

                    <p className='font-weight-bold'>
                      <span className='text-muted'>
                        National ID Card Number :{" "}
                      </span>
                      {profile.nid}
                    </p>

                    <p className='font-weight-bold'>
                      <span className='text-muted'>Username : </span>
                      {profile.username}
                    </p>

                    {profile.drivingLicense && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>Driving License : </span>
                        {profile.drivingLicense}
                      </p>
                    )}

                    {profile.bikeRegNumber && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>
                          Bike Registration Number:{" "}
                        </span>
                        {profile.bikeRegNumber}
                      </p>
                    )}

                    {profile.referal && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>Referal Person: </span>
                        {profile.referal}
                      </p>
                    )}

                    {profile.area && (
                      <p className='font-weight-bold'>
                        <span className='text-muted'>Covering Area : </span>
                        {profile.area}
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
                          <div className='pb-4'>{profile.payment_type}</div>
                        </div>
                      </div>
                    </div>
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

export default Setting;
