import React from "react";
import { Link, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { isAuth, signout } from "../class/storage";

export const Navbar = () => {
  const history = createBrowserHistory();
  return (
    <>
      <nav className='navbar fixed-top' style={{ opacity: 1 }}>
        {isAuth() && (
          <Link to='#' className='menu-button d-none d-md-block'>
            <svg
              className='main'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 9 17'>
              <rect x='0.48' y='0.5' width='7' height='1'></rect>
              <rect x='0.48' y='7.5' width='7' height='1'></rect>
              <rect x='0.48' y='15.5' width='7' height='1'></rect>
            </svg>
            <svg
              className='sub'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 18 17'>
              <rect x='1.56' y='0.5' width='16' height='1'></rect>
              <rect x='1.56' y='7.5' width='16' height='1'></rect>
              <rect x='1.56' y='15.5' width='16' height='1'></rect>
            </svg>
          </Link>
        )}
        <div className='container'>
          <div className='d-flex align-items-center navbar-left'>
            <Link className='navbar-logo' to='/'>
              <span className='logo d-none d-xs-block'></span>
              <span className='logo-mobile d-block d-xs-none'></span>
            </Link>
          </div>

          {isAuth() && (
            <>
              <div className='navbar-right'>
                <div className='position-relative d-inline-block'>
                  <button
                    className='header-icon btn btn-empty'
                    type='button'
                    id='notificationButton'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'>
                    <i className='simple-icon-bell'></i>
                    <span className='count'>3</span>
                  </button>
                  <div
                    className='dropdown-menu dropdown-menu-right mt-3 position-absolute'
                    id='notificationDropdown'>
                    <div className='scroll ps'>
                      <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
                        <a href='#'>
                          <img
                            src='img/profile-pic-l-2.jpg'
                            alt='Notification Image'
                            className='img-thumbnail list-thumbnail xsmall border-0 rounded-circle'
                          />
                        </a>
                        <div className='pl-3'>
                          <a href='#'>
                            <p className='font-weight-medium mb-1'>
                              Joisse Kaycee just sent a new comment!
                            </p>
                            <p className='text-muted mb-0 text-small'>
                              09.04.2018 - 12:45
                            </p>
                          </a>
                        </div>
                      </div>
                      <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
                        <a href='#'>
                          <img
                            src='img/notification-thumb.jpg'
                            alt='Notification Image'
                            className='img-thumbnail list-thumbnail xsmall border-0 rounded-circle'
                          />
                        </a>
                        <div className='pl-3'>
                          <a href='#'>
                            <p className='font-weight-medium mb-1'>
                              1 item is out of stock!
                            </p>
                            <p className='text-muted mb-0 text-small'>
                              09.04.2018 - 12:45
                            </p>
                          </a>
                        </div>
                      </div>
                      <div className='d-flex flex-row mb-3 pb-3 border-bottom'>
                        <a href='#'>
                          <img
                            src='img/notification-thumb-2.jpg'
                            alt='Notification Image'
                            className='img-thumbnail list-thumbnail xsmall border-0 rounded-circle'
                          />
                        </a>
                        <div className='pl-3'>
                          <a href='#'>
                            <p className='font-weight-medium mb-1'>
                              New order received! It is total $147,20.
                            </p>
                            <p className='text-muted mb-0 text-small'>
                              09.04.2018 - 12:45
                            </p>
                          </a>
                        </div>
                      </div>
                      <div className='d-flex flex-row mb-3 pb-3 '>
                        <a href='#'>
                          <img
                            src='img/notification-thumb-3.jpg'
                            alt='Notification Image'
                            className='img-thumbnail list-thumbnail xsmall border-0 rounded-circle'
                          />
                        </a>
                        <div className='pl-3'>
                          <a href='#'>
                            <p className='font-weight-medium mb-1'>
                              3 items just added to wish list by a user!
                            </p>
                            <p className='text-muted mb-0 text-small'>
                              09.04.2018 - 12:45
                            </p>
                          </a>
                        </div>
                      </div>
                      <div
                        className='ps__rail-x'
                        style={{ left: 0, bottom: 0 }}>
                        <div
                          className='ps__thumb-x'
                          tabindex='0'
                          style={{ left: 0, width: 0 }}></div>
                      </div>
                      <div
                        className='ps__rail-y}}'
                        style={{ top: 0, right: 0 }}>
                        <div
                          className='ps__thumb-y'
                          tabindex='0'
                          style={{ top: 0, height: 0 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default withRouter(Navbar);
