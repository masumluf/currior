import React, { useState, useEffect } from "react";
import Layout from "./Layout";

import { isAuth } from "../../class/storage";
import { getAllProducts } from "../../class/getProducts";
import moment from "moment";
import ManReportSearch from "./ManReportSearch";
import ManReportList from "./ManReportList";
import { Navbar } from "../Navbar";

export const ManReport = () => {
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

  const searchItem = (item1, item2, item3) => {
    let result = products.filter(
      (d) =>
        d.createdAt >= moment(item1).format() &&
        d.createdAt <= moment(item2).format() &&
        d.deliveryman._id === item3.toString(),
    );
    setMainProducts(result);
    //setProducts(result);
    console.log(item3.toString());

    console.log(result);

    //console.log(moment(item1).format(), moment(item2).format());
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
        <ManReportSearch
          searchItem={searchItem}
          refreshProducts={refreshProducts}
        />
        <div className='row'>
          <div className='col-12'>
            {mainProducts.length > 0 && (
              <ManReportList mainProducts={mainProducts} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ManReport;
