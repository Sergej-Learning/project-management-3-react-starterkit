import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Projects',
        href: '/projects',
    },
    {
        title: 'Tasks',
        href: '/tasks',
    },
];
interface Task {
    id: number;
    name: string;
    description: string;
    start_date: string;
    due_date: string;
    status: string;
    priority: string;
    progress: string;
    can: {
        update: boolean;
        delete: boolean;
    };
}

export default function Tasks({ tasks, auth }: { tasks: { data: Task[] }; auth: any }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);
    const handleDelete = (id: number) => {
        setDeleteDialogOpen(true);
        setDeleteTaskId(id);
    };
    const handleConfirmDelete = () => {
        router.delete(`/tasks/${deleteTaskId}`);
        setDeleteDialogOpen(false);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="font bold text-2xl">Tasks</h1>

                    {auth.can.tasks.create && (
                        <Link href="tasks/create">
                            <Button>
                                <PlusIcon className="h-4 w-4" />
                                Add new Task
                            </Button>
                        </Link>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <Table>
                                    <TableCaption>Listing of ALL tasks</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Start Date</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Progress</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tasks.data.map((task) => (
                                            <TableRow key={task.id}>
                                                <TableCell>
                                                    <Link href={`/tasks/${task.id}`} className="text-blue-500 hover:underline">
                                                        {task.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{task.description}</TableCell>
                                                <TableCell>{task.start_date}</TableCell>
                                                <TableCell>{task.due_date}</TableCell>
                                                <TableCell>{task.status}</TableCell>
                                                <TableCell>{task.priority}</TableCell>
                                                <TableCell>{task.progress}</TableCell>
                                                <TableCell>
                                                    {task.can.update && (
                                                        <Link href={`/tasks/${task.id}/edit`}>
                                                            <Button variant="outline">
                                                                <EditIcon className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {task.can.delete && (
                                                        <Button variant="outline" onClick={() => handleDelete(task.id)}>
                                                            <TrashIcon className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your Task and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
