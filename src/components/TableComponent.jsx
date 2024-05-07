// components/TableComponent.jsx
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const TableComponent = ({ columns, rows }) => {
    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
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
};

export default TableComponent;
