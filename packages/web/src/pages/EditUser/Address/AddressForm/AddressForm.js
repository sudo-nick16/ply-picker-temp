import React, { useState } from "react";
import "./AddressForm.css";
import { AiOutlineCloseSquare } from "react-icons/ai";
import useAxios from "../../../../utils/useAxios";
import { useStore } from "../../../../store/store";
import { addAddress } from "../../../../store/reducers/userActions";

function AddressForm(props) {
  const api = useAxios();
  const [_, dispatch] = useStore();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("India");

  const addAddressHandler = async (e) => {
    console.log(e);
    e.preventDefault();
    if(!name || !address || !city || !state || !pincode || !mobile){
      console.log('empty', name, address, city, state, pincode, mobile);
      return
    }
    const Address = {
      name,
      address,
      landmark,
      mobile,
      city,
      state,
      pincode,
      country,
    };
    const res = await api.post("/me/addresses", {
      address: Address,
    });
    console.log(res);
    if (!res.data.error) {
      alert("Address added successfully");
      dispatch(addAddress(Address))
    } else {
      alert(res.data.error);
    }
    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="addressform_popupMain">
      <div className="addressform_form">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <AiOutlineCloseSquare />
        </button>
        <form>
          <div className="row">
            <div className="col-md-6">
              <label for="inputAddress">Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="phoneNo">Mobile</label>
              <input
                type="tel"
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                id="phoneNo"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label for="inputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label for="inputAddress2">Landmark (Optional)</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Near Water Tank.."
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
                id="inputCity"
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label for="inputState">State</label>
              <select id="inputState" onClick={(e) => setState(e.target.value)} className="form-control" required>
                <option selected>Choose...</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadar and Nagar Haveli">
                  Dadar and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label for="inputZip">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="form-control"
                id="inputZip"
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label for="inputState">Country</label>
              <select id="inputState" onChange={(e) => setCountry(e.target.value)} className="form-control">
                <option>India</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="address_form_btn"
            onClick={addAddressHandler}
          >
            Add
          </button>
        </form>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddressForm;
