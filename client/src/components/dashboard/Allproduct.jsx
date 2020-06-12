import React, { useState, useEffect } from "react";
import Layout from "./Layout";

import { isAuth } from "../../class/storage";
import { getAllProducts } from "../../class/getProducts";
import moment from "moment";
import ProductSearch from "./ProductSearch";
import ProductList from "./ProductList";
import Loader from "../../Loader";
import { Navbar } from "../Navbar";

export const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [finalProducts, setFinalProducts] = useState([]);

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

  const searchItem = (item1, item2) => {
    let result = products.filter(
      (d) =>
        d.createdAt >= moment(item1).format() &&
        d.createdAt <= moment(item2).format(),
    );
    setProducts(result);

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
        <ProductSearch
          searchItem={searchItem}
          searchByPhoneNumber={searchByPhoneNumber}
          searchProductByStatus={searchProductByStatus}
          refreshProducts={refreshProducts}
          searchProductByMarchent={searchProductByMarchent}
          searchProductByMan={searchProductByMan}
        />
        <div className='row'>
          <div className='col-12'>
            <ProductList products={products} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Allproduct;
