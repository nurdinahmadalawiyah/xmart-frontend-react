import {getDetailProduct} from "../service/service.js";

export const handleQRInputProductScan = async (rfid, cartItems, setCartItems, setAlert) => {
    try {
        const response = await getDetailProduct(rfid);
        if (response.status === 200) {
            const product = response.data;
            const existingIndex = cartItems.findIndex(item => item.rfid === product.rfid);
            if (existingIndex !== -1) {
                const newCartItems = [...cartItems];
                newCartItems[existingIndex].quantity += 1;
                setCartItems(newCartItems);
                setAlert({
                    type: 'primary',
                    message: `Success Add ${product.namaBarang} To Cart!`
                });
            } else {
                product.quantity = 1;
                setCartItems([...cartItems, product]);
                setAlert({
                    type: 'primary',
                    message: `Success Add ${product.namaBarang} To Cart!`
                });
            }
        }
    } catch (error) {
        console.log(error)
        setAlert({
            type: 'danger',
            message: "Product Not Found, Please Scan With Correct QR Code!"
        });
    }
}