import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import SearchOverlay from "./SearchOverlay";
const MobileMenuSearch = () => {
  const [goSearchPage, setGoSearchPage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  return (
    <Fragment>
      <div className="offcanvas-mobile-menu__search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/product/search/search-product/?name=" + inputValue);
          }}
        >
          <input
            type="search"
            placeholder="Search here"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">
            <IoIosSearch />
          </button>
        </form>
      </div>
      <div className="input-search__mobile">
        <div className="search-result">
          <SearchOverlay
            inputValue={inputValue}
            activeStatus={inputValue.length ? true : false}
            goSearchPage={goSearchPage}
            isMobile={true}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default MobileMenuSearch;
