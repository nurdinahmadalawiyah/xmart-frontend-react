import React, {useEffect, useState} from "react";
import {getCustomers} from "../service/service.js";
import formatCurrency from "../utils/formatCurrency.js";
import TableComponent from "./TableComponent.jsx";

export default function ListCustomers() {
    const [customers, setCustomers] = useState([])

    const handleGetCustomers = () => {
        getCustomers().then((response) => {
            if (response.status === 200) {
                console.log("Data Customers: ", response.data.data);
                setCustomers(response.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const rowCustomers = customers.map((customers, index) => ({
        ...customers,
        no: index + 1,
        key: index.toString(),
        wallet: formatCurrency(customers.wallet),
    }))

    const columnsCustomer = [
        {key: "no", label: "No"},
        {key: "qrCode", label: "QR Code"},
        {key: "nama", label: "Customer Name"},
        {key: "wallet", label: "Wallet"}
    ];

    useEffect(() => {
        handleGetCustomers();
    }, [])

    return (
        <TableComponent columns={columnsCustomer} rows={rowCustomers} />
    )
}