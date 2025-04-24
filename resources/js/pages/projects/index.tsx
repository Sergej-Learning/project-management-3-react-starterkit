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
];
interface Project {
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

export default function Projects({ projects, auth }: { projects: { data: Project[] }; auth: any }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
    const handleDelete = (id: number) => {
        setDeleteDialogOpen(true);
        setDeleteProjectId(id);
    };
    const handleConfirmDelete = () => {
        router.delete(`/projects/${deleteProjectId}`);
        setDeleteDialogOpen(false);
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="font bold text-2xl">Projects</h1>

                    {auth.can.projects.create && (
                        <Link href="projects/create">
                            <Button>
                                <PlusIcon className="h-4 w-4" />
                                Add new Project
                            </Button>
                        </Link>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>All Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                <Table>
                                    <TableCaption>Listing of ALL projects</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Beschreibung</TableHead>
                                            <TableHead>Startdatum</TableHead>
                                            <TableHead>Enddatum</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Priorität</TableHead>
                                            <TableHead>Fortschritt</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projects.data.map((project) => (
                                            <TableRow key={project.id}>
                                                <TableCell className="font-medium">{project.id}</TableCell>
                                                <TableCell>{project.name}</TableCell>
                                                <TableCell>{project.description}</TableCell>
                                                <TableCell>{project.start_date}</TableCell>
                                                <TableCell>{project.due_date}</TableCell>
                                                <TableCell>{project.status}</TableCell>
                                                <TableCell>{project.priority}</TableCell>
                                                <TableCell>{project.progress}</TableCell>

                                                <TableCell>
                                                    {project.can.update && (
                                                        <Link href={`/projects/${project.id}/edit`}>
                                                            <Button variant="outline">
                                                                <EditIcon className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                    {project.can.delete && (
                                                        <Button variant="outline" onClick={() => handleDelete(project.id)}>
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
                                This action cannot be undone. This will permanently delete your Project and remove your data from our servers.
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
