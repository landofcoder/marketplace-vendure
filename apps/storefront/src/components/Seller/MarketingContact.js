import React, { useRef, useState, useEffect, useCallback } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_VENDOR_MARKETING_CONTACT } from '@bavaan/graphql/seller/create-seller.graphql';
import { useToasts } from "react-toast-notifications";
import { convertRefToObject } from "../../lib/convertRefToObject";
import { useRouter } from "next/router";
const MarketingContact = ({step, transitionStep, vendorId}) => {
    const [mutationCreateVendorMarketingContact, {data}] = useMutation(CREATE_VENDOR_MARKETING_CONTACT);
    const { addToast } = useToasts();
    const marketingRef = useRef({});
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const setLoadingState = useCallback(() => {
        setLoading(!loading);
        setDisable(true);
    }, [loading]);
    const createVendorMarketingContact = async () => {

      const vendorMarketingContactInput = convertRefToObject(marketingRef.current);
      vendorMarketingContactInput['vendorId'] = vendorId;
      try {
          const res = await mutationCreateVendorMarketingContact({
              variables: {input: vendorMarketingContactInput}
          });
          if (res.data && res.data.createVendorMarketingContact) {
            if (addToast) {
                addToast("Submit Vendor Marketing Contact Success", {
                  appearance: "success",
                  autoDismiss: true,
                });
              }
              setLoadingState();
          }
      }
      catch(e) {
        if (addToast) {
            addToast(e.message || e, {
              appearance: "error",
              autoDismiss: true,
            }
            )
          }
      }
    };
    useEffect(() => {
        if (loading) {
        setTimeout(() => {
            setLoading(false);
            transitionStep();
            router.push(router.route + '#step4')
        }, 1500);
        }
    }, [loading]);
  return (
      <React.Fragment>
      <Form onSubmit={(e) => {
        e.preventDefault();
        createVendorMarketingContact()
      }}>
        <Row>
          <Col lg={12}>
            <div className="section-title--login text-center space-mb--50">
              <h2 className="space-mb--20">Marketing Contact</h2>
            </div>
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regBrandName">Contact Person Name</label>
            <input
              ref={el => marketingRef.current['name'] = el}
              type="text"
              required
            />
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regAddress">Email Address <span className="required">*</span>{" "}</label>
            <input
              type="email"
              required
              ref={el => marketingRef.current['emailAddress'] = el}
            />
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regPanno">
            Contact Phone Number <span className="required">*</span>{" "}
            </label>
            <input
              type="text"
              required
              ref={el => marketingRef.current['phone'] = el}
            />
          </Col>    
        </Row>
        <Row>
            <Col lg={4}></Col>
            <Col lg={4} className="text-center">
                <button type="submit" className="lezada-button lezada-button--medium"disabled={disable}>Next</button>
            </Col>
            <Col lg={4}></Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default MarketingContact;
