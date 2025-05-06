import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { SortingState } from '@tanstack/react-table';

// Updated the columns to include sorting and filtering capabilities.
export const columns: ColumnDef<any>[] = [
    {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        enableSorting: true,
        sortingFn: 'basic',
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
        sortingFn: 'basic',
    },
    {
        id: 'email',
        accessorKey: 'email',
        header: 'Email',
        enableSorting: true,
        sortingFn: 'basic',
    },
    {
        id: 'mobile',
        accessorKey: 'mobile',
        header: 'Mobile',
        enableSorting: true,
        sortingFn: 'basic',
    },
    {
        id: 'address',
        accessorKey: 'address',
        header: 'Address',
        enableSorting: true,
        sortingFn: 'basic',
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const contact = row.original;
            return (
                <div className="flex space-x-2">
                    <Link href={`/contacts/${contact.id}/details`}>
                        <Button variant="outline" size="sm">
                            View Details
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];
