import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'contacts',
        href: '/contacts',
    },
];

export default function Contacts() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl font bold'>Contacts</h1>
                    
                    <Link
                        href='contacts/create'    
                        >
                            <Button>
                                <PlusIcon className='w-4 h-4'/>
                                Add Contact
                            </Button>
                    </Link>
                    
                </div>
           </div>
        </AppLayout>
    );
}
