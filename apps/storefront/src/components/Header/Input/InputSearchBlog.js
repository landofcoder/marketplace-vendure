import React, { Fragment, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/router";

const InputSearchBlog = () => {
    const [searchValue, setSearchValue] = useState("");
    const [goSearchPage, setGoSearchPage] = useState(false);
    const router = useRouter();
    if (goSearchPage)
        router.push("/blog/search/" + searchValue);
    return (
        <div className="input-search">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setGoSearchPage(true);
                }}
                action=""
                className="search-bar"
            >
                <input
                    placeholder="Search post..."
                    className="js-search"
                    type="text"
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </form>
            <button
                onClick={(e) => {
                    setGoSearchPage(true);
                }}
            >
                <IoIosSearch />
            </button>
        </div>
    );
};
export default InputSearchBlog;
