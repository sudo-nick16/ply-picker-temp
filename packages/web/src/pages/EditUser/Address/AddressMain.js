import React from "react";
import "./AddressMain.css";
import AddressForm from "./AddressForm/AddressForm";
import { useState } from "react";
import { useStore } from "../../../store/store";
import getPhone from "../../../utils/getPhone";

function AddressMain() {
  const [addressPopup, setAddressPopup] = useState(false);
  const [state, dispatch] = useStore();

  return (
    // <div className="editprofilepage_outercontainer addressMainpage_outercontainer">
    //   <div className="container editprofilepage_main addressMainpage">
    //     <div className="addressMain_leftside">
    //       <div className="editprofile_info_container">
    //         <div className="editprofile_info_heading">My Address Book</div>
    //         <div className="editprofile_info_description">
    //           Add, Edit Addresses
    //         </div>
    //       </div>
    //     </div>
    <div className="addressMain_rightside">
      <div className="addressMain_addressContainer">
        <button onClick={() => setAddressPopup(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "24px",
              height: "24px",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <AddressForm trigger={addressPopup} setTrigger={setAddressPopup} />
      </div>
      {state.user.addresses.map((item, index) => {
        return (
          <div key={index} className="addressMain_addressContainer addressMain_filledaddress">
            <div className="addressfilled_name">{item.name} - {getPhone(item.mobile)}</div>
            <div className="addressfilled_address">
              {item.address}
               <br />
              {item.landmark}
              <br />
              {item.city}
            </div>
            <div className="addressfilled_state">{item.state}</div>
            <div className="addressfilled_pincode">{item.pincode}</div>
          </div>
        );
      })}
    </div>
    //   </div>
    // </div>
  );
}

export default AddressMain;
