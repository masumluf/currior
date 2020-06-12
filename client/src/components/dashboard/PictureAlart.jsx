import React from "react";
import $ from "jquery";

const Alert = () => {
  return (
    <>
      <div
        className='modal fade bd-example-modal-lg'
        tabindex='-1'
        id='alertmodal'
        role='dialog'
        style={{ display: "none" }}
        aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                Are You Sure Want to Delete this Item?
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <div id='cropped-image'></div>
              <button
                type='button'
                id='cancel-cropping'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                id='upload-image'>
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
