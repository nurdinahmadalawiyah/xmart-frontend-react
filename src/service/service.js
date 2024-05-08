import axios from "axios";

const BASE_URL = "http://localhost:8080"
const GRAPHQL_URL = "http://localhost:3000/graphql"

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

export const getDetailCustomer = async (qrcode) => {
    try {
        return await axios.get(BASE_URL + `/customer/${qrcode}`);
    } catch (error) {
        console.log(error)
    }
}

export const getHistoryTransaction = async (qrCode) => {
    const query = `
      query GetTransaksi($qrCode: String!) {
        getTransaksi(qrCode: $qrCode) {
          qrcode
          rfid
          hargaSatuan
          jumlah
          tanggalJam
        }
      }
    `;

    const variables = {
        qrCode: qrCode
    };

    try {
        return await axios.post(GRAPHQL_URL, { query, variables });
    } catch (error) {
        console.log(error)
    }
}