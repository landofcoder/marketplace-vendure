import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { Collapse, Button, CardBody, Card, CardHeader } from "reactstrap";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_AVAILABLE_COUNTRIES, GET_ACTIVE_CUSTOMER} from "@bavaan/graphql/documents.graphql";
import {SET_CUSTOMER_FOR_ORDER_VENDORS, SET_SHIPPING_ADDRESS, SET_BILLING_ADDRESS} from '@bavaan/graphql/checkout/checkout-shipping.graphql';
import { convertRefToObject } from '../../../lib/convertRefToObject';
import { useToasts } from "react-toast-notifications";
import { useRouter } from 'next/router';

const Guest = () => {
    const { addToast } = useToasts();
    const currentCustomer = useQuery(GET_ACTIVE_CUSTOMER, {});
    const availableCountriesRes = useQuery(GET_AVAILABLE_COUNTRIES, {});
    const router = useRouter();
    const [setCustomerForOrderVendor] = useMutation(SET_CUSTOMER_FOR_ORDER_VENDORS, {});
    const [setShippingAddress] = useMutation(SET_SHIPPING_ADDRESS, {});
    const [setBillingAddress] = useMutation(SET_BILLING_ADDRESS, {});
    const customerInfoRef = useRef({});
    const shippingInfoRef = useRef({});
    const submitHandle = useCallback(async() => {
        const createAddressInput = convertRefToObject(shippingInfoRef.current);
        const createCustomerInput = convertRefToObject(customerInfoRef.current);
        createAddressInput['fullName'] = createCustomerInput.firstName + ' ' + createCustomerInput.lastName;
        createAddressInput['phoneNumber'] = createCustomerInput.phoneNumber;
        try {
            let setCustomerResponse = null;
            if (currentCustomer.data && currentCustomer.data.activeCustomer === null) {
                setCustomerResponse = await setCustomerForOrderVendor({
                    variables: {
                        input: createCustomerInput
                    }
                });
                if (setCustomerResponse.data && setCustomerResponse.data.setCustomerForOrderVendors)
                    if (addToast)
                        addToast("Set Customer Information Success !", {
                        appearance: "success",
                        autoDismiss: true,
                        });
                else 
                    if (addToast)
                        addToast("Please fill all above fields !", {
                        appearance: "error",
                        autoDismiss: true,
                        });
            }
            if (
                (currentCustomer.data && currentCustomer.data.activeCustomer) ||
                setCustomerResponse != null
            )
            {
                const addressShippingRes = await setShippingAddress({
                    variables: {input: createAddressInput}
                });
                const addressBillingRes = await setBillingAddress({
                    variables: {input: createAddressInput}
                });
                if (addressShippingRes?.data?.setOrderVendorShippingAddress && addressBillingRes?.data?.setOrderVendorBillingAddress) {
                    if (addToast){
                        addToast("Set Address Shipping Success !", {
                            appearance: "success",
                            autoDismiss: true,
                        });
                        addToast("Set Address Billing Success !", {
                            appearance: "success",
                            autoDismiss: true,
                        });
                    }
                    router.push('/other/checkout/cart-total')
                }

            }
        }
        catch(e) {
            if (addToast)
                if(e.message.includes('error.cannot-set-customer-for-order-when-logged-in')){
                    router.push('/customer/login')
                } else {
                    addToast("Please check all params", {
                        appearance: "error",
                        autoDismiss: true,
                    });
                }
        }
    });


    

    return (
        <Card>
            <CardHeader className='border-bottom-0'>
                <div id="billing-form" className="space-mb--40">
                    <h1>
                        Shipping Info
                    </h1>
                </div>
            </CardHeader>
            <Collapse
                className='card-body'
                isOpen
            >
                <form
                    onSubmit = { (event) => {
                        event.preventDefault();
                        submitHandle()
                    } }
                    method="POST"
                >
                    <Row>

                        {/* FIRST NAME */}
                        <div className='col-md-6 col-12 space-mb--20'>
                            <label>First Name*</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                name='firstName'
                                ref={el => customerInfoRef.current['firstName'] = el}
                                defaultValue=
                                {
                                    currentCustomer.data && currentCustomer.data.activeCustomer ?
                                    currentCustomer.data.activeCustomer.firstName :
                                    ''
                                }
                                disabled={currentCustomer.data && currentCustomer.data.activeCustomer ? true : false}
                            />
                        </div>

                        {/* LAST NAME */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>Last Name*</label>
                            <input
                                type="text"
                                name='lastName'
                                placeholder="Last Name"                           
                                ref={el => customerInfoRef.current['lastName'] = el}
                                required
                                defaultValue=
                                {
                                    currentCustomer.data && currentCustomer.data.activeCustomer ?
                                    currentCustomer.data.activeCustomer.lastName :
                                    ''
                                }
                                disabled={currentCustomer.data && currentCustomer.data.activeCustomer ? true : false}
                            />
                        </div>

                        {/* EMAIL */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>Email Address*</label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                name='emailAddress'
                                ref={el => customerInfoRef.current['emailAddress'] = el}
                                required
                                defaultValue=
                                {
                                    currentCustomer.data && currentCustomer.data.activeCustomer ?
                                    currentCustomer.data.activeCustomer.emailAddress :
                                    ''
                                }
                                disabled={currentCustomer.data && currentCustomer.data.activeCustomer ? true : false}
                            />
                        </div>

                        {/* FULLNAME */}

                        {/* PHONE NUMBER */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>Phone no</label>
                            <input
                                type="text"
                                placeholder="Phone number"
                                name='phoneNumber'
                                ref={el => customerInfoRef.current['phoneNumber'] = el}
                                defaultValue=
                                {
                                    currentCustomer.data && currentCustomer.data.activeCustomer ?
                                    currentCustomer.data.activeCustomer.phoneNumber :
                                    ''
                                }
                                disabled={currentCustomer.data && currentCustomer.data.activeCustomer ? true : false}
                            />
                        </div>

                        {/* COMPANY NAME */}
                        <div className="col-12 space-mb--20">
                            <label>Company Name</label>
                            <input
                                type="text"
                                name='company'
                                ref={el => shippingInfoRef.current['company'] = el}
                                placeholder="Company Name"
                                required
                            />
                        </div>

                        {/* STREET LINE 1 | STREET LINE 2*/}
                        <div className="col-12 space-mb--20">
                            <label>Street Line 1*</label>
                            <input
                                type="text"
                                name='streetLine1'
                                placeholder="Address line 1"
                                required
                                ref={el => shippingInfoRef.current['streetLine1'] = el}
                            />
                        </div>
                        <div className="col-12 space-mb--20">
                        <label>Street Line 2</label>
                            <input
                                type="text"
                                name='streetLine2'
                                placeholder="Address line 2"
                                ref={el => shippingInfoRef.current['streetLine2'] = el}
                            />
                        </div>

                        {/* COUNTRY CODE */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>Country</label>
                            <select
                                name='countryCode'
                                defaultValue='AF'
                                required
                                ref={el => shippingInfoRef.current['countryCode'] = el}
                            >
                                {availableCountriesRes.data != null && availableCountriesRes.data.availableCountries ?
                                availableCountriesRes.data.availableCountries.map((item, index) => {
                                    return (
                                        <option
                                            value={item.code}
                                            disabled={!item.enabled}
                                            key={index}
                                        >
                                            {item.name}
                                        </option>
                                    );
                                })
                                : null
                            }
                                
                            </select>
                        </div>

                        {/* TOWN / CITY */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>Town/City</label>
                            <input
                                type="text"
                                name='city'
                                ref={el => shippingInfoRef.current['city'] = el}
                                placeholder="Town/City"
                            />
                        </div>

                        {/* PROVINCE / STATE */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>State</label>
                            <input
                                type="text"
                                name='province'
                                placeholder="State"
                                ref={el => shippingInfoRef.current['province'] = el}
                                required
                            />
                        </div>

                        {/* POSTAL CODE */}
                        <div className="col-md-6 col-12 space-mb--20">
                            <label>Zip Code*</label>
                            <input
                                type="text"
                                name='postalCode'
                                placeholder="Zip Code"
                                required
                                ref={el => shippingInfoRef.current['postalCode'] = el}
                            />
                        </div>

                        {/* ACTIVE ADDRESS | SUBMIT */}
                        <div className="col-md-12 col-12 space-mb--20">
                            <Button
                                type="button"
                                className="lezada-button lezada-button--small"
                                onClick={submitHandle}
                            >
                                Continue
                            </Button>
                        </div>
                    </Row>
                </form>
            </Collapse>
        </Card>
    )
};

export default Guest
