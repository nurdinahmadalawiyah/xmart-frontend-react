import React, {useEffect, useState} from "react";
import {getTransactions} from "../service/service.js";
import formatCurrency from "../utils/formatCurrency.js";
import formatDate from "../utils/formatDate.js";
import TableComponent from "./TableComponent.jsx";

export default function ListTransactions() {
    const [transactions, setTransactions] = useState([])

    const handleGetTransaction = () => {
        getTransactions().then((response) => {
            if (response.status === 200) {
                console.log("Data Transaction: ", response.data.data);
                setTransactions(response.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const rowTransaction = transactions.map((transactions, index) => ({
        ...transactions,
        no: index + 1,
        key: index.toString(),
        customerName: transactions.customer.nama,
        namaBarang: transactions.barang.namaBarang,
        hargaSatuan: formatCurrency(transactions.hargaSatuan),
        total: formatCurrency(transactions.jumlah * transactions.hargaSatuan),
        tanggalJam: formatDate(transactions.tanggalJam)
    }))

    const columnsTransaction = [
        {key: "no", label: "No"},
        {key: "customerName", label: "Customer Name"},
        {key: "namaBarang", label: "Product Name"},
        {key: "hargaSatuan", label: "Price"},
        {key: "jumlah", label: "Quantity"},
        {key: "total", label: "Total"},
        {key: "tanggalJam", label: "Date"},
    ];

    useEffect(() => {
        handleGetTransaction();
    }, [])

    return (
        <TableComponent columns={columnsTransaction} rows={rowTransaction} />
    )
}