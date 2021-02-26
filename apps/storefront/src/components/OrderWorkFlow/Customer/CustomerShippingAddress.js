import React, { useState, useEffect } from 'react';
import { GET_CUSTOMER_ADDRESSES } from '@bavaan/graphql/documents.graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';
const CustomerShippingAddress = ({ currentCustomer, setAddressForOrder }) => {
    const getActiveCustomerAddress = useQuery(GET_CUSTOMER_ADDRESSES, {});
    const [listCustomerAddress, setListCustomerAddress] = useState([]);
    useEffect(() => {
        if
        (
            getActiveCustomerAddress &&
            getActiveCustomerAddress.data.activeCustomer &&
            getActiveCustomerAddress.data.activeCustomer.addresses
        )

        {
            setListCustomerAddress(getActiveCustomerAddress.data.activeCustomer.addresses);
        }
    })
    return (
        <div className='row card-body'>
            {
                listCustomerAddress.map((address, i) => {
                    return (
                        <div
                            style=
                            {{
                                border: "1px solid",
                                cursor: "pointer",
                            }}
                            onClick={(event) => {
                                setAddressForOrder(address)
                            }}
                            key={i}
                        >
                            <address>
                                <p>
                                    <strong>{address.fullName}</strong>
                                </p>
                                <p>
                                    {address.streetLine1}{" "}
                                    {address.streetLine2}.{" "}
                                    {address.province} ,{" "}
                                    {address.country.name ??
                                    address.country}
                                </p>
                                <p>Mobile: {address.phoneNumber}</p>
                            </address>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CustomerShippingAddress
