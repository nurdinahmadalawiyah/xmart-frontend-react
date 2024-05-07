import {Tabs, Tab} from "@nextui-org/react";
import React from "react";
import ListCustomers from "../components/ListCustomers.jsx";
import ListProducts from "../components/ListProducts.jsx";
import ListTransactions from "../components/ListTransactions.jsx";

export default function DataPage() {
    let tabs = [
        {id: "customer", label: "Customer"},
        {id: "product", label: "Product"},
        {id: "transaction", label: "Transaction"}
    ];

    return (
        <div className="items-center justify-center p-10 min-h-screen">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex w-full flex-col">
                    <Tabs color="primary" radius="full" items={tabs}>
                        {(item) => (
                            <Tab key={item.id} title={item.label}>
                                {item.id === "customer" && (
                                    <ListCustomers/>
                                )}
                                {item.id === "product" && (
                                    <ListProducts/>
                                )}
                                {item.id === "transaction" && (
                                    <ListTransactions/>
                                )}
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </div>
        </div>
    )
}