import prisma from '@/lib/prisma';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';

export const metadata = {
    title: 'Manage Projects | Admin CMS',
};

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    });

    async function deleteProject(formData: FormData) {
        'use server';
        const id = formData.get('id') as string;
        await prisma.project.delete({ where: { id } });
        revalidatePath('/admin/projects');
        revalidatePath('/projects');
    }

    return (
        <div>
            <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>Manage Projects</h1>
                    <p>Add, edit, or remove company projects.</p>
                </div>
                <Link href="/admin/projects/new" className="admin-btn">Add New Project</Link>
            </div>

            <div className="admin-panel">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Location</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td><strong>{project.name}</strong></td>
                                <td>{project.type}</td>
                                <td>{project.location}</td>
                                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <form action={deleteProject} style={{ display: 'inline' }}>
                                        <input type="hidden" name="id" value={project.id} />
                                        <button type="submit" className="admin-btn admin-btn-danger">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No projects found. Add one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
