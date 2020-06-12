import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { isAuth, getCookie } from "../../class/storage";
import PictureAlart from "./PictureAlart";
import $ from "jquery";

import "./croppie.css";
import { Navbar } from "../Navbar";

export const Setting = () => {
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});
  const [file, setFile] = useState({});

  const onChange = (e) => {
    if (!checkMimeType(e)) {
      return setError("Please select only Image. JPG/PNG/GIF");
    } else if (!checkFileSize(e)) {
      return setError("File size must be below 2M");
    } else {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const checkFileSize = (event) => {
    let files = event.target.files;
    let size = 1000000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        //err += files[x].type + "is too large, please pick a smaller file\n";
        return false;
      }
    }
    if (err !== "") {
      event.target.value = null;
      console.log(err);
      return false;
    }

    return true;
  };

  const checkMimeType = (event) => {
    //getting file object
    let files = event.target.files;
    console.log(files);

    //define message container
    let err = "";
    // list allow mime type
    const types = ["image/png", "image/jpeg", "image/gif"];
    // loop access array
    for (let x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        err += files[x].type + " is not a supported format\n";
        return false;
      }
    }

    if (err !== "") {
      // if message not same old that mean has error
      event.target.value = null; // discard selected file
      console.log(err);
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      return error;
    }
    const formData = new FormData();
    formData.append("file", file);
    const token = getCookie("token");
    console.log(token);

    formData.append("token", token);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess("File Uploaded");
      setFile({});
    } catch (err) {
      setError("Failed to Upload");
    }
  };
  return (
    <>
      <Navbar />
      <Layout />

      <main>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <h1>Profile Pictuer </h1>
              <nav
                className='breadcrumb-container d-none d-sm-block d-lg-inline-block'
                aria-label='breadcrumb'>
                <ol className='breadcrumb pt-0'>
                  <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link href='/picture'>Change Picture</Link>
                  </li>
                  <li className='breadcrumb-item'>
                    <Link href='/password'>Change Password</Link>
                  </li>
                </ol>
              </nav>
              <div className='separator mb-5'></div>
            </div>
          </div>
          <div className='col-lg-12 col-xl-12'>
            {Object.keys(error).length !== 0 && (
              <div className='alert alert-danger ' role='alert'>
                {JSON.stringify(error)}
                <button
                  type='button'
                  className='close'
                  data-dismiss='alert'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
            )}
            {Object.keys(success).length !== 0 && (
              <div className='alert alert-success ' role='alert'>
                {JSON.stringify(success)}
                <button
                  type='button'
                  className='close'
                  data-dismiss='alert'
                  aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
            )}
            <div className='card auth-card'>
              <div className='form-side'>
                <h6 className='mb-4'>Upload Picture</h6>
                <form onSubmit={onSubmit}>
                  <div className='custom-file mb-4'>
                    <input
                      type='file'
                      className='file-input'
                      id='customFile'
                      onChange={onChange}
                    />
                  </div>
                  <input
                    type='submit'
                    value='Upload'
                    className='btn btn-primary btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <PictureAlart />
        <script src='/js/croppie.js'></script>
      </main>
    </>
  );
};

export default Setting;
