import QrReader from 'react-qr-reader';

export default function QRReader(props) {
    const handleScan = async (scanData) => {
        if (scanData && scanData !== "") {
            if (typeof props.onQRScan === 'function') {
                props.onQRScan(scanData);
            }
        } else {
            console.log("Scan failed or QR code not detected.");
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <div className="flex flex-col items-center space-y-1">
            <div style={{width: '300px', height: '300px', borderRadius: '20px', overflow: 'hidden'}}>
                <QrReader
                    delay={1000}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width: '300px', height: '300px'}}
                />
            </div>
        </div>
    );
}
