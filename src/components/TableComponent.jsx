import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import {Document} from "react-iconly"

export default function TableComponent ({ columns, rows }) {
    return (
            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows} emptyContent={
                    <div className="flex flex-col justify-center items-center">
                        <Document size="xlarge" />
                        No data to display
                    </div>
                }>
                    {(item) => (
                        <TableRow key={item.key}>
                            {columns.map((column) => (
                                <TableCell key={column.key}>{item[column.key]}</TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
    );
}
