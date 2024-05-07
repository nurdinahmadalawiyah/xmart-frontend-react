import React, {useEffect, useState} from "react";
import {getProducts} from "../service/service.js";
import formatCurrency from "../utils/formatCurrency.js";
import TableComponent from "./TableComponent.jsx";

export default function ListProducts() {
    const [products, setProducts] = useState([])

    const handleGetProducts = () => {
        getProducts().then((response) => {
            if (response.status === 200) {
                console.log("Data Products: ", response.data.data);
                setProducts(response.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const rowProduct = products.map((products, index) => ({
        ...products,
        no: index + 1,
        key: index.toString(),
        hargaSatuan: formatCurrency(products.hargaSatuan),
    }))

    const columnsProduct = [
        {key: "no", label: "No"},
        {key: "rfid", label: "RFID"},
        {key: "namaBarang", label: "Product Name"},
        {key: "hargaSatuan", label: "Price"},
    ];

    useEffect(() => {
        handleGetProducts();
    }, [])

    return (
        <TableComponent columns={columnsProduct} rows={rowProduct} />
    )
}