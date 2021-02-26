import React, { useRef, useState, useCallback, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SpinnerCenter from "../common/Spinner";
import { useRouter } from "next/router";
import { CREATE_VENDOR_INFO } from "@bavaan/graphql/seller/create-seller.graphql";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { convertRefToObject } from "../../lib/convertRefToObject";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import formatCountryCode from "../../lib/formatCountryCode";
const ShopInfo = ({ step, transitionStep, vendorId, setBrandName, countries, customStyles }) => {
  /**Customize select component */
  const router = useRouter();
  const [mutationCreateVendorInfo, { data }] = useMutation(CREATE_VENDOR_INFO);
  const { addToast } = useToasts();
  const shopInfoRef = useRef({});
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const setLoadingState = useCallback(() => {
    setLoading(!loading);
    setDisable(true);
  }, [loading]);
  const createVendorInfo = async () => {

    var vendorInfoInput = convertRefToObject(shopInfoRef.current);
    vendorInfoInput["vendorId"] = vendorId;
    try {
      const res = await mutationCreateVendorInfo({
        variables: { input: vendorInfoInput },
      });

      if (res && res.data && res.data.createVendorInfo) {
        if (addToast) {
          addToast("Submit Vendor Info Success", {
            appearance: "success",
            autoDismiss: true,
          });
        }
        setBrandName(res.data.createVendorInfo.brandName);
        setLoadingState();
      } else {
        if (addToast) {
          addToast("Something wrong !", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    } catch (e) {
      if (addToast) {
        addToast(e.message || e, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        transitionStep();
        router.push(router.route + "#step3");
      }, 1500);
    }
  }, [loading]);
  return (
    <React.Fragment>
      <Form onSubmit={(e) => {
        e.preventDefault();
        createVendorInfo()
      }}>
        <Row>
          <Col lg={12}>
            <div className="section-title--login text-center space-mb--50">
              <h2 className="space-mb--20">Seller Information</h2>
            </div>
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regBrandName">
              Brand name <span className="required">*</span>{" "}
            </label>
            <input
              ref={(el) => (shopInfoRef.current["brandName"] = el)}
              type="text"
              required
            />
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regAddress">
              Reg address <span className="required">*</span>{" "}
            </label>
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["regAddress"] = el)}
            />
          </Col>
          <Col lg={12} className="space-mb--30">
            <label htmlFor="postalCode">
              Postal Code <span className="required">*</span>{" "}
            </label>
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["postalCode"] = el)}
            />
          </Col>
          <Col lg={6} className="space-mb--30">
            <label>Country <span className="required">*</span>{" "}</label>
            <br />
            <Select
              styles={customStyles}
              options={countries}
              defaultValue={{ value: "AF", label: "Afghanistan" }}
              className="custom-form"
              ref={(el) => (shopInfoRef.current["countryCode"] = el)}
            />
          </Col>
          <Col lg={6} className="space-mb--30">
            <label htmlFor="city">
              City <span className="required">*</span>{" "}
            </label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["city"] = el)}
            />
          </Col>
          <Col lg={6} className="space-mb--30">
            <label htmlFor="regPanno">
              PAN NO <span className="required">*</span>{" "}
            </label>
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["panno"] = el)}
            />
          </Col>
          <Col lg={6} className="space-mb--30">
            <label>GSTIN ID <span className="required">*</span>{" "}</label>
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["GSTINID"] = el)}
            />
          </Col>
          <Col lg={12} className="space-mb--30">
            <label>State <span className="required">*</span>{" "}</label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["state"] = el)}
            />
          </Col>

          <Col lg={12} className="space-mb--30">
            <label>ADHAR NUMBER <span className="required">*</span>{" "}</label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["ADHAR"] = el)}
            />
          </Col>
          <Col lg={12} className="space-mb--30">
            <label>ABOUT US <span className="required">*</span>{" "}</label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["aboutUs"] = el)}
            />
          </Col>
          <Col lg={12} className="space-mb--30">
            <label>Staff Email Adreess <span className="required">*</span>{" "}</label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["staffEmail"] = el)}
            />
          </Col>
          <Col lg={12} className="space-mb--30">
            <label>Phone Number <span className="required">*</span>{" "}</label>
            <br />
            <input
              type="text"
              required
              ref={(el) => (shopInfoRef.current["phone"] = el)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={8}></Col>
          <Col lg={3} className="text-center">
            <button
              type="submit"
              className="lezada-button lezada-button--medium"
              disabled={disable}
            >
              Next
            </button>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Form>
      {loading ? <SpinnerCenter /> : null}
    </React.Fragment>
  );
};

export default ShopInfo;
