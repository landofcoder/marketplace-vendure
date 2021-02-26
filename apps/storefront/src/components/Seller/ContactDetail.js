import React, { useRef, useState, useCallback, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SpinnerCenter from "../common/Spinner";
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import {CREATE_VENDOR_CONTACT} from '@bavaan/graphql/seller/create-seller.graphql';
import { convertRefToObject } from "../../lib/convertRefToObject";
import { useToasts } from "react-toast-notifications";
const ContactDetails = ({ step, transitionStep, vendorId, countries, customStyles }) => {
    const { addToast } = useToasts();
    const router = useRouter();
    const contactRef = useRef([]);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const setLoadingState = useCallback(() => {
        setLoading(!loading);
        setDisable(true);
    }, [loading]);
    const [createVendorContact, {data}] = useMutation(CREATE_VENDOR_CONTACT);
    const createVendorContactDetail = async () => {

      const vendorContactInput = convertRefToObject(contactRef.current);
      vendorContactInput['vendorId'] = vendorId;
      try {
        const res = await createVendorContact({
          variables: {input: vendorContactInput}
        });
        if (res.data && res.data.createVendorContact) {
          if (addToast) {
            addToast("Submit Vendor Contact Success", {
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
    <>
      <Form onSubmit={(e) => {
        e.preventDefault();
        createVendorContactDetail();
      }}>
        <Row>
          <Col lg={12}>
            <div className="section-title--login text-center space-mb--50">
              <h2 className="space-mb--20">Contact Details</h2>
            </div>
          </Col>

          <Col lg={6} className="space-mb--30">
            <label htmlFor="contactName">Contact Person Name </label>
            <input
              ref={(el) => (contactRef.current['contactName'] = el)}
              type="text"
              required
            />
          </Col>
          <Col lg={6} className="space-mb--30">
            <label htmlFor="email">
              Email Address <span className="required">*</span>{" "}
            </label>
            <input
              type="email"
              required
              ref={(el) => (contactRef.current['email'] = el)}
            />
          </Col>
          <Col lg={6} className="space-mb--30">
            <label>Contact Phone Number <span className="required">*</span>{" "}</label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (contactRef.current['phone'] = el)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={8}/>
          <Col lg={3} className="text-center">
            <button
              type="submit"
              className="lezada-button lezada-button--medium"
              disabled={disable}
            >
              Next
            </button>
          </Col>
          <Col lg={1}/>
        </Row>
      </Form>
      {loading ? (<SpinnerCenter/>): null}
    </>
  );
};

export default ContactDetails;
