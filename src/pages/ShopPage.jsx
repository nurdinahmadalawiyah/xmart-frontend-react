import React, {useEffect, useState} from 'react';
import QRReader from '../components/QRReader';
import TableComponent from "../components/TableComponent.jsx";
import {Button, Card, CardBody, CardHeader, Divider} from "@nextui-org/react";
import {Buy} from "react-iconly";

export default function ShopPage() {
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        const qrCodeCustomer = localStorage.getItem('qrcodeCustomer');
        if (qrCodeCustomer) {
            setScannedData(qrCodeCustomer);
        }
    }, []);

    const handleQRScan = (data) => {
        localStorage.setItem('qrcodeCustomer', data);
        setScannedData(data);
    };

    const rows = [
        {
            key: "1",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            total: "40000000",
        },
    ];

    const columns = [
        {
            key: "rfid",
            label: "RFID",
        },
        {
            key: "namaBarang",
            label: "Product Name",
        },
        {
            key: "hargaSatuan",
            label: "Price",
        },
        {
            key: "jumlah",
            label: "Quantity",
        },
        {
            key: "total",
            label: "Total",
        }
    ];

    return (
        <section className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-row md:flex-row justify-center items-center gap-20">
                {!scannedData && (
                    <div className="flex row justify-center items-center gap-20">
                        <h4 className="text-xl">Scan Your Customer QR Code</h4>
                        <QRReader onQRScan={handleQRScan}/>
                    </div>
                )}
                {scannedData && (
                    <div className="flex row justify-center items-start gap-20">
                        <div>
                            <QRReader/>
                            <h4 className="text-xl text-center mt-4">Scan Product</h4>
                        </div>
                        <div>
                            <Card className="min-w-[300px] mb-4">
                                <CardHeader className="flex gap-3">
                                    <Buy/>
                                    <div className="flex flex-col">
                                        <p className="text-xl">Your Cart</p>
                                    </div>
                                </CardHeader>
                                <Divider/>
                                <TableComponent columns={columns} rows={rows}/>
                                <Divider/>
                                <CardBody>
                                    <p className="text-end">Total Price : Rp. 8000000</p>
                                </CardBody>
                            </Card>
                            <Button color="primary">
                                Checkout
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
