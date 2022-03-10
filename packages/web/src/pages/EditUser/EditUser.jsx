import React, { useState } from "react";
import AddressMain from "./Address/AddressMain";
import EditProfilePage from "./EditProfilePage/EditProfilePage";

const EditUser = () => {
  const [section, setSection] = useState("profile");

  return (
    <div className="editprofilepage_outercontainer">
      <div className="container editprofilepage_main">
        <div className="editprofilepage_leftside">
          <div className={`editprofile_info_container ${section === "profile"? "active": ""}`} onClick={() => setSection("profile")} >
            <div className="editprofile_info_heading" >My Profile</div>
            <div className="editprofile_info_description">
              Your Name, Phone No., Password
            </div>
          </div>
          <div className={`editprofile_info_container ${section === "address"? "active": ""}`} onClick={() => setSection("address")} >
            <div className="editprofile_info_heading" >Address</div>
            <div className="editprofile_info_description">
              Add your addresses
            </div>
          </div>
        </div>
        {/* <div className="editprofilepage_rightside">
          <div className="editprofile_rightside_heading"> */}
            {
              section === "profile"? <EditProfilePage /> : (section === "address"? <AddressMain /> : null)
            }
          {/* </div>
        </div> */}
      </div>
    </div>
  );
};

export default EditUser;
