import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import { MultiSelect } from './ui/multi-select';

interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    isLoading?: boolean;
}

export function DataTable<TData>({ columns, data, isLoading }: DataTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(() => columns.map((col) => col.id || 'default-id'));

    const filteredData = useMemo(() => {
        if (!globalFilter) return data;
        return data.filter((item) =>
            Object.values(item as Record<string, any>).some((value) =>
                String(value).toLowerCase().includes(globalFilter.toLowerCase())
            )
        );
    }, [data, globalFilter]);

    const filteredColumns = useMemo(() => {
        return columns.filter((col) => visibleColumns.includes(col.id || 'default-id'));
    }, [columns, visibleColumns]);

    const table = useReactTable({
        data: filteredData,
        columns: filteredColumns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Input
                    placeholder="Search..."
                    value={globalFilter ?? ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm"
                />
                <MultiSelect
                    options={columns.map((col) => ({
                        label: typeof col.header === 'string' ? col.header : 'Column',
                        value: col.id || 'default-id',
                    }))}
                    selected={visibleColumns}
                    onChange={(selected) => setVisibleColumns(selected)}
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className="flex items-center cursor-pointer"
                                                onClick={() => {
                                                    const isAsc = sorting.some(
                                                        (sort) => sort.id === header.id && sort.desc === false
                                                    );
                                                    setSorting([{ id: header.id, desc: !isAsc }]);
                                                }}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                <span>
                                                    {sorting.some((sort) => sort.id === header.id)
                                                        ? sorting.find((sort) => sort.id === header.id)?.desc
                                                            ? ' 🔽'
                                                            : ' 🔼'
                                                        : ''}
                                                </span>
                                            </div>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={filteredColumns.length} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={filteredColumns.length} className="text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
            </div>
        </div>
    );
}
