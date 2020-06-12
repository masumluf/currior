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
              <div className='user d-inline-block'>
                <button
                  className='btn btn-empty p-0'
                  type='button'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <span className='name'>
                    {isAuth().name}
                    {process.env.IMAGE_URL}
                  </span>
                  <span>
                    <img alt='Profile Picture' src='img/profile-pic-l.jpg' />
                  </span>
                </button>

                <div className='dropdown-menu dropdown-menu-right mt-3'>
                  <Link className='dropdown-item' to='/setting'>
                    Setting
                  </Link>

                  <Link
                    className='dropdown-item'
                    to='/'
                    onClick={() => {
                      signout(() => {
                        history.push("/");
                      });
                    }}>
                    {" "}
                    Signout
                  </Link>
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
