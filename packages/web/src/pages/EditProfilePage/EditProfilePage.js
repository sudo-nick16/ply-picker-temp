import React from "react";
import "./EditProfilePage.css";

function EditProfilePage() {
  return (
    <div className="editprofilepage_outercontainer">
      <div className="container editprofilepage_main">
        <div className="editprofilepage_leftside">
          <div className="editprofile_info_container">
            <div className="editprofile_info_heading">My Profile</div>
            <div className="editprofile_info_description">
              Your Name, Phone No., Password
            </div>
          </div>
        </div>
        <div className="editprofilepage_rightside">
          <div className="editprofile_rightside_heading">
            Your Profile Information
          </div>
          <div className="edit_profile_info_form">
            <form
              id="maEditAddress"
              method="POST"
              action=""
              name="customer_profile"
            >
              <div className="info_form_row1">
                <div className="info_form_firstname">
                  <label>First Name</label>
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="info_form_lastname">
                  <label>Last Name</label>
                  <input type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className="info_form_row2">
                <div className="info_form_mobilenumber">
                  <label>Mobile No.</label>
                  <input type="text" placeholder="Mobile" />
                </div>
              </div>
              <div className="info_form_button_container">
                <div className="info_form_button">Save Changes</div>
              </div>
            </form>
          </div>
          <div className="edit_profile_rightside_bottom_heading">
            Change Your Password
          </div>
          <div className="edit_profile_password_form">
            <form
              id="maEditAddress"
              method="POST"
              action=""
              name="customer_profile"
            >
              <div className="info_form_row1">
                <div className="info_form_firstname">
                  <label>Old Password</label>
                  <input type="text" placeholder="Old Password" />
                </div>
              </div>
              <div className="info_form_row2">
                <div className="info_form_mobilenumber">
                  <label>New Password</label>
                  <input type="text" placeholder="New Password" />
                </div>
              </div>
              <div className="info_form_row3">
                <div className="info_form_mobilenumber">
                  <label>Confirm Password</label>
                  <input type="text" placeholder="Confirm Password" />
                </div>
              </div>
              <div className="info_form_button_container">
                <div className="info_form_button">Save Changes</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
