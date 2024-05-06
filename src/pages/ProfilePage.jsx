import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {User} from "react-iconly";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import {useState} from "react";
import QRReader from "../components/QRReader.jsx";

export default function ProfilePage() {
    const [scannedData, setScannedData] = useState(null);

    const handleQRScan = (data) => {
        console.log("QR code scanned:", data);
        setScannedData(data);
    };

    const rows = [
        {
            key: "1",
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
                    <div className="flex flex row justify-center items-center gap-20">
                        <h4 className="text-xl">Scan Your Customer QR Code</h4>
                        <QRReader onQRScan={handleQRScan}/>
                    </div>
                )}
                {scannedData && (
                    <Card className="max-w-[800px]">
                        <CardHeader className="flex gap-3">
                            <User/>
                            <div className="flex flex-col">
                                <p className="text-xl">Customer Profile</p>
                            </div>
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <p>Name : </p>
                            <p>Wallet : </p>
                        </CardBody>
                        <Divider/>
                        <CardFooter className="flex flex-col items-center">
                            <p>History of transactions : </p>
                            <br/>
                            <Table aria-label="Example table with dynamic content">
                                <TableHeader columns={columns}>
                                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                </TableHeader>
                                <TableBody items={rows}>
                                    {(item) => (
                                        <TableRow key={item.key}>
                                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </section>
    );
}
