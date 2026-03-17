import prisma from '@/lib/prisma';

export const revalidate = 0; // Disable static rendering to see new messages immediately

export default async function AdminMessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div className="admin-header">
                <h2>Contact Inquiries & Messages</h2>
                <p>View all messages submitted through the website&apos;s contact form.</p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map(msg => (
                            <tr key={msg.id}>
                                <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                                <td style={{ fontWeight: '500' }}>{msg.name}</td>
                                <td><a href={`mailto:${msg.email}`}>{msg.email}</a></td>
                                <td>{msg.phone || 'N/A'}</td>
                                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={msg.message}>
                                    {msg.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {messages.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                        No messages received yet.
                    </div>
                )}
            </div>
        </div>
    );
}
