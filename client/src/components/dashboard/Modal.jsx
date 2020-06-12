import React, { useState } from "react";
import Layout from "./Layout";

export const Modal = () => {
  const [id, setId] = useState("");
  // const handleModal = () => {
  //   const doc = new jsPDF();

  //   // It can parse html:
  //   // <table id="my-table"><!-- ... --></table>
  //   doc.autoTable({ html: "#my-table" });

  //   // Or use javascript directly:
  //   doc.autoTable({
  //     head: [["Name", "Email", "Country", "District", "phone", "Area"]],
  //     body: [
  //       [
  //         "David",
  //         "david@example.com",
  //         "Sweden",
  //         "Nokhali",
  //         "4353453454",
  //         "Dhaka",
  //       ],
  //       [
  //         "Castille",
  //         "castille@example.com",
  //         "Spain",
  //         "Nokhali",
  //         "4353453454",
  //         "Dhaka",
  //       ],
  //       // ...
  //     ],
  //   });

  //   doc.autoTable({
  //     body: [
  //       ["Sweden", "Japan", "Canada"],
  //       ["Norway", "China", "USA"],
  //       ["Denmark", "China", "Mexico"],
  //     ],
  //   });

  //   doc.save("table.pdf");
  // };

  return (
    <>
      <h1>Modal</h1>

      <Layout />
      <main>
        <button type='button' className='btn btn-outline-primary'>
          download
        </button>
      </main>
    </>
  );
};

export default Modal;
