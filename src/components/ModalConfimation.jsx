import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import TableComponent from "./TableComponent.jsx";
import {Ticket} from "react-iconly"
import React, {useEffect, useState} from "react";
import formatCurrency from "../utils/formatCurrency.js";
import {handleGetProfile} from "../handlers/getProfileHandler.js";

export default function ModalConfimation({columns, rows, isOpen, onOpenChange, totalPrice, handleCheckout}) {
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        const fetchData = async (data) => {
            try {
                const dataProfile = await handleGetProfile(data);
                setCustomerData(dataProfile);
            } catch (error) {
                console.error("Failed to fetch customer profile:", error);
            }
        };

        if (totalPrice !== 0) {
            fetchData();
        }
    }, [totalPrice]);

    if (!customerData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Modal className={"dark"} backdrop="transparent" size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-3 items-center">
                                <Ticket/>
                                <div className="flex flex-col">
                                    <p className="text-xl">Checkout</p>
                                </div>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col">
                                    <p className="text-medium">Your Wallet : {formatCurrency(customerData.wallet)}</p>
                                </div>
                                <TableComponent columns={columns} rows={rows}/>
                                <div className="flex flex-col">
                                    <p className="text-lg text-end font-bold">Total Price : {totalPrice}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {rows.length > 0 && (
                                    <div>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            Cancel
                                        </Button>
                                        <Button color="primary" onClick={handleCheckout}>
                                            Confirm
                                        </Button>
                                    </div>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}