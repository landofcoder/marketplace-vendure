import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_AVAILABLE_COUNTRIES } from '@bavaan/graphql/documents.graphql';
import { Collapse, Button, CardBody, Card, CardHeader } from "reactstrap";
import { Container, Row, Col } from "react-bootstrap";
const GuestShippingAddress = ({ setAddressForOrder, activeAddress }) => {
    
    const [addressInput, setAddressInput] = useState({countryCode: 'AF'})
    const [countries, setCountries] = useState([]);

    const addressChangingHandle = (event) => {
        setAddressInput({...addressInput, [event.target.name]: event.target.value});
    };
    
    const availableCountriesRes = useQuery(GET_AVAILABLE_COUNTRIES, {});

    useEffect(() => {
        if ( availableCountriesRes.data && availableCountriesRes.data.availableCountries ) {
            setCountries(availableCountriesRes.data.availableCountries);
        }
    })

    useEffect(() => {
        const newField = 'countryCode';
        if (activeAddress.hasOwnProperty('country') == false) {
            setAddressInput({...addressInput, [newField]: 'AF'})
        }
    })
    return (
        <div className="row card-body">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setAddressForOrder(addressInput)
                  }}
            >
                <div className='row'>

                    {/* FULLNAME */}
                    <div className="col-md-6 col-12 space-mb--20">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name='fullName'
                            value={addressInput.fullName}
                            placeholder="Full Name"
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* PHONE NUMBER */}
                    <div className="col-md-6 col-12 space-mb--20">
                        <label>Phone no</label>
                        <input
                            type="text"
                            placeholder="Phone number"
                            value={addressInput.phoneNumber}
                            name='phoneNumber'
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* COMPANY NAME */}
                    <div className="col-12 space-mb--20">
                        <label>Company Name</label>
                        <input
                            type="text"
                            name='company'
                            value={addressInput.company}
                            placeholder="Company Name"
                            required
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* STREET LINE 1 | STREET LINE 2*/}
                    <div className="col-12 space-mb--20">
                        <label>Street Line*</label>
                        <input
                            type="text"
                            name='streetLine1'
                            value={addressInput.streetLine1}
                            placeholder="Address line 1"
                            required
                            onChange={addressChangingHandle}
                        />
                        <input
                            type="text"
                            name='streetLine2'
                            value={addressInput.streetLine2}
                            placeholder="Address line 2"
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* COUNTRY CODE */}
                    <div className="col-md-6 col-12 space-mb--20">
                        <label>Country</label>
                        <select
                            name='countryCode'
                            value={addressInput.countryCode}
                            required
                            onChange={addressChangingHandle}
                        >
                            {countries.map((item, index) => {
                            return (
                                <option
                                value={item.code}
                                disabled={!item.enabled}
                                key={index}
                                >
                                {item.name}
                                </option>
                            );
                            })}
                        </select>
                    </div>

                    {/* TOWN / CITY */}
                    <div className="col-md-6 col-12 space-mb--20">
                        <label>Town/City</label>
                        <input
                            type="text"
                            name='city'
                            value={addressInput.city}
                            placeholder="Town/City"
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* PROVINCE / STATE */}
                    <div className="col-md-6 col-12 space-mb--20">
                        <label>State</label>
                        <input
                            type="text"
                            name='province'
                            value={addressInput.province}
                            placeholder="State"
                            required
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* POSTAL CODE */}
                    <div className="col-md-6 col-12 space-mb--20">
                        <label>Zip Code*</label>
                        <input
                            type="text"
                            name='postalCode'
                            value={addressInput.postalCode}
                            placeholder="Zip Code"
                            required
                            onChange={addressChangingHandle}
                        />
                    </div>

                    {/* ACTIVE ADDRESS | SUBMIT */}
                    <div className="col-md-12 col-12 space-mb--20">
                        <Button
                            type="submit"
                            className="lezada-button lezada-button--small"
                        >
                            Active new address
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default GuestShippingAddress
