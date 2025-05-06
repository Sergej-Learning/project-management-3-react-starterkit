import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { EditIcon, TrashIcon } from 'lucide-react';
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
interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string;
    due_date: string;
    status: string;
    priority: string;
    progress: number;
    can: {
        update: boolean;
        delete: boolean;
    };
}

interface Task {
    id: number;
    name: string;
    status: string;
    priority: string;
    project_id: number;
    can: {
        update: boolean;
        delete: boolean;
    };
}

export default function ShowProject({ project, tasks }: { project: Project; tasks: Task[] }) {
    const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

    const handleDelete = (taskId: number) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/projects/${project.id}/tasks/${taskId}`, {
                onSuccess: () => {
                    setDeletingTaskId(null);
                },
                onError: () => {
                    alert('Failed to delete the task.');
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project: ${project.name}`} />

            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <h1 className="text-2xl font-bold">{project.name}</h1>
                        {project.can?.update && <Button onClick={() => router.visit(`/projects/${project.id}/tasks/create`)}>Add Task</Button>}
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>
                                            {task.can?.update && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => router.visit(`/projects/${project.id}/tasks/${task.id}/edit`)}
                                                >
                                                    <EditIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                            {task.can?.delete && (
                                                <Button variant="outline" onClick={() => handleDelete(task.id)} disabled={deletingTaskId === task.id}>
                                                    {deletingTaskId === task.id ? 'Deleting...' : 'Delete'}
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
