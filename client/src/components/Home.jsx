import React from "react";
import { Link } from "react-router-dom";
import Navbarcopy from "./Navbarcopy";

const LoginOption = () => {
  return (
    <div className='container'>
      <div className='col-12 mt-5'>
        <div className='row equal-height-container'>
          <div className='col-12'>
            <h5 className='mb-4'>Price Comparison</h5>
          </div>

          <div className='col-md-12 col-lg-4 mb-4 col-item'>
            <div className='card'>
              <div className='card-body pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column'>
                <div className='price-top-part'>
                  <i className='iconsminds-male large-icon'></i>
                  <h5 className='mb-0 font-weight-semibold color-theme-1 mb-4'>
                    Company Admin
                  </h5>

                  <div className='text-center'>
                    <Link
                      to='/adminlogin'
                      className='btn btn-link btn-empty btn-lg'>
                      LOGIN <i className='simple-icon-arrow-right'></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12 col-lg-4 mb-4 col-item'>
            <div className='card'>
              <div className='card-body pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column'>
                <div className='price-top-part'>
                  <i className='iconsminds-male-female large-icon'></i>
                  <h5 className='mb-0 font-weight-semibold color-theme-1 mb-4'>
                    MARCHENT
                  </h5>

                  <div className='text-center'>
                    <Link
                      to='/marchentlogin'
                      className='btn btn-link btn-empty btn-lg'>
                      LOGIN <i className='simple-icon-arrow-right'></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-12 col-lg-4 mb-4 col-item'>
            <div className='card'>
              <div className='card-body pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column'>
                <div className='price-top-part'>
                  <i className='iconsminds-mens large-icon'></i>
                  <h5 className='mb-0 font-weight-semibold color-theme-1 mb-4'>
                    DELIVERY MAN
                  </h5>

                  <div className='text-center'>
                    <Link
                      to='/manlogin'
                      className='btn btn-link btn-empty btn-lg'>
                      LOGIN <i className='simple-icon-arrow-right'></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeComponent = () => {
  return (
    <>
      <Navbarcopy />
      <section className='mt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <LoginOption />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const Home = () => {
  return <HomeComponent />;
};

export default Home;
