import axios from "axios";
import React, { useEffect, useState } from "react";
import "./SearchComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../../constants";
import { useMediaQuery } from "react-responsive";

const SearchComponent = () => {
  let isMobileOrTablet = useMediaQuery({
    query: "(max-width:768px)",
  });

  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [subGroups, setSubGroups] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubGroups = async () => {
      const subGroupData = await (await axios.get(`${API_URL}/subgroups`)).data
      setSubGroups(subGroupData)
      console.log(subGroupData)
    }
    loadSubGroups()
  }, []);

  const suggestionHandler = (value) => {
    setSearchValue(value);
    setSuggestions([]);
  };

  const onChangeHandler = (value) => {
    let matches = [];
    if (value.length > 0) {
      matches = subGroups.filter((subGroup) => {
        const regex = new RegExp(`${value}`, "gi");
        return subGroup.SubGroup_name.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchValue(value);
  };

  const SuggestItem = ({ suggestion }) => {
    const [activeSuggestion, setActiveSuggestion] = useState(false);
    return (
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/products/?subgroup=${suggestion._id}`}
        onClick={() => suggestionHandler(suggestion.SubGroup_name)}
      >
        <div
          className="searchbar_output"
          style={{
            cursor: "pointer",
            fontWeight: activeSuggestion ? "bold" : "inherit",
          }}
          onMouseOver={() => setActiveSuggestion(true)}
          onMouseLeave={() => setActiveSuggestion(false)}
        >
          {suggestion.SubGroup_name}
        </div>
      </Link>
    );
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <input
        className="searchbar_search"
        placeholder="What are you looking for?"
        type="text"
        onChange={(event) => onChangeHandler(event.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            navigate(`/products?name=${searchValue}`);
          }
        }}
        value={searchValue}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 500);
        }}
      />
      <div
        style={{
          position: "absolute",
          zIndex: 999999,
          backgroundColor: "white",
          width: isMobileOrTablet ? "68%" : "50%",
          boxShadow: "0px 5px 10px 0px rgba(0,0,0,0.39)",
        }}
      >
        {suggestions &&
          suggestions.map((suggestion) => (
            <SuggestItem suggestion={suggestion} key={suggestion._id} />
          ))}
      </div>
    </div>
  );
};

export default SearchComponent;
