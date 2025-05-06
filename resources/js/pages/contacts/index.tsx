import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { columns } from '../../components/columns';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Contacts',
        href: '/contacts',
    },
];


export default function Contacts({ contacts, auth, isLoading }: { contacts: any[]; auth: any; isLoading: boolean }) {
    const canCreate = auth?.can?.contacts?.create ?? false;
    const canViewAny = auth?.can?.contacts?.viewAny ?? false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Contacts</h1>
                    {canCreate && (
                        <Link href="/contacts/create">
                            <Button>
                                <PlusIcon className="h-4 w-4" />
                                Add Contact
                            </Button>
                        </Link>
                    )}
                </div>
                {canViewAny && (
                    <Card>
                        <CardHeader>
                            <CardTitle>All Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={contacts} isLoading={isLoading} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
