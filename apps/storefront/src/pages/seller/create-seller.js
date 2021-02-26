import React,  { useState } from "react";
import LayoutFive from "../../components/Layout/LayoutFive";
import OwnerForm from "../../components/Seller/OwnerForm";
import ShopInfo from "../../components/Seller/ShopInfo";
import ContactDetails from "../../components/Seller/ContactDetail";
import { Row, Col, Container } from 'react-bootstrap';
import BankingDetail from "../../components/Seller/BankingDetail";
import { useRouter } from 'next/router';
import MarketingContact from "../../components/Seller/MarketingContact";
import StepProgressBar from '../../components/common/StepProgressBar/StepProgressBar';
import { stepsCreateSeller } from "../../lib/create-seller-steps";
import { GET_AVAILABLE_COUNTRIES } from "@bavaan/graphql/documents.graphql";
import { useQuery } from '@apollo/react-hooks';
import formatCountryCode from "../../lib/formatCountryCode";
const CreateSellerNotLoggedIn = () => {
    const availableCountries = useQuery(GET_AVAILABLE_COUNTRIES, {});
    const countries = availableCountries.data && availableCountries.data.availableCountries ?
        formatCountryCode(availableCountries.data.availableCountries) : null;
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "solid 1px",
        borderRadius: "none",
        boxShadow: "none",
        marginTop: "4px"
      }),
    };
    const [vendorId, setVendorId] = useState(null);
    const [brandName, setBrandName] = useState(null);
    const setVendorIdHandle = (id) => {
      if (vendorId != null) {
        setVendorId(id)
      }
    }
    const[step, setStep] = useState(1);
    const transitionStep = () => {
        setStep(prevStep => prevStep + 1)
    }
    const router = useRouter();
    router.push(router.route + `#step${step}`)
  return (
    <LayoutFive>
      {/* breadcrumb */}
      <div style={{display: "flex"}} className="space-mt--r100">
      <StepProgressBar steps={stepsCreateSeller()} activeStep={step}/>
      </div>
      <div className="space-mt--r100 space-mb--r130 bg-color--red">
        <Container>
          <Row className="align-items-center">
            <Col lg={5}>
              <div className="image-cta-two__content space-mb-mobile-only--40">
                
                  {/* <StepProgressBar steps={stepsCreateSeller()} activeStep={step}/> */}
                
                <h2 className="title space-mb--10 text-white">
                  SELLING ON SWARAJSHOP IS EASY!
                </h2>
                <h3 className="space-mb--50 text-white">All you need is:</h3>
                <ul>
                  <li>
                    <p className="text-white"> ✓ VAT Number</p>
                  </li>
                  <li>
                    <p className="text-white"> ✓ PAN Card</p>
                  </li>
                  <li>
                    <p className="text-white"> ✓ Current Account Number</p>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              lg={7}
              className="space-mb-mobile-only--50 space-pt--50 space-pb--50"
            >
              <div className="lezada-form login-form">
                {step == 1 ? (<OwnerForm step={step} transitionStep={transitionStep} vendorId={vendorId} setVendorId={(id) => setVendorId(id)}/>): null}
                {step == 2 ? (<ShopInfo step={step} transitionStep={transitionStep} customStyles={customStyles} countries={countries} vendorId={vendorId} setBrandName={(name) => setBrandName(name)}/>): null}
                {step == 3 ? (<ContactDetails step={step} customStyles={customStyles} countries={countries} transitionStep={transitionStep} vendorId={vendorId}/>): null}
                {step == 4 ? (<MarketingContact vendorId={vendorId} transitionStep={transitionStep} step={step} />): null}
                {step == 5 ? (<BankingDetail step={step} transitionStep={transitionStep} vendorId={vendorId} brandName={brandName}/>): null}
              </div>

            </Col>
          </Row>
          
        </Container>
        
      </div>
    </LayoutFive>
  );
};
export default CreateSellerNotLoggedIn;
