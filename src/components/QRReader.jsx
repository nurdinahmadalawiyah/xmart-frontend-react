import { useState } from 'react';
import {Button} from "@nextui-org/react";
import QrReader from 'react-qr-reader';

function QRReader(props) {
    const [startScan, setStartScan] = useState(true);
    const [loadingScan, setLoadingScan] = useState(false);
    const [data, setData] = useState("");

    const handleScan = async (scanData) => {
        setLoadingScan(true);
        console.log(`loaded data data`, scanData);
        if (scanData && scanData !== "") {
            console.log(`loaded >>>`, scanData);
            setData(scanData);
            setLoadingScan(false);

            // Mengirim data hasil scan
            if (typeof props.onQRScan === 'function') {
                props.onQRScan(scanData);
            }
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-col md:flex-row justify-center items-center gap-20">
                <div className="flex flex-col items-center space-y-1">
                    {startScan && (
                        <div style={{ width: '300px', height: '300px', borderRadius: '20px', overflow: 'hidden' }}>
                        <QrReader
                            delay={1000}
                            onError={handleError}
                            onScan={handleScan}
                            style={{ width: '300px', height: '300px' }}
                        />
                        </div>
                    )}

                    {loadingScan &&
                        <Button isIconOnly isLoading />
                    }
                </div>
            </div>
        </div>
    );
}

export default QRReader;