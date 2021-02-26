import { Fragment } from "react";
import { colorDefined } from "../../lib/product";
const RenderOptionSelect = ({
  productVariantList = [],
  selectedProduct = {},
  setSelectedProduct,
}) => {
  const renderArrayProductOption = (productVariantList) => {
    const k = {};
    productVariantList.forEach((productVariant) => {
      productVariant.options.forEach((productOption) => {
        const groupName = productOption.group.code;
        if (!k[groupName]) {
          k[groupName] = [];
          k[groupName].push(productOption);
        } else if (
          k[groupName].findIndex(
            (productOptionFind) => productOptionFind.code === productOption.code
          ) < 0
        ) {
          k[groupName].push(productOption);
        }
      });
    });
    return Object.values(k);
  };
  const resolveProductSelect = (detailOption, indexVariant) => {
    // cause we have indexVariants to compare detailOption
    // beside selectedProduct helps to search another
    const productSelect = productVariantList.filter(
      (productVariantList, indexProductVariants) => {
        const filterProductVariantsList = productVariantList.options.filter(
          (productOption, indexProductOption) => {
            if (indexProductOption === indexVariant) {
              if (
                productOption.code === detailOption.code &&
                productOption.group.id === detailOption.group.id
              ) {
                return true;
              }
              return false;
            } else {
              const optionSelected =
                selectedProduct.options[indexProductOption];
              const considerOption = productOption;
              if (
                optionSelected.code === considerOption.code &&
                optionSelected.group.id === considerOption.group.id
              ) {
                return true;
              }
              return false;
            }
          }
        );
        return (
          filterProductVariantsList.length === productVariantList.options.length
        );
      }
    );
    if (productSelect.length) {
      setSelectedProduct(productSelect[0]);
    }
  };

  // code in here switch case of option
  const selectTypeOption = (item, index) => {
    switch (item[index].group.code) {
      case "color":
        return (
          <div className="product-content__color__content ml-2">
            {item.map((detailOption, detailOptionIndex) => {
              return (
                <Fragment key={detailOptionIndex}>
                  <input
                    type="radio"
                    value={detailOption.name}
                    name={detailOption.group.code}
                    checked={
                      detailOption.code ===
                        selectedProduct.options[index].code &&
                      detailOption.group.id ===
                        selectedProduct.options[index].group.id
                        ? "checked"
                        : ""
                    }
                    id={detailOption.name}
                    onChange={(e) => {
                      resolveProductSelect(detailOption, index);
                      // we must to select item before anything else cause i checked first
                    }}
                  />
                  <label
                    htmlFor={detailOption.name}
                    style={{ backgroundColor: colorDefined(detailOption.code) }}
                  ></label>
                </Fragment>
              );
            })}
          </div>
        );
      default:
        return (
          <Fragment>
            {item.map((detailOption, detailOptionIndex) => {
              return (
                <div key={detailOptionIndex} className="single-method mb-0 ml-2">
                  <input
                    type="radio"
                    value={detailOption.name}
                    name={detailOption.group.code}
                    checked={
                      detailOption.code ===
                        selectedProduct.options[index].code &&
                      detailOption.group.id ===
                        selectedProduct.options[index].group.id
                        ? "checked"
                        : ""
                    }
                    id={detailOption.name}
                    onChange={(e) => {
                      resolveProductSelect(detailOption, index);
                      // we must to select item before anything else cause i checked first
                    }}
                  />
                  <label htmlFor={detailOption.name}>{detailOption.name}</label>
                </div>
              );
            })}
          </Fragment>
        );
    }
  };

  return renderArrayProductOption(productVariantList).map((item, index) => {
    const option = item[0].group;
    return (
      <div key={index} className="product-content__size-color">
        <div className="product-content__size space-mb--20">
          <div className="product-content__size__title text-capitalize">
            {option.name}
          </div>
          {selectTypeOption(item, index)}
        </div>
      </div>
    );
  });
};
export default RenderOptionSelect;
