import {Tabs, Tab } from "@nextui-org/react";
import TableComponent from "../components/TableComponent.jsx";
import React, {useEffect, useState} from "react";
import {getCustomers, getProducts} from "../service/service.js";
import QRCode from "qrcode.react";

export default function AdminPage() {
    const [customers, setCustomers] = useState([])
    const [products, setProducts] = useState([])

    let tabs = [
        {
            id: "customer",
            label: "Customer",
        },
        {
            id: "product",
            label: "Product",
        },
        {
            id: "transaction",
            label: "Transaction",
        }
    ];

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
        qrCode: (
            <div className="flex flex-row gap-2 items-center">
                <QRCode size={50} value={customers.qrCode} />
                <p> {customers.qrCode}</p>
            </div>
        )
    }))

    const columnsCustomer = [
        {key: "no", label: "No"},
        {key: "qrCode", label: "QR Code"},
        {key: "nama", label: "Customer Name"},
        {key: "wallet", label: "Wallet"}
    ];

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
        rfid: (
            <div className="flex flex-row gap-2 items-center">
                <QRCode size={50} value={products.rfid}/>
                <p> {products.rfid}</p>
            </div>
        )
    }))

    const columnsProduct = [
        {key: "no", label: "No"},
        {key: "rfid", label: "RFID"},
        {key: "namaBarang", label: "Product Name"},
        {key: "hargaSatuan", label: "Price"},
    ];

    useEffect(() => {
        handleGetCustomers();
        handleGetProducts();
    }, [])

    return (
        <section className="items-center justify-center p-10">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex w-full flex-col">
                    <Tabs color="primary" radius="full" items={tabs}>
                        {(item) => (
                            <Tab key={item.id} title={item.label}>
                                {item.id === "customer" && (
                                    <TableComponent columns={columnsCustomer} rows={rowCustomers}/>
                                )}
                                {item.id === "product" && (
                                    <TableComponent columns={columnsProduct} rows={rowProduct}/>
                                )}
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </div>
        </section>
    )
}