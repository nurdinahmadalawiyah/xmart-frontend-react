import { getDetailCustomer } from "../service/service.js";

export const handleGetProfile = async () => {
    try {
        const qrcode = localStorage.getItem('qrcodeCustomer');
        const response = await getDetailCustomer(qrcode);
        if (response.status === 200) {
            console.log("Data Profile: ", response.data);
            return response.data;
        } else {
            throw new Error("Failed to fetch profile data");
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
