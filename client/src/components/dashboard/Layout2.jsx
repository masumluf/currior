import React from "react";

import { Link } from "react-router-dom";

const Layout2 = () => {
  return (
    <>
      <Link to='/addmarchent'>
        <i className='simple-icon-chart'></i> Add Marchent
      </Link>
      <Link to='/marchentlist'>
        <i className='simple-icon-chart'></i> Marchent List
      </Link>
    </>
  );
};

export default Layout2;
