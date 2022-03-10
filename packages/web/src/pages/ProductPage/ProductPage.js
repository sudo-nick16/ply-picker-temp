import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import product_card from "./productdata";
import ReactPaginate from "react-paginate";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { API_URL } from "../../constants";
import capitalizeFirstLetter from "../../helperFunctions/capitalizeFirstLetter";
import lengthyText from "../../helperFunctions/lengthyText";

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
  let SUBGROUP_SEARCH_PARAM;

  let params = {};

  const getSubGroupData = async (subGroupID) =>{
    const subGroupData = await (await axios.get(`${API_URL}/subgroups/${subGroupID}`)).data
    document.title = `Buy ${capitalizeFirstLetter(subGroupData.SubGroup_name)} at Best Price in India`
  }

  const getGroupData = async (groupID) =>{
    const groupData = await (await axios.get(`${API_URL}/groups/${groupID}`)).data
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

  if (searchParams.get("subgroup")){
    SUBGROUP_SEARCH_PARAM = searchParams.get("subgroup");
    params.subgroup = SUBGROUP_SEARCH_PARAM;
    getSubGroupData(SUBGROUP_SEARCH_PARAM)
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
    productData.map((item) => (maxi = Math.max(maxi, item.actual_price)));
    setMaxPrice(maxi);
    return maxi;
  };

  const getMin = (productData) => {
    let mini = Number.MAX_SAFE_INTEGER;
    productData.map((item) => (mini = Math.min(mini, item.actual_price)));
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

    setPageNumber(0)

    if (!isChecked) {
      setActiveSortingStatus("");
      return setItems(products);
    }

    let arr = [...productsArray];
    if (order === 1) {
      arr.sort((a, b) => a.actual_price - b.actual_price);
      setActiveSortingStatus("asc");
    }
    if (order === -1) {
      arr.sort((a, b) => b.actual_price - a.actual_price);
      setActiveSortingStatus("des");
    }
    setItems(arr);
  };

  // PAGINATION
  const [pageNumber, setPageNumber] = useState(0);

  // itemsperpage
  const PRODUCTS_PER_PAGE = 9;

  // itemsvisited
  const pagesVisited = pageNumber * PRODUCTS_PER_PAGE;

  console.log(items.length)
  // Deciding number of pages
  var pageCount = Math.ceil(items.length / PRODUCTS_PER_PAGE);

  // Changing page function
  const changePage = ({selected}) => {
    setPageNumber(selected);
  };

  // Maximum description length
  const MAX_DESCR_LENGTH = 50;

  // passing product data via props
  const listItems = items
    .filter(
      (item) =>
        item.actual_price >= Math.min(...value) &&
        item.actual_price <= Math.max(...value)
    )
    .slice(pagesVisited, pagesVisited + PRODUCTS_PER_PAGE)
    .map((item) => (
      <div className="productpage_card" key={item._id}>
        <Link
          to={`/productdetails/${item._id}`}
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="productpage_card_img">
            <img src={item.attributes.image[0]} alt={item.name} />
          </div>
          <div className="productpage_product_info">
            <h2 className="productpage_product_heading">{item.name}</h2>
            <h3 className="productpage_product_code">{item.product_code}</h3>
            <p className="productpage_product_description">
              {/* Renders description only if description field exists */}
              {item.description
                ? // Keeps the description limited to MAX_DESCR_LENGTH
                lengthyText(item.description, MAX_DESCR_LENGTH)
                : null}
            </p>
            <p className="productpage_product_price">
              <span>₹</span>
              {item.actual_price}
            </p>
          </div>
        </Link>
      </div>
    ));

  // update page count
  pageCount = Math.ceil(
    items.filter(
      (item) =>
        item.actual_price >= Math.min(...value) &&
        item.actual_price <= Math.max(...value)
    ).length / PRODUCTS_PER_PAGE
  );

  var paginationBar = <div></div>;
  if (pageCount > 0) {
    paginationBar = (
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        forcePage={pageNumber}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    );
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
