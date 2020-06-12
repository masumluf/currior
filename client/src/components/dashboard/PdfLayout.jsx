import React from "react";
import JsBarcode from "jsbarcode";
import Canvas from "canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const PdfLayout = ({
  description,
  receiverAddress,
  receiverName,
  amount,
}) => {
  const handleModal = () => {
    const doc = new jsPDF();

    // const canvas = new Canvas();
    const svg = JsBarcode(".barcode").init();

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    doc.autoTable({ html: "#my-table" });

    doc.addSvg(svg, 50, 100, 100, 100);

    // Or use javascript directly:

    doc.autoTable({
      body: [
        [{ description }, { receiverAddress }, { receiverName }, { amount }],
      ],
    });

    doc.save("table.pdf");
  };

  return (
    <>
      <h1>Modal</h1>

      <main>
        <svg
          class='barcode'
          jsbarcode-format='upc'
          jsbarcode-value='123456789012'
          jsbarcode-textmargin='0'
          jsbarcode-fontoptions='bold'></svg>

        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => handleModal()}>
          download
        </button>
      </main>
    </>
  );
};

export default PdfLayout;
