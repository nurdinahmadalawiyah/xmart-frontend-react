import {Card, CardHeader, CardBody, Divider, Button} from "@nextui-org/react";
import {User, Discount} from "react-iconly";
import React, {useEffect, useState} from "react";
import QRReader from "../components/QRReader.jsx";
import TableComponent from "../components/TableComponent.jsx";

export default function ProfilePage() {
    const [scannedData, setScannedData] = useState(null);

    useEffect(() => {
        const qrCodeCustomer = localStorage.getItem('qrcodeCustomer');
        if (qrCodeCustomer) {
            setScannedData(qrCodeCustomer);
        }
    }, []);

    const handleQRScan = (data) => {
        console.log("QR code scanned:", data);
        localStorage.setItem('qrcodeCustomer', data);
        setScannedData(data);
    };

    const handleLogout = () => {
        localStorage.removeItem('qrcodeCustomer');
        setScannedData(null);
    }

    const rows = [
        {
            key: "1",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "2",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "3",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "4",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "5",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "6",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "7",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "8",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "9",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
        {
            key: "10",
            rfid: "123456789012",
            namaBarang: "Smartphone",
            hargaSatuan: "8000000",
            jumlah: "5",
            tanggalJam: "2024-05-03 16:39:36.694",
        },
    ];

    const columns = [
        {
            key: "rfid",
            label: "RFID",
        },
        {
            key: "namaBarang",
            label: "Nama Barang",
        },
        {
            key: "hargaSatuan",
            label: "Harga Satuan",
        },
        {
            key: "jumlah",
            label: "Jumlah",
        },
        {
            key: "tanggalJam",
            label: "Tanggal Jam",
        }
    ];

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-row justify-center items-center gap-20">
                {!scannedData && (
                    <div className="flex row justify-center items-center gap-20">
                        <h4 className="text-xl">Scan Your Customer QR Code</h4>
                        <QRReader onQRScan={handleQRScan}/>
                    </div>
                )}
                {scannedData && (
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
                                    <p>Name : Nurdin A. Alawiyah</p>
                                    <br/>
                                    <p>Wallet : Rp. 360000</p>
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
                                <TableComponent columns={columns} rows={rows}/>
                            </Card>
                    </div>
                )}
            </div>
        </section>
    );
}
