import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import React, {useEffect, useState} from "react";
import Rating from "react-rating";
import { CREATE_REVIEW_PRODUCT } from '@bavaan/graphql/review/create-review.graphql';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {GET_ACTIVE_CUSTOMER} from "@bavaan/graphql/documents.graphql";
import { useToasts } from "react-toast-notifications";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";

const ProductDescriptionTab = ({ product }) => {
  const [activeId, setActiveId] = useState("2");

  const [queryGetActiveCustomer, activeCustomer] = useLazyQuery(
    GET_ACTIVE_CUSTOMER
  );
  const [createReviewProductReq] = useMutation(CREATE_REVIEW_PRODUCT, {});
  const [nameCustomer, setNameCustomer] = useState("");
  const [emailCustomer, setEmailCustomer] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    queryGetActiveCustomer();
  }, []);

  const submitReview = (productId, nameCustomer, emailCustomer, rating, reviewContent) => {
    createReviewProductReq({
      variables: {
        input: {
          productId: productId,
          customerId: activeCustomer.id,
          summary: reviewContent,
          body: reviewContent,
          rating: rating,
          authorName: nameCustomer,
        },
      },
    })
      .then((res) => {
       
        if (res.errors || res.message) {
          throw { message: "Cannot create review product, please fill empty field" };
        } else if (res.data.submitProductReview) {
          addToast("Success create review product", {
            appearance: "success",
            autoDismiss: true,
          }   );
          // router.push(`/shop/${sendData.code}/shop_store_home`);
        } else {
          throw {
            message:
                "Some reason cannot create review product",
          };
        }
      })
      .catch((e) => {
        addToast(e.message || "Cannot connect to server", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };


  function toggleActive(id) {
    if (activeId === id) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  }

  let listVariantTitle = [];
  let listVariantValue = [];
  let listVariant = {};
  return (
    <div>
      <Accordion>
        <div className="border-top border-bottom mt-lg-5" >
          <Accordion.Toggle className="pt-4 pb-4 text-uppercase font-weight-bold border-bottom-0" as={Card.Header} eventKey="0" style={{backgroundColor: "#fff", padding: 0}}>
            Description
            { activeId == "0" ? <div style={{float: "right"}}> - </div> : <div style={{float: "right"}}> + </div>}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div className="m-2" style={{maxWidth: "1080px"}}><p>{product.fullDescription}</p></div>
          </Accordion.Collapse>
        </div>
        <div className="border-bottom">
          <Accordion.Toggle className="pt-4 pb-4 text-uppercase font-weight-bold border-bottom-0" as={Card.Header} eventKey="1" style={{backgroundColor: "#fff", padding: 0}}>
            Additional Infomation
            { activeId == "0" ? <div style={{float: "right"}}> - </div> : <div style={{float: "right"}}> + </div>}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <div className="m-2">
              <div className="product-description-tab__additional-info">
                <table className="shop-attributes">
                  <tbody>
                  {product.variants.productVariantList.map((variant, index) => {
                    variant.options.map((optionVariant, index) => {
                      const result = listVariantTitle.filter(variantTitle => variantTitle === optionVariant.group.name);
                      if (listVariantTitle.length === 0){
                        listVariantTitle.push(optionVariant.group.name);
                        listVariant[optionVariant.group.name] = []
                      }
                      else{
                        if (result === undefined || result.length === 0){
                          listVariantTitle.push(optionVariant.group.name);
                          listVariant[optionVariant.group.name] = []
                        }
                      }
                    });
                    variant.options.map((optionVariant, index) => {
                      const result2 = listVariantValue.filter(variantValue => variantValue === optionVariant.name);
                      if (listVariantValue.length === 0 ){
                        listVariantValue.push(optionVariant.name);
                        listVariant[optionVariant.group.name].push(optionVariant.name)
                      }
                      else{
                        if (result2 === undefined || result2.length === 0){
                          listVariantValue.push(optionVariant.name);
                          listVariant[optionVariant.group.name].push(optionVariant.name)
                        }
                      }
                    });
                  })}
                  { Object.keys(listVariant).length > 0 ? Object.keys(listVariant).map((value, index) => {
                      return(
                          <tr key={index}>
                            <th>{value}</th>
                            <td>
                              {listVariant[value].join(", ")}
                            </td>
                          </tr>
                      )
                    }) : <tr><td>No Information</td></tr>
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </Accordion.Collapse>
        </div>
      </Accordion>
      <div className="border-bottom-0 border-right-0 border-left-0 rounded-0">
        <Accordion.Toggle className="pt-4 pb-4 text-uppercase font-weight-bold border-bottom-0" as={Card.Header} style={{backgroundColor: "#fff", padding: 0}}>
          REVIEWS {product.customFields.ratingCount ? `(${product.customFields.ratingCount})` : ""}
        </Accordion.Toggle>
          <div className="m-2">
            <div className="product-description-tab__review">
              <h2 className="review-title space-mb--20">
                {product.customFields.ratingCount ? product.customFields.ratingCount : "0"} reviews on{" "}
                {product.name}
              </h2>
              {product.reviews.items.map((review, index) => {
                const date = new Date(review.createdAt.slice(0,10));
                return(
                    <div key={index} className="single-review">
                      <div className="single-review__image">
                        <img
                            src={
                              process.env.PUBLIC_URL + "/assets/images/user/user1.jpeg"
                            }
                            className="img-fluid"
                            alt=""
                        />
                      </div>
                      <div className="single-review__content"  style={{zIndex: -1}}>
                        {/*=======  rating  =======*/}
                        <Rating
                            initialRating={review.rating}
                            emptySymbol={<IoIosStarOutline />}
                            fullSymbol={<IoIosStar className="yellow"/>}
                            readonly
                        />

                        {/*=======  username and date  =======*/}
                        <p className="username">
                          {review.authorName} <span className="date">{"/" + new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit"
                        }).format(date)}</span>
                        </p>

                        {/*=======  message  =======*/}
                        <p className="message">
                          {review.summary}
                        </p>
                        {/*=======  End of message  =======*/}
                      </div>
                    </div>
                )})}

              <h2 className="review-title space-mb--20">Add a review</h2>
              <p className="text-center">
                Your email address will not be published. Required fields are
                marked *
              </p>
              {/*=======  review form  =======*/}
              <div className="lezada-form lezada-form--review">
                <form>
                  <div className="d-flex flex-column">
                    <div className="d-flex flex-row" style={{justifyContent: "space-between"}}>
                      <div className="space-mb--20 m-3">
                        <input type="text" placeholder="Name *" required onChange={(e) => {
                          setNameCustomer(e.target.value)
                        }} />
                      </div>
                      <div className="space-mb--20 m-3">
                        <input type="email" placeholder="Email *" required onChange={(e) => {
                          setEmailCustomer(e.target.value)
                        }} />
                      </div>
                    </div>
                    <div className="space-mb--20 m-3">
                      <span className="rating-title space-mr--20">
                        YOUR RATING
                      </span>
                      <Rating
                          placeholderRating={rating}
                          emptySymbol={<IoIosStarOutline />}
                          placeholderSymbol={<IoIosStar className="yellow"/>}
                          fullSymbol={<IoIosStar className="yellow"/>}
                          onChange={(rate) => {setRating(rate)}}
                      />
                    </div>
                    <div className="space-mb--20 m-3">
                      <textarea
                          className="border rounded p-3"
                          cols={30}
                          rows={10}
                          placeholder="Your review *"
                          defaultValue={""}
                          onChange={(e) => {
                            setReviewContent(e.target.value)
                          }}
                      />
                    </div>
                    <div className="text-center">
                      <button
                          type="button"
                          className="lezada-button lezada-button--medium"
                          onClick={(e) => {
                            submitReview( product.id, nameCustomer, emailCustomer, rating, reviewContent)
                          }}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/*=======  End of review form  =======*/}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProductDescriptionTab;
