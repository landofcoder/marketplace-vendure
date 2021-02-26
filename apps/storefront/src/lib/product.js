// get products
export const getProducts = (products, category, type, limit) => {
  const finalProducts = category
    ? products.filter(
        (product) => product.category.filter((single) => single === category)[0]
      )
    : products;
  if (type && type === "new") {
    const newProducts = finalProducts.filter((single) => single.new);
    return newProducts.slice(0, limit ? limit : newProducts.length);
  }
  if (type && type === "popular") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.saleCount - a.saleCount;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "topRated") {
    return (
      finalProducts &&
      finalProducts
        .sort((a, b) => {
          return b.rating - a.rating;
        })
        .slice(0, limit ? limit : finalProducts.length)
    );
  }
  if (type && type === "sale") {
    const saleItems =
      finalProducts &&
      finalProducts.filter((single) => single.discount && single.discount > 0);
    return saleItems.slice(0, limit ? limit : saleItems.length);
  }
  return (
    finalProducts &&
    finalProducts.slice(0, limit ? limit : finalProducts.length)
  );
};

export const formatterConvertCurrency = (currencyCode) => {
  let locales = "";
  switch (currencyCode) {
    case "USD":
      locales = "en-US";
      break;
    case "INR":
      locales = "hi-IN";
      break;
    default:
      locales = "en-US";
  }
  if (currencyCode) {
    return {
      format: (price) => {
        return Intl.NumberFormat(locales, {
          style: "currency",
          currency: currencyCode,
        }).format(price / 100);
      },
    };
  }
  return () => {
    format: () => null;
  };
};

// get product discount price
export const getDiscountPrice = (price, discount) => {
  price = +price;
  discount = +discount;
  return discount && discount > 0 ? price - price * (discount / 100) : price;
};

// get product cart quantity
export const getProductCartQuantity = (cartItems, product, color, size) => {
  let productInCart =
    cartItems.lines &&
    cartItems.lines.filter(
      (single) =>
        single.id === product.id &&
        (single.selectedProductColor
          ? single.selectedProductColor === color
          : true) &&
        (single.selectedProductSize
          ? single.selectedProductSize === size
          : true)
    )[0];
  if (cartItems.length === 1 && productInCart) {
    if (product.variation) {
      return cartItems.filter(
        (single) =>
          single.id === product.id &&
          single.selectedProductColor === color &&
          single.selectedProductSize === size
      )[0].quantity;
    } else {
      return cartItems.filter((single) => product.id === single.id)[0].quantity;
    }
  } else {
    return 0;
  }
};

//get products based on category
export const getSortedProducts = (products, sortType, sortValue) => {
  if (products && sortType && sortValue) {
    if (sortType === "category") {
      return products.filter(
        (product) =>
          product.category.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "tag") {
      return products.filter(
        (product) => product.tag.filter((single) => single === sortValue)[0]
      );
    }
    if (sortType === "color") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter((single) => single.color === sortValue)[0]
      );
    }
    if (sortType === "size") {
      return products.filter(
        (product) =>
          product.variation &&
          product.variation.filter(
            (single) =>
              single.size.filter((single) => single.name === sortValue)[0]
          )[0]
      );
    }
    if (sortType === "filterSort") {
      let sortProducts = [...products];
      if (sortValue === "default") {
        return sortProducts;
      }
      if (sortValue === "priceHighToLow") {
        return sortProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sortValue === "priceLowToHigh") {
        return sortProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
    }
  }
  return products;
};

// get individual element
const getIndividualItemArray = (array) => {
  let individualItemArray = array.filter((v, i, self) => i === self.indexOf(v));
  return individualItemArray;
};

// get individual element object
const getIndividualColorObjectArray = (array) => {
  let individualObjectArray = array.filter((v, i, self) => {
    return (
      i ===
      self.findIndex(
        (t) => t.colorName === v.colorName && t.colorCode === v.colorCode
      )
    );
  });
  return individualObjectArray;
};

// get individual categories
export const getIndividualCategories = (products) => {
  let productCategories = [];
  products &&
    products.map((product) => {
      return (
        product.category &&
        product.category.map((single) => {
          return productCategories.push(single);
        })
      );
    });
  const individualProductCategories = getIndividualItemArray(productCategories);
  return individualProductCategories;
};

