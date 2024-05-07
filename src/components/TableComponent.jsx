import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const TableComponent = ({ columns, rows }) => {
    return (
        // <div style={{ overflowY: 'auto', borderRadius: '20px', maxHeight: 'calc(100vh - 100px)' }}>
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
        // </div>
    );
};

export default TableComponent;
