import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const projects = [
        {
            name: 'Unicorn Valves Private Limited',
            type: 'Industrial Construction Project',
            location: 'Nachipalayam, Coimbatore, Tamil Nadu',
            description: 'An industrial construction project involving a large-scale heavy structural steel fabrication building designed to support industrial manufacturing operations. The project includes robust structural frameworks, high load-bearing capacity, and optimized industrial layout planning to ensure operational efficiency and long-term durability.',
            imageUrl: '/placeholder-industrial.jpg'
        },
        {
            name: 'Krishnan Temple',
            type: 'Religious Infrastructure Project',
            location: 'Ooty, Tamil Nadu',
            description: 'A fully concrete constructed temple designed with traditional architectural elements while ensuring modern structural strength and durability. The temple structure was built to withstand the climatic conditions of the hill region while preserving the spiritual and cultural aesthetics of the sacred space.',
            imageUrl: '/placeholder-temple.jpg'
        },
        {
            name: 'Heritage Building Renovation',
            type: 'Restoration and Renovation Project',
            location: 'Ooty, Tamil Nadu',
            description: 'A renovation project involving the restoration of a heritage building that is more than 100 years old. The work focused on preserving the historical architectural character of the structure while strengthening the building with modern reinforcement techniques to ensure structural safety and longevity.',
            imageUrl: '/placeholder-renovation.jpg'
        },
        {
            name: 'Coir Industry Manufacturing Unit',
            type: 'Industrial PEB Construction',
            location: 'Pollachi, Coimbatore, Tamil Nadu',
            description: 'A Pre-Engineered Building constructed for a coir manufacturing facility. The project includes a spacious industrial layout designed for large-scale production, efficient ventilation systems, and durable steel framework suitable for industrial manufacturing operations.',
            imageUrl: '/placeholder-peb.jpg'
        },
        {
            name: 'Residential Apartment Development',
            type: 'Residential Construction',
            location: 'Singanallur, Coimbatore, Tamil Nadu',
            description: 'A large residential apartment project spanning approximately 45000 square feet designed for modern urban living with strong reinforced concrete structure and efficient architectural planning.',
            imageUrl: '/placeholder-residential.jpg'
        },
        {
            name: 'Commercial Complex Development',
            type: 'Commercial Building Construction',
            location: 'Karumathampatti, Coimbatore, Tamil Nadu',
            description: 'A commercial complex designed to accommodate multiple business spaces and retail units, focusing on structural durability and optimized commercial infrastructure.',
            imageUrl: '/placeholder-commercial.jpg'
        }
    ]

    for (const p of projects) {
        await prisma.project.create({ data: p })
    }

    console.log('Seeded projects successfully.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
