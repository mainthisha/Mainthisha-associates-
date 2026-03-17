import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Seed Testimonials
    const testimonials = [
        {
            clientName: "Ramesh Kumar",
            projectRef: "Industrial Construction Project",
            review: "Mainthisha Associates delivered our heavy structural steel manufacturing facility on time and well within the budget. Their engineering team showed great expertise and professionalism throughout the process.",
            rating: 5,
        },
        {
            clientName: "Lakshmi Narayanan",
            projectRef: "Heritage Building Renovation",
            review: "We were worried about renovating a 100-year-old building, but Mr. Satheeshkumar and his team handled the restoration beautifully. The structural safety is now top-notch while keeping the original aesthetics.",
            rating: 5,
        },
        {
            clientName: "Vijay Anand",
            projectRef: "Residential Apartment Development",
            review: "From planning to execution, everything was seamless. The quality of materials used and the structural integrity of our new apartment complex are truly commendable.",
            rating: 4,
        }
    ];

    for (const t of testimonials) {
        await prisma.testimonial.create({ data: t })
    }
    console.log('Seeded testimonials.');

    // Seed Blog Posts
    const blogPosts = [
        {
            title: "Future of PEB (Pre-Engineered Buildings) in India",
            content: "Pre-Engineered Buildings (PEBs) are revolutionizing the construction industry, especially for industrial and commercial projects. Their fast turnaround time, cost-effectiveness, and structural durability make them the preferred choice for massive warehouses and manufacturing facilities. At Mainthisha Associates, we are leading the way in PEB constructions across Tamil Nadu.",
            author: "Mr. Satheeshkumar",
        },
        {
            title: "Why Structural Integrity Matters More Than Aesthetics",
            content: "While a beautiful design is important, the true value of any building lies in its structural integrity. Choosing the right rebars, the optimal concrete mix, and employing advanced engineering techniques ensure your building stands tall against time and natural elements. Always prioritize strength before style.",
            author: "Mainthisha Engineering Team",
        },
        {
            title: "Restoration Techniques for Heritage Sites",
            content: "Renovating a heritage building requires a delicate balance between modern engineering and historical preservation. With over 15 years of experience, we specialize in modern reinforcement techniques that protect and elongate the lifespan of a structure without compromising its architectural essence.",
            author: "Mainthisha Architectural Team",
        }
    ];

    for (const b of blogPosts) {
        await prisma.blogPost.create({ data: b })
    }
    console.log('Seeded blog posts.');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
