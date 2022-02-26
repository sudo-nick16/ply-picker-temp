import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import product_card from "./productdata";
import ReactPaginate from "react-paginate";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { API_URL } from "../../constants";
import capitalizeFirstLetter from "../heplerFunctions/capitalizeFirstLetter";

function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getData();
  }, [searchParams]);

  const [queryS, setQueryS] = useState("");

  let NAME_SEARCH_PARAM;
  let CATEGORY_SEARCH_PARAM;
  let SUBCATEGORY_SEARCH_PARAM;
  let GROUP_SEARCH_PARAM;

  let params = {};

  const getGroupData = async (groupID) =>{
    const groupData = await (await axios.get(`${API_URL}/groups/${groupID}`)).data
    // console.log(groupData.Group_name)
    document.title = `Buy ${capitalizeFirstLetter(groupData.Group_name)} at Best Price in India`
  }

  const getSubcategoryData = async (subcategoryID) =>{
    const subcategoryData = await (await axios.get(`${API_URL}/subcategories/${subcategoryID}`)).data
    document.title = `Buy ${capitalizeFirstLetter(subcategoryData.Sub_Category_name)} at Best Price in India`
  }

  const getCategoryData = async (categoryID) =>{
    const categoryData = await (await axios.get(`${API_URL}/categories/${categoryID}`)).data
    document.title = `Buy ${capitalizeFirstLetter(categoryData.name)} at Best Price in India`
  }


  if (searchParams.get("name")) {
    NAME_SEARCH_PARAM = searchParams.get("name");
    params.name = NAME_SEARCH_PARAM;
  }

  if (searchParams.get("category")) {
    CATEGORY_SEARCH_PARAM = searchParams.get("category");
    params.category = CATEGORY_SEARCH_PARAM;
    getCategoryData(CATEGORY_SEARCH_PARAM)
  }
  if (searchParams.get("subcategory")) {
    SUBCATEGORY_SEARCH_PARAM = searchParams.get("subcategory");
    params.subcategory = SUBCATEGORY_SEARCH_PARAM;
    getSubcategoryData(SUBCATEGORY_SEARCH_PARAM)
  }
  if (searchParams.get("group")) {
    GROUP_SEARCH_PARAM = searchParams.get("group");
    params.group = GROUP_SEARCH_PARAM;
    getGroupData(GROUP_SEARCH_PARAM)
  }

  var esc = encodeURIComponent;
  let query = Object.keys(params)
    .map((k) => esc(k) + "=" + esc(params[k]))
    .join("&");

  const getData = async () => {
    const productData = await (
      await axios.get(`${API_URL}/products?${query}`)
    ).data;
    setItems(productData);
    setProducts(productData);
    let maxi = getMax(productData);
    let mini = getMin(productData);
    setValue([mini, maxi]);
  };

  const getMax = (productData) => {
    let maxi = 0;
    productData.map((item) => (maxi = Math.max(maxi, item.Product_Price)));
    setMaxPrice(maxi);
    return maxi;
  };

  const getMin = (productData) => {
    let mini = Number.MAX_SAFE_INTEGER;
    productData.map((item) => (mini = Math.min(mini, item.Product_Price)));
    setMinPrice(mini);
    return mini;
  };

  // Double Slider
  const [value, setValue] = useState([0, 1000]);
  const changeValue = (event, value) => {
    setValue(value);
  };

  const getText = (value) => `${value}`;

  // //////////////////////////////////
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  // Stores the array of products and responsible for rendering
  const [items, setItems] = useState([]);
  // Stores a copy of array of products for immutability
  const [products, setProducts] = useState([]);
  const [activeSortingStatus, setActiveSortingStatus] = useState("");

  const sortHandler = (productsArray, order, isChecked) => {
    // order => -1 => descending
    // +1 => ascending

    if (!isChecked) {
      setActiveSortingStatus("");
      return setItems(products);
    }

    let arr = [...productsArray];
    if (order === 1) {
      arr.sort((a, b) => a.Product_Price - b.Product_Price);
      setActiveSortingStatus("asc");
    }
    if (order === -1) {
      arr.sort((a, b) => b.Product_Price - a.Product_Price);
      setActiveSortingStatus("des");
    }
    setItems(arr);
  };

  // PAGINATION
  const [pageNumber, setPageNumber] = useState(0);

  // itemsperpage
  const usersPerPage = 6;

  // itemsvisited
  const pagesVisited = pageNumber * usersPerPage;

  // Deciding number of pages
  var pageCount = Math.ceil(items.length / usersPerPage);

  // Changing page function
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Maximum description length
  const MAX_DESCR_LENGTH = 100;

  // passing product data via props
  const listItems = items
    .filter(
      (item) =>
        item.Product_Price >= Math.min(...value) &&
        item.Product_Price <= Math.max(...value)
    )
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => (
      <div className="productpage_card" key={item._id}>
        <Link
          to={`/productdetails/${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="productpage_card_img">
            <img src={item.Product_Image} alt={item.Product_Name} />
          </div>
          <div className="productpage_product_info">
            <h2 className="productpage_product_heading">{item.Product_Name}</h2>
            <h3 className="productpage_product_code">{item.product_code}</h3>
            <p className="productpage_product_description">
              {/* Renders description only if description field exists */}
              {item.Product_Description
                ? // Keeps the description limited to MAX_DESCR_LENGTH
                  `${item.Product_Description}`.length > MAX_DESCR_LENGTH
                  ? `${item.Product_Description}`.substring(
                      0,
                      MAX_DESCR_LENGTH
                    ) + "..."
                  : `${item.Product_Description}`
                : null}
            </p>
            <p className="productpage_product_price">
              <span>{item.product_currency}</span>
              {item.Product_Price}
            </p>
          </div>
        </Link>
      </div>
    ));

  // update page count
  pageCount = Math.ceil(
    items.filter(
      (item) =>
        item.Product_Price >= Math.min(...value) &&
        item.Product_Price <= Math.max(...value)
    ).length / usersPerPage
  );

  var paginationBar = <div></div>;
  if (pageCount > 0) {
    paginationBar = (
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    );
  } else {
    paginationBar = <div></div>;
  }

  return (
    <>
      <div className="container">
        <div className="productpage_main_container">
          <div className="productpage_leftside">
            <div className="productpage_leftside_heading">FILTERS</div>
            <div className="productpage_filters">
              {/* Checkbox Filter */}
              <div className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse " id="navbarNav">
                    <ul className="nav flex-column">
                      Sort By
                      <li className="nav-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="sortAsc"
                            checked={
                              activeSortingStatus == "asc" ? true : false
                            }
                            onChange={(event) =>
                              sortHandler(items, 1, event.target.checked)
                            }
                          />
                          <label className="form-check-label" htmlFor="sortAsc">
                            Lowest Priced First
                          </label>
                        </div>
                      </li>
                      <li className="nav-item">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="sortDesc"
                            checked={
                              activeSortingStatus == "des" ? true : false
                            }
                            onChange={(event) =>
                              sortHandler(items, -1, event.target.checked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="sortDesc"
                          >
                            Highest Priced First
                          </label>
                        </div>
                      </li>
                      <li className="nav-item">
                        {/* Slider Filter */}

                        <Slider
                          style={{ marginTop: 20, width: 150 }}
                          value={value}
                          onChange={changeValue}
                          min={minPrice}
                          max={maxPrice}
                          step={
                            Math.round((maxPrice - minPrice) / 10 / 10) * 10 ===
                            0
                              ? 1
                              : Math.round((maxPrice - minPrice) / 10 / 10) * 10
                          }
                          marks
                          defaultValue={1000}
                          getAriaValueText={getText}
                          valueLabelDisplay="auto"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>₹{Math.min(...value)}</div>
                          <div>₹{Math.max(...value)}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="productpage_rightside">
            {listItems}
            {paginationBar}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
