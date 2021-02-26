import React, { useRef, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_VENDOR_BANK } from '@bavaan/graphql/seller/create-seller.graphql';
import { useToasts } from "react-toast-notifications";
import { convertRefToObject } from "../../lib/convertRefToObject";
import { useRouter } from "next/router";
const BankingDetail = ({step, transitionStep, vendorId, brandName}) => {
    const [mutationCreateVendorBank, { data }] = useMutation(CREATE_VENDOR_BANK);
    const { addToast } = useToasts();
    const bankingRef = useRef({});
    const router = useRouter();
    const executeMutation = async () => {
      const vendorBankInput = convertRefToObject(bankingRef.current);
      vendorBankInput['vendorId'] = vendorId
      try {
        const res = await mutationCreateVendorBank({
          variables: {input: vendorBankInput}
        });
        if (res.data && res.data.createVendorBank) {
          if (addToast) {
            addToast("Submit Vendor Banking Success", {
              appearance: "success",
              autoDismiss: true,
            });
          }
          router.push(`/shop/${brandName}/shop_store_home`)
        }
        else {
          if (addToast) {
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
            });
          }
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
        // window.location.reload(true)
      }
    }
  return (
      <React.Fragment>
      <Form>
        <Row>
          <Col lg={12}>
            <div className="section-title--login text-center space-mb--50">
              <h2 className="space-mb--20">Banking Account Information</h2>
            </div>
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regBrandName">Account number</label>
            <input
              ref={el => bankingRef.current['account'] = el}
              type="text"
              required
            />
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regAddress">IFSC CODE</label>
            <input
              type="text"
              required
              ref={el => bankingRef.current['code'] = el}
            />
          </Col>

          <Col lg={12} className="space-mb--30">
            <label htmlFor="regPanno">
            Address  <span className="required">*</span>{" "}
            </label>
            <input
              type="text"
              required
              ref={el => bankingRef.current['address'] = el}
            />
          </Col>
          <Col lg={12} className="space-mb--30">
            <label>
                TYPE OF ACCOUNT 
                <span className="required">*</span>{" "}
            </label>
            <br />
            <Form.Control
                as="select"
                className="custom-form"
                style={{boxShadow: "none", backgroundColor: "transparent"}}
                ref={el => bankingRef.current['type'] = el}
            >
                <option>Account type</option>
                <option value="CURRENT">Current</option>
                <option value="SAVING">Saving</option>
            </Form.Control>
          </Col>
          <Col lg={12} className="space-mb--30">
            <label htmlFor="custom-file">Cancel Check</label>
            <br />
            <Form.File 
                id="custom-file"
                custom
                className="custom-form"
                style={{boxShadow: "none", backgroundColor: "transparent"}}
                ref={el => bankingRef.current['isCheck'] = el}
            >
            </Form.File>
          </Col>          
        </Row>
        <Row>
            <Col lg={4}></Col>
            <Col lg={4} className="text-center">
                <button type="button" className="lezada-button lezada-button--medium" onClick={executeMutation}>Start Selling</button>
            </Col>
            <Col lg={4}></Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default BankingDetail;
