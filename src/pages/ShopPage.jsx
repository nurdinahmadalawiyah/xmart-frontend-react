import React from 'react';
import QRReader from '../components/QRReader';

export default function ShopPage() {
    const handleQRScan = (data) => {
        console.log("QR code scanned:", data);
        // Lakukan apa pun yang perlu dilakukan dengan data hasil pemindaian QR di sini
    };

    return (
        <section className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-row md:flex-row justify-center items-center gap-20">
                <h4 className="text-xl">Scan Your Customer QR Code</h4>
                <QRReader onQRScan={handleQRScan}/>
            </div>
        </section>
    )
}