// get individual tags
export const getIndividualTags = (products) => {
  let productTags = [];
  products &&
    products.map((product) => {
      return (
        product.tag &&
        product.tag.map((single) => {
          return productTags.push(single);
        })
      );
    });
  const individualProductTags = getIndividualItemArray(productTags);
  return individualProductTags;
};

// get individual colors
export const getIndividualColors = (products) => {
  let productColors = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return productColors.push({
            colorName: single.color,
            colorCode: single.colorCode,
          });
        })
      );
    });
  const individualProductColors = getIndividualColorObjectArray(productColors);
  return individualProductColors;
};

// get individual sizes
export const getProductsIndividualSizes = (products) => {
  let productSizes = [];
  products &&
    products.map((product) => {
      return (
        product.variation &&
        product.variation.map((single) => {
          return single.size.map((single) => {
            return productSizes.push(single.name);
          });
        })
      );
    });
  const individualProductSizes = getIndividualItemArray(productSizes);
  return individualProductSizes;
};

// get product individual sizes
export const getIndividualSizes = (product) => {
  let productSizes = [];
  product.variation &&
    product.variation.map((singleVariation) => {
      return (
        singleVariation.size &&
        singleVariation.size.map((singleSize) => {
          return productSizes.push(singleSize.name);
        })
      );
    });
  const individualSizes = getIndividualItemArray(productSizes);
  return individualSizes;
};

export const setActiveSort = (e) => {
  const filterButtons = document.querySelectorAll(
    ".single-sidebar-widget__list button, .tag-container button, .single-filter-widget__list button"
  );
  filterButtons.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const setActiveLayout = (e) => {
  const gridSwitchBtn = document.querySelectorAll(".grid-icons button");
  gridSwitchBtn.forEach((item) => {
    item.classList.remove("active");
  });
  e.currentTarget.classList.add("active");
};

export const convertProducts = (
  products,
  imageSize = {
    thumb: {
      w: 200,
      h: 200,
    },
    full: {
      w: 600,
      h: 600,
    },
  },
  collections
) => {
  return products.map((product) => {
    return convertProduct(product, imageSize, collections);
  });
};

export const convertProduct = (
  product,
  imageSize = {
    thumb: {
      w: 200,
      h: 200,
    },
    full: {
      w: 600,
      h: 600,
    },
  },
  collections
) => {
  console.log("pro", product);
  const thumbImageQuery = new URLSearchParams(imageSize.thumb).toString();
  const fullImageQuery = new URLSearchParams(imageSize.full).toString();
  const formatter = formatterConvertCurrency(product.currencyCode);
  const discount =
    ((product.priceWithTax.max - product.priceWithTax.min) /
      product.priceWithTax.max) *
    100;
  const price = product.priceWithTax.max;
  const convertedProduct = {
    ...product,
    id: product.productId,
    sku: product.sku,
    name: product.productName,
    slug: product.slug,
    price: product.priceWithTax.max,
    priceFormatted: formatter.format(product.priceWithTax.max),
    discountFormatted: formatter.format(price * ((100 - discount) / 100)),
    discount: (
      ((product.priceWithTax.max - product.priceWithTax.min) /
        product.priceWithTax.max) *
      100
    ).toFixed(0),
    thumbImage: [product.productAsset?.preview + "?" + thumbImageQuery],
    image: [product.productAsset?.preview + "?" + fullImageQuery],
    shortDescription: product.description,
    fullDescription: product.description,
    collections:
      collections && collections.length && product.collectionIds
        ? product.collectionIds.map((clID) =>
            collections.find((item) => item.id === clID)
          )
        : null,
    stock: 100,
    variation: product.variation,
  };
  return convertedProduct;
};

export const filterShowUpMaxMinProductPrice = (product) => {
  if (product && product.priceWithTax && product.priceWithTax.min) {
    const formatter = formatterConvertCurrency(product.currencyCode);
    if (product.priceWithTax.min === product.priceWithTax.max) {
      return formatter.format(product.priceWithTax.min);
    }
    return `${formatter.format(product.priceWithTax.min)} - ${
      product.priceWithTax.max
    }`;
  }
  if (product.variants && product.variants.productVariantList.length) {
    const productPriceArray = product.variants.productVariantList.map(
      (item) => {
        return { price: item.priceWithTax, formatter: item.formatter };
      }
    );
    if (productPriceArray.length <= 1)
      return `${productPriceArray[0].formatter.format(
        productPriceArray[0].price
      )}`;

    const productPriceSort = productPriceArray.sort(
      (a, b) => a.price - b.price
    );
    const priceMin = productPriceSort[0];
    const priceMax = productPriceSort[productPriceSort.length - 1];
    if (priceMin.price === priceMax.price)
      return priceMin.formatter.format(priceMin.price);
    return `${priceMin.formatter.format(
      priceMin.price
    )} - ${priceMax.formatter.format(priceMax.price)}`;
  }
  return null;
};

export const convertProductsGroupVariant = (products) => {
  return products.map((product) => {
    return convertProductDetail(product);
  });
};

export const convertProductDetail = (
  product,
  imageSize = {
    thumb: {
      w: 200,
      h: 200,
    },
    full: {
      w: 500,
      h: 500,
    },
  }
) => {
  const thumbImageQuery = new URLSearchParams(imageSize.thumb).toString();
  const fullImageQuery = new URLSearchParams(imageSize.full).toString();
  const price = product.variants.map((item) => {
    // console.log(item)
    return item.priceWithTax;
  });
  const currencyCode = product.variants.map((item) => {
    return item.currencyCode;
  });
  const formatter = formatterConvertCurrency(product.variants[0].currencyCode);
  const convertedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    // price: 0,
    price,
    currencyCode,
    discount: 0,
    priceFormatted: formatter.format(Math.min(...price)),
    discountFormatted: formatter.format(Math.min(...price) * ((100 - 0) / 100)),
    // new: true,
    customFields: {
      rating:
        product.customFields && product.customFields.reviewRating
          ? product.customFields.reviewRating
          : 0,
      ratingCount:
        product.customFields && product.customFields.reviewCount
          ? product.customFields.reviewCount
          : 0,
    },
    variants: {
      productVariantList: product.variants.map((item) => {
        // we are already integrate formatter into product so easy to reuse
        const formatter = formatterConvertCurrency(item.currencyCode);
        return { ...item, formatter };
      }),
    },
    collections: product.collections,
    category: product.collections.map((collection) => {
      return collection.name;
    }),
    tag: ["decor"],
    thumbImage: product.assets.map((asset) => {
      return asset.preview + "?" + thumbImageQuery;
    }),
    image: product.assets.map((asset) => {
      return asset.preview + "?" + fullImageQuery;
    }),
    shortDescription: product.description,
    fullDescription: product.description,
    channel: {
      code: product.channel?.code,
      id: product.channel?.id,
    },
    reviews: {
      totalItems:
        product.reviews && product.reviews.totalItems
          ? product.reviews.totalItems
          : 0,
      items:
        product.reviews && product.reviews.items
          ? product.reviews.items.map((items) => {
              return items;
            })
          : [],
    },
    stock: 100,
  };
  return convertedProduct;
};

