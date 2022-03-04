import React from "react";
import "./AddressMain.css";
import AddressForm from "./AddressForm/AddressForm";
import { useState } from "react";

function AddressMain() {
  const [addressPopup, setAddressPopup] = useState(false);

  return (
    <div className="editprofilepage_outercontainer addressMainpage_outercontainer">
      <div className="container editprofilepage_main addressMainpage">
        <div className="addressMain_leftside">
          <div className="editprofile_info_container">
            <div className="editprofile_info_heading">My Address Book</div>
            <div className="editprofile_info_description">
              Add, Edit Addresses
            </div>
          </div>
        </div>
        <div className="addressMain_rightside">
          <div className="addressMain_addressContainer">
            <button onClick={() => setAddressPopup(true)}>
              Add New Address
            </button>
            <AddressForm trigger={addressPopup} setTrigger={setAddressPopup} />
          </div>
          <div className="addressMain_addressContainer">
            <button>Add New Address</button>
          </div>
          <div className="addressMain_addressContainer">
            <button>Add New Address</button>
          </div>
          <div className="addressMain_addressContainer">
            <button>Add New Address</button>
          </div>
          <div className="addressMain_addressContainer addressMain_filledaddress">
            <div className="addressfilled_name">FirstName LastName</div>
            <div className="addressfilled_address">
              Address
              <br />
              address
            </div>
            <div className="addressfilled_state">STATE</div>
            <div className="addressfilled_pincode">PINCODE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressMain;
