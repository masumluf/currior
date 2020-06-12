import React from "react";

import {
  BrowserRouter as Router,
  Link,
  withRouter,
  Route,
} from "react-router-dom";

const LayoutView = ({ match }) => {
  const LinkChecker = (path) => {
    // if (match.path === path) return true;
    // else return false;
  };
  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const openNavP = () => {
    document.getElementById("mySidenavPay").style.width = "250px";
  };

  const closeNavP = () => {
    document.getElementById("mySidenavPay").style.width = "0";
  };

  const openNavMarchent = () => {
    document.getElementById("mySidenavMarchent").style.width = "250px";
  };

  const closeNavMarchent = () => {
    document.getElementById("mySidenavMarchent").style.width = "0";
  };

  const openNavM = () => {
    document.getElementById("mySidenavM").style.width = "250px";
  };

  const closeNavM = () => {
    document.getElementById("mySidenavM").style.width = "0";
  };

  const openNavR = () => {
    document.getElementById("mySidenavReport").style.width = "250px";
  };

  const closeNavR = () => {
    document.getElementById("mySidenavReport").style.width = "0";
  };

  return (
    <>
      <div className='menu' style={{ opacity: 1 }}>
        <div className='main-menu default-transition'>
          <ul className='list-unstyled' id='myUL'>
            <li className={LinkChecker("/dashboard") ? "active" : ""}>
              <Link to='/dashboard'>
                <i className='iconsminds-shop-4'></i>
                <span>Dashboards</span>
              </Link>
            </li>

            <li>
              <Link href='' onClick={openNav}>
                <i className='iconsminds-box-close'></i> Product
              </Link>
              <div id='mySidenav' className='sidenav'>
                <Link href={void 0} className='closebtn' onClick={closeNav}>
                  x
                </Link>
                <Link to='/addproduct'>
                  <i className='simple-icon-plus'></i> Add Product
                </Link>
                <Link to='/allproduct'>
                  <i className='simple-icon-list'></i> View Product
                </Link>
              </div>
            </li>

            <li>
              <Link href='' onClick={openNavM}>
                <i className='iconsminds-air-balloon-1'></i> Delivery Man
              </Link>
              <div id='mySidenavM' className='sidenav'>
                <Link href={void 0} className='closebtn' onClick={closeNavM}>
                  x
                </Link>
                <Link to='/adddeliveryman'>
                  <i className='iconsminds-engineering'></i> Add Delivery Man
                </Link>
                <Link to='/manlist'>Delivery Man List</Link>
              </div>
            </li>
            <li>
              <Link href='' onClick={openNavP}>
                <i className='iconsminds-air-balloon-1'></i> Payment
              </Link>
              <div id='mySidenavPay' className='sidenav'>
                <Link href={void 0} className='closebtn' onClick={closeNavP}>
                  x
                </Link>
                <Link to='/payment'>
                  <i className='simple-icon-chart'></i> Payment List
                </Link>
              </div>
            </li>
            <li className={LinkChecker("/addcompany") ? "active" : ""}>
              <Link to='/addcompany'>
                <i className='iconsminds-administrator'></i> Add Company
              </Link>
            </li>

            <li className={LinkChecker("/addmarchent") ? "active" : ""}>
              <Link href='' onClick={openNavMarchent}>
                <i className='iconsminds-network'></i> Marchent
              </Link>
              <div id='mySidenavMarchent' className='sidenav'>
                <Link
                  href={void 0}
                  className='closebtn'
                  onClick={closeNavMarchent}>
                  x
                </Link>
                <Link to='/addmarchent'>
                  <i className='simple-icon-chart'></i> Add Marchent
                </Link>
                <Link to='/marchentlist'>
                  <i className='simple-icon-chart'></i> Marchent List
                </Link>
              </div>
            </li>

            <li>
              <Link href='' onClick={openNavR}>
                <i className='iconsminds-line-chart-1'></i> Report
              </Link>
              <div id='mySidenavReport' className='sidenav'>
                <a href={void 0} className='closebtn' onClick={closeNavR}>
                  close
                </a>
                <Link to='/report'>
                  <i className='simple-icon-chart'></i> Marchent Report
                </Link>
                <Link to='#'>
                  {" "}
                  <i className='simple-icon-chart'></i> Delivery Man Report
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
const Layout = () => {
  return (
    <>
      <LayoutView />
    </>
  );
};

export default withRouter(Layout);