export const productSkeleton = (
  imageSize = {
    thumb: {
      w: 200,
      h: 200,
    },
    full: {
      w: 600,
      h: 600,
    },
  }
) => {
  const thumbImageQuery = new URLSearchParams(imageSize.thumb).toString();
  const fullImageQuery = new URLSearchParams(imageSize.full).toString();
  const product = {
    id: 0,
    sku: "",
    name: "",
    slug: "",
    price: 0,
    discount: 0,
    new: false,
    rating: 0,
    ratingCount: 0,
    saleCount: 0,
    collections: [],
    category: [],
    tag: [],
    thumbImage: [],
    image: [],
    shortDescription: "",
    fullDescription: "",
  };
  return product;
};

export function selectCategoriesFilter(currentFacet = {}, facetFilter = []) {
  if (!facetFilter.length) return false;
  return facetFilter.filter((item) => item === currentFacet.id).length;
}
export function filterFacetSelectedByID(
  facets = { facetValues: [{ facetValue: [] }] },
  currentFacetID = []
) {
  return currentFacetID.map((fsID) => {
    let newOne = fsID;
    facets.map((list) => {
      list.facetValues.map((fsV) => {
        if (fsV.facetValue.id === fsID) {
          newOne = fsV.facetValue;
        }
      });
    });
    return newOne;
  });
}
export function colorDefined(color = "") {
  switch (color.toLowerCase()) {
    case "white":
      return "#EDEEED";
    case "wood":
      return "#996633";
    default:
      return color;
  }
}
