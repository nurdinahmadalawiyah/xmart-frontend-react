import {Card, CardHeader, CardBody, Divider, Button} from "@nextui-org/react";
import {User, Discount} from "react-iconly";
import React, {useEffect, useState} from "react";
import QRReader from "../components/QRReader.jsx";
import TableComponent from "../components/TableComponent.jsx";
import {getDetailCustomer, getHistoryTransaction} from "../service/service.js";
import formatCurrency from "../utils/formatCurrency.js";
import formatDate from "../utils/formatDate.js";

export default function ProfilePage() {
    const [scannedData, setScannedData] = useState(null);
    const [detailCustomer, setDetailCustomer] = useState(null);
    const [historyTransaction, setHistoryTransaction] = useState([]);

    const handleGetHistoryTransaction = () => {
        const qrcode = localStorage.getItem('qrcodeCustomer');
        getHistoryTransaction(qrcode).then((response) => {
            if (response.status === 200) {
                console.log("Data History Transaction: ", response.data.data.getTransaksi);
                setHistoryTransaction(response.data.data.getTransaksi)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleGetProfile = () => {
        const qrcode = localStorage.getItem('qrcodeCustomer');
        getDetailCustomer(qrcode).then((response) => {
            if (response.status === 200) {
                console.log("Data Profile: ", response.data);
                setDetailCustomer(response.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const qrCodeCustomer = localStorage.getItem('qrcodeCustomer');
        if (qrCodeCustomer) {
            setScannedData(qrCodeCustomer);
            handleGetProfile();
            handleGetHistoryTransaction();
        }
    }, []);

    useEffect(() => {
        if (scannedData) {
            handleGetProfile();
            handleGetHistoryTransaction();
        }
    }, [scannedData]);

    const handleQRScan = async (data) => {
        try {
            const response = await getDetailCustomer(data);
            if (response.status === 200) {
                localStorage.setItem('qrcodeCustomer', data);
                setScannedData(data);
            } else {
                setScannedData(null);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('qrcodeCustomer');
        setScannedData(null);
        setDetailCustomer(null);
    }

    const rowHistoryTransaction = historyTransaction.map((historyTransaction, index) => ({
        ...historyTransaction,
        no: index + 1,
        key: index.toString(),
        rfid: historyTransaction.rfid,
        namaBarang: historyTransaction.rfid,
        hargaSatuan: formatCurrency(historyTransaction.hargaSatuan),
        total: formatCurrency(historyTransaction.jumlah * historyTransaction.hargaSatuan),
        tanggalJam: formatDate(historyTransaction.tanggalJam)
    }))


    const columnsHistoryTransaction = [
        {key: "no", label: "No"},
        {key: "rfid", label: "RFID"},
        {key: "namaBarang", label: "Product Name"},
        {key: "hargaSatuan", label: "Price"},
        {key: "jumlah", label: "Quantity"},
        {key: "total", label: "Total"},
        {key: "tanggalJam", label: "Date"},
    ];

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-row justify-center items-center gap-20">
                {scannedData ? (
                    <div className="flex gap-8 items-start">
                        <div>
                            <Card className="min-w-[300px] mb-4">
                                <CardHeader className="flex gap-3">
                                    <User/>
                                    <div className="flex flex-col">
                                        <p className="text-xl">Customer Profile</p>
                                    </div>
                                </CardHeader>
                                <Divider/>
                                <CardBody>
                                    {detailCustomer ? (
                                        <>
                                            <p>Name : {detailCustomer.nama}</p>
                                            <br/>
                                            <p>Wallet : {formatCurrency(detailCustomer.wallet)}</p>
                                        </>
                                    ) : (
                                        <Button isLoading/>
                                    )}
                                </CardBody>
                            </Card>
                            <Button color="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                        <Card className="min-w-[300px]">
                            <CardHeader className="flex gap-3">
                                <Discount/>
                                <div className="flex flex-col">
                                    <p className="text-xl">History of Transaction</p>
                                </div>
                            </CardHeader>
                            <Divider/>
                            <TableComponent columns={columnsHistoryTransaction} rows={rowHistoryTransaction}/>
                        </Card>
                    </div>
                ) : (
                    <div className="flex row justify-center items-center gap-20">
                        <h4 className="text-xl">Scan Your Customer QR Code</h4>
                        <QRReader onQRScan={handleQRScan}/>
                    </div>
                )}
            </div>
        </section>
    );
}
