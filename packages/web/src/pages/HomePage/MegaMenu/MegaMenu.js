import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import capitalizeFirstLetter from "../../../helperFunctions/capitalizeFirstLetter"
import SearchComponent from "../Search/SearchComponent";
import "./MegaMenu.css";
import "../Wishlist/Wishlist.css";
import { FaRegHeart } from "react-icons/fa";
import Wishlist from "../Wishlist/Wishlist";
import logo from "../../images/logo.png";
import { API_URL } from "../../../constants";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Triangle from "../../../components/Triangle/Triangle";

const MegaMenu = () => {
  let isMobileOrTablet = useMediaQuery({
    query: "(max-width:768px)",
  });
  const navigate = useNavigate();
  // Performs all network requests for categories, subcategories and grops
  useEffect(() => {
    getCategories();
    getSubCategories();
    getGroups();
    getSubGroups();
  }, []);

  useEffect(() => {
    console.log("renders");
  }, []);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [subGroups, setSubGroups] = useState([])
  const [brands, setBrands] = useState([]);

  const [navbarWishlist, setNavbarWishlist] = useState(false);

  // Controls the visibility of the categories menu
  // By default, the menu is not shown
  const [showNavItem, setShowNavItem] = useState(false);

  // States to manage selected category. Initialized with the first category
  const [activeCategory, setActiveCategory] = useState(
    Object(categories[0])._id
  );

  // Gets the categories
  const getCategories = async () => {
    try {
      const categoriesData = await (
        await axios.get(`${API_URL}/categories`)
      ).data;
      setCategories(categoriesData);
    } catch (err) {
      console.error(err);
    }
  };

  // Gets the sub-categories
  const getSubCategories = async () => {
    try {
      const subCategoriesData = await (
        await axios.get(`${API_URL}/subcategories`)
      ).data;
      setSubCategories(subCategoriesData);
    } catch (err) {
      console.error(err);
    }
  };

  // Gets the groups
  const getGroups = async () => {
    try {
      const groupsData = await (await axios.get(`${API_URL}/groups`)).data;
      setGroups(groupsData);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubGroups = async () => {
    try {
      const subGroupData = await (await axios.get(`${API_URL}/subgroups`)).data
      setSubGroups(subGroupData)
    }
    catch (err) {
      console.error(err)
    }
  }

  // takes category id and search for all the products in that category and maintain an array of unique brands from them.
  useEffect(() => {
    getBrands();
  }, [activeCategory]);

  const getBrands = async () => {
    try {
      if (!activeCategory) return
      const brandsData = await (
        await axios.get(`${API_URL}/products?category=${activeCategory}`)
      ).data;
      let arr = [];
      brandsData.map((product) =>
        arr.push(capitalizeFirstLetter(product.brand))
      );
      arr = [...new Set(arr)];
      setBrands(arr);
    } catch (err) {
      console.error(err);
    }
  };

  // When clicked outside of the mini menu, it hides the menu
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowNavItem(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const NavItem = (props) => {
    const [isShowed, setIsShowed] = useState(false);

    const mouseOverAction = () => {
      setShowNavItem(true);
      setIsShowed(true);
      setActiveCategory(props.id);
    };

    return (
      <>
        <div
          className="navBarItem"
          style={{
            borderBottomWidth: isShowed ? 2 : 0,
            fontWeight: isShowed ? "bold" : "inherit",
          }}
          onMouseOver={mouseOverAction}
        >
          {capitalizeFirstLetter(props.title)}
        </div>
      </>
    );
  };

  const MiniMenu = (props) => {
    // Creates an array of objects of subcategories which are the part of the selected category
    let subCatData = subCategories.filter(
      (subCat) => subCat.Category === activeCategory
    );

    // States to manage selected sub category. Initialised with the first sub category
    const [activeSubCat, setActiveSubCat] = useState(
      Object(subCategories[0])._id
    );
    const [activeGroup, setActiveGroup] = useState(Object(groups[0])._id);

    const SubCategoryMenu = () => {
      return (
        <div className="subCategoryContainer">
          {subCatData.map((subCat) => (
            <Link
              className="link"
              key={subCat._id}
              to={`/products?subcategory=${activeSubCat}`}
              onClick={() => setShowNavItem(false)}
            >
              <div
                key={subCat._id}
                className="subCategoryItem"
                onMouseOver={() => setActiveSubCat(subCat._id)}
              >
                <div
                  style={{
                    fontWeight:
                      activeSubCat === subCat._id ? "bold" : "inherit",
                  }}
                >
                  {capitalizeFirstLetter(subCat.Sub_Category_name)}
                </div>
                {activeSubCat === subCat._id ? <Triangle color={'#F2F2F2'} /> : null}
              </div>
            </Link>
          ))}
        </div>
      );
    };

    const GroupMenu = () => {
      // Creates an array of objects of groups which are the part of the selected category as well as the selected sub category
      let groupData = groups.filter(
        (group) =>
          group.Category === activeCategory &&
          group.Sub_Category === activeSubCat
      );

      const GroupItem = (props) => {
        return (
          <Link
            key={props._id}
            className="link"
            to={`/products?group=${props._id}`}
            onClick={() => setShowNavItem(false)}
          >
            <div
              onMouseOver={() => {
                setActiveGroup(props._id)
              }}
              className="groupItem"
              key={props._id}
            >
              <div
                style={{
                  fontWeight: activeGroup == props._id ? "bold" : "inherit",
                  color: activeGroup == props._id ? "#F16512" : "inherit",
                }}>

                {capitalizeFirstLetter(props.Group_name)}
              </div>
              {activeGroup === props._id ? <Triangle color={'white'} /> : null}
            </div>
          </Link>
        );
      };

      return (
        <div className="groupContainer">
          {groupData.map((group) => (
            <GroupItem
              key={group._id}
              _id={group._id}
              Group_name={group.Group_name}
            />
          ))}
        </div>
      );
    };

    const SubGroupMenu = () => {
      let subGroupData = subGroups.filter(subGroup => subGroup.Category === activeCategory && subGroup.Sub_Category === activeSubCat && subGroup.Group === activeGroup)

      const SubGroupItem = ({ _id, SubGroup_name }) => {
        const [isSubGroupVisible, setIsSubGroupVisible] = useState(false)
        return (
          <Link to={`/products?subgroup=${_id}`} className='link' key={_id} onClick={() => setShowNavItem(false)}>
            <div onMouseOver={() => setIsSubGroupVisible(true)} onMouseLeave={() => setIsSubGroupVisible(false)} style={{ fontWeight: isSubGroupVisible ? "bold" : "inherit", color: isSubGroupVisible ? "#F16512" : "inherit" }} className='subGroupItem'>
              {capitalizeFirstLetter(SubGroup_name)}
            </div>
          </Link>
        )
      }
      return (
        <div className="subGroupContainer">
          {subGroupData.map(subGroup => <SubGroupItem _id={subGroup._id} SubGroup_name={subGroup.SubGroup_name} key={subGroup._id} />)}
        </div>
      )
    }

    const PopularBrandsMenu = () => {
      const BrandItem = ({ brand }) => {
        const [activeBrandItem, setActiveBrandItem] = useState(false);

        return (
          <div
            className="popularBrandItem"
            style={{
              width: isMobileOrTablet ? "100%" : "50%",
              color: activeBrandItem ? "#F16512" : "black",
            }}
            onMouseOver={() => setActiveBrandItem(true)}
            onMouseLeave={() => setActiveBrandItem(false)}
          >
            {brand}
          </div>
        );
      };
      return (
        <div
          className="popularBrandContainer"
          style={{ width: isMobileOrTablet ? "33%" : "inherit" }}
        >
          <div className="popularBrandHeading">Popular Brands</div>
          <div className="popularBrandList">
            {brands.map((brand) => (
              <BrandItem key={brand} brand={brand} />
            ))}
          </div>
        </div>
      );
    };

    return (
      <div
        className="miniMenu"
        style={{
          width: isMobileOrTablet ? "95%" : "70%",
          display: showNavItem ? "flex" : "none",
          background: 'white'
        }}
        ref={wrapperRef}
      >
        <SubCategoryMenu />
        <GroupMenu />
        <SubGroupMenu />
        <PopularBrandsMenu />
      </div>
    );
  };

  const NavBar = () => {
    function useOutsideAlerterWishlist(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            // alert("outside")
            console.log("outside");
            setNavbarWishlist(false);
          }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
    const wishlistWrapperRef = useRef(null);
    useOutsideAlerterWishlist(wishlistWrapperRef);

    const toggleNavbarWishlist = () => setNavbarWishlist(!navbarWishlist);

    useEffect(() => {
      const handleEscapeToClose = (e) => {
        if (e.key === "Escape") {
          setNavbarWishlist(false);
        }
      };
      document.addEventListener("keydown", handleEscapeToClose);

      return () => {
        document.removeEventListener("keydown", handleEscapeToClose);
      };
    }, [navbarWishlist]);

    return (
      <div className="navbar_main_container_outer">
        <>
          <div className="container navBarContainer">
            {categories.map((category) => (
              <Link
                key={category._id}
                className="link"
                to={`/products?category=${activeCategory}`}
              >
                <NavItem
                  key={category._id}
                  id={category._id}
                  image={category.category_image}
                  title={category.name}
                />
              </Link>
            ))}
          </div>
          <div className="navBarBorder"></div>
          <div className="container" style={{ padding: 0 }}>
            <MiniMenu title={activeCategory} />
          </div>
        </>
        <div ref={wishlistWrapperRef}>
          <div className="navbar_wishlist navbar_wishlist_close">
            <div
              className={
                navbarWishlist
                  ? "wishlist_container_open"
                  : "wishlist_container"
              }
            >
              <Wishlist onClose={() => setNavbarWishlist(false)} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div className="container navBarSearchContainer">
        <img
          src={logo}
          onClick={() => navigate("/")}
          style={{
            width: !isMobileOrTablet ? "15%" : "25%",
            marginRight: !isMobileOrTablet ? 20 : 10,
            marginTop: "5px",
            cursor: "pointer",
          }}
        />
        <SearchComponent />
        <FaRegHeart className="navBarButtons wishlistButton" size={22} onClick={() => setNavbarWishlist(true)} />
        <AiOutlineShoppingCart onClick={() => navigate('/cart')} className="navBarButtons" size={22} />
      </div>
      <NavBar />
    </div>
  );
};

export default MegaMenu;
