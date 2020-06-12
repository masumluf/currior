import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/Home";
import Test from "./components/dashboard/Test";
import AddCompany from "./components/dashboard/AddCompany";
import Addmarchent from "./components/dashboard/Addmarchent";
import Marchentlist from "./components/dashboard/Marchentlist";
import Manlist from "./components/dashboard/Manlist";
import Adddeliveryman from "./components/dashboard/Adddeliveryman";
import Addproduct from "./components/dashboard/Addproduct";
import Allproduct from "./components/dashboard/Allproduct";
import Modal from "./components/dashboard/Modal";
import Productdetails from "./components/dashboard/Productdetails";
import Payment from "./components/dashboard/Payment";
import Report from "./components/dashboard/Report";
import ManReport from "./components/dashboard/ManReport";
import Password from "./components/dashboard/Password";
import Picture from "./components/dashboard/Picture";
import Setting from "./components/dashboard/Setting";
import Marchent from "./components/dashboard/Marchent";
import Man from "./components/dashboard/Man";
import AdminLogin from "./components/AdminLogin";
import MarchentLogin from "./components/MarchentLogin";
import DeliverymanLogin from "./components/DeliverymanLogin";
import Layout from "./components/dashboard/Layout";

function RouteLayout() {
  return (
    <>
      <Route path='/' exact component={Home} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/test' component={Test} />
      <Route path='/addmarchent' component={Addmarchent} />
      <Route path='/marchentlist' component={Marchentlist} />
      <Route path='/addcompany' component={AddCompany} />
      <Route path='/adddeliveryman' component={Adddeliveryman} />
      <Route path='/manlist' component={Manlist} />
      <Route path='/adminlogin' component={AdminLogin} />
      <Route path='/marchentlogin' component={MarchentLogin} />
      <Route path='/manlogin' component={DeliverymanLogin} />
      <Route path='/allproduct' component={Allproduct} />
      <Route path='/productdetails/:id' component={Productdetails} />
      <Route path='/payment' component={Payment} />
      <Route path='/modal' component={Modal} />
      <Route path='/marchent/:id' component={Marchent} />
      <Route path='/man/:id' component={Man} />
      <Route path='/addproduct' component={Addproduct} />
      <Route path='/report' component={Report} />
      <Route path='/manreport' component={ManReport} />
      <Route path='/setting' component={Setting} />
      <Route path='/password' component={Password} />
      <Route path='/picture' component={Picture} />
    </>
  );
}

export default RouteLayout;
