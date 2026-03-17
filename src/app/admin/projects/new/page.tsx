import NewProjectForm from '@/components/NewProjectForm';

export const metadata = {
    title: 'Add New Project | Admin CMS',
};

export default function NewProjectPage() {

    return (
        <div>
            <div className="admin-header">
                <h1>Add New Project</h1>
                <p>Create a new project to display in the public portfolio.</p>
            </div>

            <div className="admin-panel" style={{ maxWidth: '800px' }}>
                <NewProjectForm />
            </div>
        </div>
    );
}
