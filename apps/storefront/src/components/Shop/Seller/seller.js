import React, { useState, Fragment } from "react";
import { IoIosHeartEmpty, IoIosShuffle, IoMdChatboxes } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { ProductRating } from "@bavaan/storefront-base/src/components/Product";
import { getProductCartQuantity } from "@bavaan/storefront-base/src/lib/product";
import { useQuery } from "@apollo/react-hooks";
import { GET_VENDOR_INFO } from "../../../../../../libs/graphql/shop/shop-vendor.graphql";

const Seller = ({ channel }) => {
  const querySeller = useQuery(GET_VENDOR_INFO, {
    variables: { channelCode: channel.code },
  });
  if (querySeller.loading || !querySeller.data) {
    return null;
  }
  const seller = querySeller.data.getVendorByBrand;
  return (
    <div className="product-content__other-info space-mt--50" key={2}>
      <table>
        <tbody>
          <tr className="single-info">
            <td className="title">Seller:</td>
            <td className="value">
              <Link href={`/shop/${channel.code}/shop_store_home`}>
                <a title="View shop">{channel.code}</a>
              </Link>
            </td>
          </tr>
          {/*<tr className="single-info">*/}
          {/*  <td className="title">Rating:</td>*/}
          {/*  <td className="value">*/}
          {/*    <div className="product-content__rating-wrap d-block d-sm-flex space-mb--20">*/}
          {/*      <div className="product-content__rating space-mr--20">*/}
          {/*        <ProductRating ratingValue={4.5} />*/}
          {/*      </div>*/}
          {/*      <div className="product-content__rating-count">*/}
          {/*        (1k rating count)*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </td>*/}
          {/*</tr>*/}
          <tr className="single-info">
            <td className="title"></td>
            <td className="value">
              <Link href={`/shop/${channel.code}/shop_contact`}>
                <button type="button" className="btn btn-outline-danger">
                  Ask question
                </button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Seller;
