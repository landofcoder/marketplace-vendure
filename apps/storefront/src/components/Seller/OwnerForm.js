import React, { useRef, useState, useCallback, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import SpinnerCenter from "../common/Spinner";
import { useRouter } from 'next/router';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_VENDOR, GET_VENDOR_BY_EMAIL } from '@bavaan/graphql/seller/create-seller.graphql';
import { useToasts } from "react-toast-notifications";
import { convertRefToObject } from "../../lib/convertRefToObject";
const OwnerForm = ({step, transitionStep, setVendorId}) => {
    const [test, setTest] = useState('');
    const [mutationCreateVendor, { data }] = useMutation(CREATE_VENDOR);
    const router = useRouter();
    const ownerRef = useRef({});
    const res = useQuery(GET_VENDOR_BY_EMAIL, {variables: {email: test}});
    if (res.data != null && res.data.getVendorByEmail != null) {
      setVendorId(res.data.getVendorByEmail.id)
    }
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const { addToast } = useToasts();
    const setLoadingState = useCallback(
        () => {
            setLoading(!loading);
            setDisable(true)
        },
        [loading]
    );
    const createVendor = async () => {

      // setTest(vendorInput.email)
      if (res.data == null || res.data.getVendorByEmail == null) {
        try {
          var vendorInput = convertRefToObject(ownerRef.current);
          const res = await mutationCreateVendor({
            variables: {input: vendorInput}
          });
          if (res.data && res.data.createVendor) {
            setVendorId(res.data.createVendor.id);
            if (addToast) {
              addToast("Submit Vendor success, We just have sent a link to your Email !", {
                appearance: "success",
                autoDismiss: true,
              });
              setLoadingState();
            }
          }
          else {
            if (addToast) {
              addToast("Email already registered !", {
                appearance: "error",
                autoDismiss: true
              })
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
        }
      }
      else {
        if (addToast) {
          addToast(`Email already registered`, {
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
                router.push(router.route + '#step2')
            }, 1500)
        }
    }, [loading]);
  return (
      <React.Fragment>
    <Form onSubmit={(e) => {
      e.preventDefault();
      createVendor();
    }}>
      <Row>
        <Col lg={12}>
          <div className="section-title--login text-center space-mb--50">
            <h2 className="space-mb--20">Seller Registration</h2>
          </div>
        </Col>

        <Col lg={6} className="space-mb--30">
          <label htmlFor="regFirstName">
            First name <span className="required">*</span>{" "}
          </label>
          <input
            ref={el => ownerRef.current['firstName'] = el}
            type="text"
            required
            name='firstName'
          />
        </Col>

        <Col lg={6} className="space-mb--30">
          <label htmlFor="regLastName">
            Last name <span className="required">*</span>{" "}
          </label>
          <input
            type="text"
            required
            ref={el => ownerRef.current['lastName'] = el}
            name='lastName'
          />
        </Col>

        <Col lg={6} className="space-mb--30">
          <label htmlFor="regEmail">
            Email Address <span className="required">*</span>{" "}
          </label>
          <input
            type="email"
            required
            ref={el => ownerRef.current['email'] = el}
            name='email'
          />
        </Col>
        <Col lg={6} className="space-mb--30">
          <label>Phone number</label>
          <br />
          <input type="text" required  ref={el => ownerRef.current['phone'] = el} name='phone'/>
        </Col>
        <Col lg={12} className="space-mb--30">
          <label>GSTIN ID <span className="required">*</span>{" "}</label>
          <br />
          <input type="text" required ref={el => ownerRef.current['GSTINID'] = el} name='GSTIN'/>
        </Col>
        <Col lg={12} className="space-mb--30">
          <label>State <span className="required">*</span>{" "}</label>
          <br />
          <input type="text" required  ref={el => ownerRef.current['state'] = el} name='state'/>
        </Col>
        {/* <Col lg={12} className="space-mb--30">
        <label>Country</label>
          <br />
          <br />
          <Select
            styles={customStyles}
            options={options}
            defaultValue={{value: 'AF', label: 'Afghanistan'}}
            className="custom-form"
            ref={el => ownerRef.current['countryCode'] = el}
          />
        </Col> */}
        
        <br/>
        <Col lg={12} className="space-mb--30">
          <label>Owner Name <span className="required">*</span>{" "}</label>
          <br />
          <input type="text" required ref={el => ownerRef.current['ownerName'] = el} name='ownerName'/>
        </Col>
        <Col lg={12} className="space-mb--30">
          <label>Owner Email Address <span className="required">*</span>{" "}</label>
          <br />
          <input type="text" required ref={el => ownerRef.current['ownerEmail'] = el} name='ownerEmail'/>
        </Col>
      </Row>
      <Row>
        <Col lg={8}></Col>
        <Col lg={3} className="text-center">
        <button type="submit" className="lezada-button lezada-button--medium"  disabled={disable}>Next</button>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </Form>
    {loading ? (<SpinnerCenter/>): null}
  </React.Fragment>
  );
};

export default OwnerForm;
