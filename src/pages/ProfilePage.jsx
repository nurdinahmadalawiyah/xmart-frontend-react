import {Card, CardHeader, CardBody, Divider, Button} from "@nextui-org/react";
import {User, Discount} from "react-iconly";
import React, {useEffect, useState} from "react";
import QRReader from "../components/QRReader.jsx";
import TableComponent from "../components/TableComponent.jsx";
import {getHistoryTransaction} from "../service/service.js";
import formatCurrency from "../utils/formatCurrency.js";
import formatDate from "../utils/formatDate.js";
import Alert from "../components/Alert.jsx";
import {handleQRScanCustomer} from "../handlers/qrScanCustomerHandlers.js";
import {handleGetProfile} from "../handlers/getProfileHandler.js";

export default function ProfilePage() {
    const [scannedData, setScannedData] = useState(null);
    const [detailCustomer, setDetailCustomer] = useState(null);
    const [historyTransaction, setHistoryTransaction] = useState([]);
    const [alert, setAlert] = useState({
        type: null,
        message: null
    });

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

    const handleProfile = async (data) => {
        const dataProfile = await handleGetProfile(data);
        setDetailCustomer(dataProfile);
    }

    useEffect(() => {
        const qrCodeCustomer = localStorage.getItem('qrcodeCustomer');
        if (qrCodeCustomer) {
            setScannedData(qrCodeCustomer);
            handleProfile().then(r => console.log(r))
            handleGetHistoryTransaction();
        }
    }, []);

    useEffect(() => {
        if (scannedData) {
            handleProfile().then(r => console.log(r))
            handleGetHistoryTransaction();
        }
    }, [scannedData]);

    const handleCustomerDataQRScan = async (data) => {
        await handleQRScanCustomer(data, setScannedData, setAlert);
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

    const handleCloseAlert = () => {
        setAlert({message: ''});
    }

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
                        <QRReader onQRScan={handleCustomerDataQRScan}/>
                    </div>
                )}
            </div>
            <Alert message={alert.message} onClose={handleCloseAlert} type={alert.type}/>
        </section>
    );
}
