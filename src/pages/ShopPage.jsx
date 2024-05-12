import React, {useEffect, useState} from 'react';
import QRReader from '../components/QRReader';
import TableComponent from "../components/TableComponent.jsx";
import {Button, Card, CardBody, CardHeader, Divider, Input} from "@nextui-org/react";
import {Buy, Delete} from "react-iconly";
import {getDetailCustomer, getDetailProduct, saveTransaction} from "../service/service.js";
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import formatCurrency from "../utils/formatCurrency.js";

export default function ShopPage() {
    const [scannedData, setScannedData] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const qrCodeCustomer = localStorage.getItem('qrcodeCustomer');
        if (qrCodeCustomer) {
            setScannedData(qrCodeCustomer);
        }
    }, []);


    const handleQRScan = async (data) => {
        try {
            const response = await getDetailCustomer(data);
            if (response.status === 200) {
                localStorage.setItem('qrcodeCustomer', data);
                setScannedData(data);
            } else {
                setScannedData(null);
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleQRInputProductScan = async (rfid) => {
        try {
            const response = await getDetailProduct(rfid);
            if (response.status === 200) {
                const product = response.data;
                const existingIndex = cartItems.findIndex(item => item.rfid === product.rfid);
                if (existingIndex !== -1) {
                    const newCartItems = [...cartItems];
                    newCartItems[existingIndex].quantity += 1;
                    setCartItems(newCartItems);
                } else {
                    product.quantity = 1;
                    setCartItems([...cartItems, product]);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleQuantityChange = (index, value) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = value;
        setCartItems(newCartItems);
    }

    const handleDeleteItem = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    const handleCheckout = async () => {
        try {
            const qrcode = scannedData;
            const transaksi = cartItems.map(item => ({
                rfid: item.rfid,
                namaBarang: item.namaBarang,
                hargaSatuan: item.hargaSatuan,
                jumlah: item.quantity
            }));
            const response = await saveTransaction(qrcode, transaksi);
            if(response.status === 200) {
                console.log("Success Checkout")
                setCartItems([]);
            } else {
                console.log("Failed Checkout")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.hargaSatuan * item.quantity;
        });
        return formatCurrency(totalPrice);
    }

    const quantitySchema = Yup.number()
        .typeError('Quantity must be a number')
        .positive('Quantity must be greater than 0')
        .required('Quantity is required');

    const rowCarts = cartItems.map((cartItem, index) => ({
        ...cartItem,
        no: index + 1,
        key: index.toString(),
        hargaSatuan: formatCurrency(cartItem.hargaSatuan),
        jumlah: (
            <div className="flex flex-row gap-2 items-center">
                <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    color="primary"
                    onClick={() => handleQuantityChange(index, Math.max(1, cartItem.quantity - 1))}
                >
                    <b>-</b>
                </Button>
                <Input
                    isDisabled
                    name={`carts.${index}.quantity`}
                    min="1"
                    value={cartItem.quantity}
                    className="max-w-12"
                    onChange={(event) => handleQuantityChange(index, event.target.value)}
                />
                <Button
                    isIconOnly
                    size="sm"
                    variant="bordered"
                    color="primary"  onClick={() => handleQuantityChange(index, cartItem.quantity + 1)}
                >
                    <b>+</b>
                </Button>
            </div>
        ),
        total: formatCurrency(cartItem.hargaSatuan * cartItem.quantity),
        actions: (
            <span className="flex justify-center" onClick={() => handleDeleteItem(index)}>
             <Delete primaryColor="red"/>
            </span>
        )
    }));

    const columnCarts = [
        {
            key: "no",
            label: "No",
        },
        {
            key: "namaBarang",
            label: "Product Name",
        },
        {
            key: "hargaSatuan",
            label: "Price",
        },
        {
            key: "jumlah",
            label: "Quantity",
        },
        {
            key: "total",
            label: "Total",
        },
        {
            key: "actions",
            label: "Actions",
        }
    ];

    return (
        <section className="flex flex-row items-center justify-center gap-4 py-8 md:py-10 h-screen">
            <div className="flex flex-row md:flex-row justify-center items-center gap-20">
                {!scannedData && (
                    <div className="flex row justify-center items-center gap-20">
                        <h4 className="text-xl">Scan Your Customer QR Code</h4>
                        <QRReader onQRScan={handleQRScan}/>
                    </div>
                )}
                {scannedData && (
                    <div className="flex row justify-center items-start gap-20">
                        <div>
                            <QRReader onQRScan={handleQRInputProductScan}/>
                            <h4 className="text-xl text-center mt-4">Scan Product</h4>
                        </div>
                        <div>
                            <Card className="min-w-[300px] mb-4">
                                <CardHeader className="flex gap-3">
                                    <Buy/>
                                    <div className="flex flex-col">
                                        <p className="text-xl">Your Cart</p>
                                    </div>
                                </CardHeader>
                                <Divider/>
                                <Formik
                                    initialValues={{}}
                                    validationSchema={Yup.object().shape({
                                        jumlah: Yup.array().of(quantitySchema)
                                    })}
                                    onSubmit={(values) => {
                                        console.log('Form submitted', values);
                                    }}>
                                    <Form>
                                        <TableComponent columns={columnCarts} rows={rowCarts}/>
                                    </Form>
                                </Formik>
                                <Divider/>
                                <CardBody>
                                    <p className="text-end">Total Price : {calculateTotalPrice()}</p>
                                </CardBody>
                            </Card>
                            <Button color="primary" onClick={handleCheckout}>
                                Checkout
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
