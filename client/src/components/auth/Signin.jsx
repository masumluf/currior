import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../../class/storage";

toast.configure();

const Signup = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Sign In",
  });
  const [error, setError] = useState({});
  const { email, password, buttonText } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "requesting.." });
    // axios({
    //     method:'POST',
    //     url:`http://localhost:8000/api/signup`,
    //     data:{name,email,password,repassword}
    // })
    //     .then(res=>{
    //         console.log(res)
    //         toast.success("Success")
    //         setValues({...values,buttonText: "Submit"})
    //     })
    //     .catch(error=>{
    //         console.log(error);
    //         toast.error("Failed")
    //         setValues({...values,buttonText: "Submit"})
    //     })
    try {
      let result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/login`,
        data: { email, password },
      });
      if (result) {
        console.log(result);
        authenticate(result, () => {
          toast.success(result.data.message);
          setValues({ ...values, buttonText: "Submit" });
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/profile");
        });
      }
    } catch (e) {
      toast.error(e.response.data.error);
      setError(e.response.data.error);
      setValues({ ...values, buttonText: "Submit" });
    }
  };

  const signInForm = () => (
    <div className="container">
      <div className="row h-100">
        <div className="col-12 col-md-10 mx-auto my-auto">
          <div className="card auth-card">
            <div className="position-relative image-side ">
              <p className=" text-white h2">MAGIC IS IN THE DETAILS</p>

              <p className="white mb-0">
                Please use your credentials to login. If you are not a member,
                please
                <a href="#" className="white">
                  register
                </a>
                .
              </p>
            </div>
            <div className="form-side">
              <a href="Dashboard.Default.html">
                <span className="logo-single"></span>
              </a>
              <h6 className="mb-4">Login</h6>
              <form>
                <label className="form-group has-float-label mb-4">
                  <input className="form-control" />
                  <span>E-mail</span>
                </label>

                <label className="form-group has-float-label mb-4">
                  <input
                    className="form-control"
                    type="password"
                    placeholder=""
                  />
                  <span>Password</span>
                </label>
                <div className="d-flex justify-content-between align-items-center">
                  <a href="#">Forget password?</a>
                  <button
                    className="btn btn-primary btn-lg btn-shadow"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <ToastContainer />
      {isAuth() ? <Redirect to="/" /> : ""}
      <h1>Signin Page</h1>
      {signInForm()}

      <Link to="/forgetpassword">Forget Password ?</Link>
    </Layout>
  );
};

export default Signup;
