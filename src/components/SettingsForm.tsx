'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SettingsFormProps {
    initialUser: {
        name: string | null;
        email: string;
    };
}

export default function SettingsForm({ initialUser }: SettingsFormProps) {
    const router = useRouter();
    const [name, setName] = useState(initialUser.name || '');
    const [email, setEmail] = useState(initialUser.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage(null);

        if (password) {
            if (password.length < 8) {
                setMessage({ type: 'danger', text: 'Password must be at least 8 characters long.' });
                return;
            }
            if (password !== confirmPassword) {
                setMessage({ type: 'danger', text: 'Passwords do not match.' });
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/auth/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage({ type: 'danger', text: data.error || 'Failed to update settings.' });
                setIsSubmitting(false);
                return;
            }

            setMessage({ type: 'success', text: 'Account settings updated successfully.' });
            setPassword('');
            setConfirmPassword('');
            setIsSubmitting(false);

            router.refresh();
        } catch (err) {
            console.error('Settings form error:', err);
            setMessage({ type: 'danger', text: 'An unexpected error occurred. Please try again.' });
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {message && (
                <div
                    className={`login-alert login-alert-${message.type}`}
                    style={{
                        padding: '1rem',
                        borderRadius: '6px',
                        marginBottom: '1.5rem',
                        fontSize: '0.95rem',
                        backgroundColor: message.type === 'success' ? 'rgba(40, 167, 69, 0.15)' : 'rgba(220, 53, 69, 0.15)',
                        border: `1px solid ${message.type === 'success' ? 'rgba(40, 167, 69, 0.3)' : 'rgba(220, 53, 69, 0.3)'}`,
                        color: message.type === 'success' ? '#28a745' : '#dc3545',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                    }}
                >
                    <span>{message.type === 'success' ? '✓' : '⚠'}</span>
                    <span>{message.text}</span>
                </div>
            )}

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #cbd5e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        color: '#333',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #cbd5e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        color: '#333',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div style={{ margin: '2.5rem 0 1.5rem 0', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', margin: '0 0 0.5rem 0', color: '#0F2027', fontWeight: '700' }}>Update Password</h3>
                <p style={{ fontSize: '0.85rem', color: '#718096', margin: '0' }}>Leave these fields blank if you do not want to change your password.</p>
            </div>

            <div className="form-group grid grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div>
                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: '1px solid #cbd5e0',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            color: '#333',
                            outline: 'none'
                        }}
                        placeholder="Min 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>Confirm New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: '1px solid #cbd5e0',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            color: '#333',
                            outline: 'none'
                        }}
                        placeholder="Match password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    type="submit"
                    className="admin-btn"
                    disabled={isSubmitting}
                    style={{
                        padding: '0.75rem 1.75rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        background: '#0F2027',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {isSubmitting ? 'Saving Changes...' : 'Save Settings'}
                </button>
            </div>
        </form>
    );
}
