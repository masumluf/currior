import axios from "axios";
import { isAuth, getCookie } from "./storage";
var dotenv = require("dotenv");
var dotenvExpand = require("dotenv-expand");

var myEnv = dotenv.config();
dotenvExpand(myEnv);

// export const getMarchentList = async () => {
//   try {
//     let result = await axios({
//       method: "POST",
//       url: `${process.env.REACT_APP_API_URL}/getmarchentlists`,
//       data: {
//         company_id: isAuth().company_id,
//       },
//     });
//     return result.data.marchentList;
//   } catch (error) {
//     return false;
//   }
// };

export const inactiveAction = async (id, next) => {
  try {
    let result = await axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API_URL}/inactiveitem`,
      data: {
        id,
        token: getCookie("token"),
      },
    });
    next();
    return result.data.marchentList;
  } catch (error) {
    return false;
  }
};

export const deleteItem = async (id) => {
  try {
    let result = await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/deleteitem`,
      data: {
        id,
        token: getCookie("token"),
      },
    });
    return result.data.marchentList;
  } catch (error) {
    return false;
  }
};
