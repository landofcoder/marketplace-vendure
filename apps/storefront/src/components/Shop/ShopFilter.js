import { Fragment } from "react";
import { IoIosClose } from "react-icons/io";
import {
  selectCategoriesFilter,
  filterFacetSelectedByID,
  colorDefined,
} from "../../lib/product";

const ShopFilter = ({ facets, queryVariables, setQueryVariables }) => {
  const considerActionFilter = (currentFacet, activating) => {
    let newQuery = queryVariables;
    if (!activating) {
      // add
      newQuery.facetValueIds = [
        ...newQuery.facetValueIds,
        currentFacet.facetValue.id,
      ];
      setQueryVariables(newQuery);
    } else {
      // remove
      newQuery.facetValueIds = queryVariables.facetValueIds.filter(
        (item) => item != currentFacet.facetValue.id
      );
      setQueryVariables(newQuery);
    }
  };
  const filterOption = (item) => {
    switch (item.code) {
      case "color":
        return (
          <div className="product-content__color__content ml-2">
            <div className="row">
              <div className="col-xl-6 col-md-8 row">
                {item.facetValues.map((detailFacetValue, i) => {
                  return (
                    <div className="col-2" key={i}>
                      <input
                        type="radio"
                        value={detailFacetValue.facetValue.code}
                        name={detailFacetValue.facetValue.code + "-head"}
                        checked={
                          selectCategoriesFilter(
                            detailFacetValue.facetValue,
                            queryVariables.facetValueIds
                          )
                            ? "checked"
                            : ""
                        }
                        id={detailFacetValue.facetValue.id}
                        onChange={(e) => {
                          considerActionFilter(
                            detailFacetValue,
                            !!selectCategoriesFilter(
                              detailFacetValue.facetValue,
                              queryVariables.facetValueIds
                            )
                          );
                          // we must to select item before anything else cause i checked first
                        }}
                      />
                      <label
                        htmlFor={detailFacetValue.facetValue.id}
                        style={{
                          backgroundColor: colorDefined(
                            detailFacetValue.facetValue.code
                          ),
                        }}
                      ></label>
                    </div>
                  );
                })}
              </div>
              <div className="col-xl-6 col-md-4"></div>
            </div>
          </div>
        );
      default:
        return (
          <Fragment>
            {item.facetValues.map((detailFacetValue, i) => {
              return (
                <div className="single-method mb-2 ml-2" key={i}>
                  <input
                    type="radio"
                    value={detailFacetValue.facetValue.code}
                    name={detailFacetValue.facetValue.code + "-head"}
                    checked={
                      selectCategoriesFilter(
                        detailFacetValue.facetValue,
                        queryVariables.facetValueIds
                      )
                        ? "checked"
                        : ""
                    }
                    id={detailFacetValue.facetValue.id}
                    onChange={(e) => {
                      considerActionFilter(
                        detailFacetValue,
                        !!selectCategoriesFilter(
                          detailFacetValue.facetValue,
                          queryVariables.facetValueIds
                        )
                      );
                      // we must to select item before anything else cause i checked first
                    }}
                  />
                  <label
                    htmlFor={detailFacetValue.facetValue.id}
                    style={{ textTransform: "capitalize", cursor: "pointer" }}
                  >
                    {detailFacetValue.facetValue.code}
                  </label>
                </div>
              );
            })}
          </Fragment>
        );
    }
  };

  return (
    <div className="shop-advance-filter">
      <div className="container space-pt--50 space-pb--50">
        {/* filter test */}
        <div className="row">
          <div className="col-sm single-sidebar-widget space-mb--40">
            <h2
              style={{ textTransform: "capitalize" }}
              className="single-sidebar-widget__title space-mb--30"
            >
              Filters
            </h2>
            {queryVariables.facetValueIds.length > 0
              ? filterFacetSelectedByID(facets, queryVariables.facetValueIds).map(
                  (item,index) => {
                    let facetValue = { facetValue: item };
                    return (
                      <span
                        key={index}
                        className="badge badge-danger pl-2 pr-2 mr-1 mt-2"
                        style={{ fontWeight: "500", cursor: "pointer" }}
                        onClick={() => {
                          considerActionFilter(facetValue, true);
                        }}
                      >
                        {item.code} <IoIosClose />
                      </span>
                    );
                  }
                )
              : "No filter applied"}
          </div>
          {facets?.map((item, index) => {
            return (
              <div key={index} className="col-sm single-sidebar-widget space-mb--40">
                <h2
                  style={{ textTransform: "capitalize" }}
                  className="single-sidebar-widget__title space-mb--30"
                >
                  {item.code}
                </h2>
                {item.facetValues.length > 0 ? (
                  <ul className="single-sidebar-widget__list single-sidebar-widget__list--category">
                    {filterOption(item)}
                  </ul>
                ) : (
                  "No categories found"
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
