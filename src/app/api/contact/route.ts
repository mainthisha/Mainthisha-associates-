import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, message } = body;

        if (!name || !email || !phone || !message) {
            return NextResponse.json(
                { error: 'Name, email, phone, and message are required fields.' },
                { status: 400 }
            );
        }

        // 1. Save to Database
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone: phone || null,
                message,
            }
        });

        console.log("Contact message saved to database:", contactMessage.id);

        // 2. Attempt to Send Email (if credentials are provided in .env)
        const emailUser = process.env.EMAIL_USER;
        const emailPass = process.env.EMAIL_PASS;

        if (emailUser && emailPass) {
            try {
                // Configure your SMTP transporter
                // By default, this assumes Gmail. If using Yahoo, service should be "yahoo"
                const transporter = nodemailer.createTransport({
                    service: 'gmail', // Change to 'yahoo' or your provider if needed
                    auth: {
                        user: emailUser,
                        pass: emailPass,
                    },
                });

                const mailOptions = {
                    from: emailUser, // Sender address
                    to: 'mainthishaassociate@gmail.com', // Recipient address
                    subject: `New Contact Form Submission from ${name}`,
                    text: `
You have a new message from the Mainthisha Associates website contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
                    `,
                };

                await transporter.sendMail(mailOptions);
                console.log("Email notification sent successfully.");
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError);
                // We don't throw here because the message was already saved to the database.
                // The user's submission is still safe, even if the email failed.
            }
        } else {
            console.log("EMAIL_USER and EMAIL_PASS not found in environment variables. Skipping email notification.");
            console.log("Message was saved to the database successfully.");
        }

        return NextResponse.json({ success: true, id: contactMessage.id }, { status: 201 });

    } catch (error) {
        console.error('Contact Form Error:', error);
        return NextResponse.json(
            { error: 'Failed to process your message. Please try again later.' },
            { status: 500 }
        );
    }
}
