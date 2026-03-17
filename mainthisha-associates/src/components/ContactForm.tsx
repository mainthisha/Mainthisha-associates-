"use client";

import { useState } from 'react';

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong.");
            }

            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (error: unknown) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again later.");
        }
    };

    if (status === "success") {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h4 style={{ color: 'var(--primary-color)' }}>Message Sent Successfully!</h4>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Thank you for reaching out. We will get back to you as soon as possible.
                </p>
                <button 
                    className="btn btn-outline" 
                    style={{ marginTop: '2rem' }}
                    onClick={() => setStatus("idle")}
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {status === "error" && (
                <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '4px', marginBottom: '1rem' }}>
                    {errorMessage}
                </div>
            )}
            <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" className="form-control" placeholder="Your Name" required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" className="form-control" placeholder="Your Email" required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-control" placeholder="Your Phone" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea id="message" name="message" className="form-control" placeholder="How can we help you?" required rows={4}></textarea>
            </div>
            <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', opacity: status === "submitting" ? 0.7 : 1 }}
                disabled={status === "submitting"}
            >
                {status === "submitting" ? "Sending..." : "Submit Message"}
            </button>
        </form>
    );
}
