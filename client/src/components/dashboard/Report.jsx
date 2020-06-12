import React, { useState, useEffect } from "react";
import Layout from "./Layout";

import { isAuth } from "../../class/storage";
import { getAllProducts } from "../../class/getProducts";
import moment from "moment";
import ReportSearch from "./ReportSearch";
import ReportList from "./ReportList";
import Loader from "../../Loader";
import { Navbar } from "../Navbar";

export const Report = () => {
  const [products, setProducts] = useState([]);
  const [mainProducts, setMainProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setLoader(true);
    (async () => {
      const results = await getAllProducts(
        isAuth()._id,
        isAuth().role,
        isAuth().company_id,
      );
      setProducts(results);
      setLoader(false);
    })();
  }, [phoneNumber]);

  const searchByPhoneNumber = (number) => {
    if (number.toString().length === 0) {
      setPhoneNumber(Date.now());
      //console.log(phoneNumber);
    }
    const results = products.filter((d) => d.receiverPhone.includes(number));
    setProducts(results);
  };

  const searchItem = (item1, item2, item3) => {
    let result = products.filter(
      (d) =>
        d.createdAt >= moment(item1).format() &&
        d.createdAt <= moment(item2).format() &&
        d.marchent._id === item3.toString(),
    );
    setMainProducts(result);
    //setProducts(result);
    console.log(item3.toString());

    console.log(result);

    //console.log(moment(item1).format(), moment(item2).format());
  };

  const searchProductByStatus = (status) => {
    const results = products.filter((d) => d.productStatus.includes(status));
    setProducts(results);
  };

  const searchProductByMarchent = (id) => {
    //console.log(id.toString());

    const results = products.filter((d) => d.marchent._id === id);
    setProducts(results);
  };

  const searchProductByMan = (id) => {
    const results = products.filter((d) => d.deliveryman._id === id);
    setProducts(results);
  };

  const refreshProducts = () => {
    setLoader(true);
    setPhoneNumber(Date.now());
  };

  return (
    <>
      <Navbar />
      <Layout />
      <main>
        <ReportSearch
          searchItem={searchItem}
          refreshProducts={refreshProducts}
        />
        <div className='row'>
          <div className='col-12'>
            {mainProducts.length > 0 && (
              <ReportList mainProducts={mainProducts} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Report;
