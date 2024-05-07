import axios from "axios";

const BASE_URL = "http://localhost:8080"

export const getCustomers = async () => {
    try {
        return await axios.get(BASE_URL + "/customer");
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async () => {
    try {
        return await axios.get(BASE_URL + "/barang");
    } catch (error) {
        console.log(error)
    }
}

export const getTransactions = async () => {
    try {
        return await axios.get(BASE_URL + "/transaksi");
    } catch (error) {
        console.log(error)
    }
}