import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log("Starting to seed detailed blog posts...");

    const blogPosts = [
        {
            title: "House Construction Planning: A Step-by-Step Guide",
            content: "Planning is the most critical phase of any residential construction project. It begins with site selection and understanding the local zoning laws. A well-thought-out plan includes detailed architectural drawings, structural engineering assessments, and a comprehensive budget that accounts for materials, labor, and unexpected contingencies.\n\nAt Mainthisha Associates, we always emphasize the importance of a soil test before laying any foundation. This determines the type of foundation required to support the house safely. Furthermore, planning for natural light, ventilation, and energy efficiency during the design phase can save homeowners significant money in the long run. Engaging with experienced contractors early in the process ensures that the transition from blueprint to reality is seamless and hassle-free.",
            author: "Mr. Satheeshkumar",
            imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000" // Architect planning
        },
        {
            title: "The Core of Durability: Structural Strength of Buildings",
            content: "The structural strength of a building defines its lifespan and its ability to withstand natural disasters such as earthquakes and heavy storms. Structural integrity relies heavily on the quality of raw materials used—specifically the grade of cement, the tensile strength of steel rebars, and the water-to-cement ratio in the concrete mix.\n\nModern engineering utilizes advanced software to simulate stress tests on building designs before construction even begins. This ensures that load-bearing walls and columns are placed optimally. We strictly adhere to Indian Standard (IS) codes for all our constructions. Compromising on structural steel or concrete quality might save money in the short term, but it leads to catastrophic failures and expensive repairs in the future. Always build with structural resilience as the top priority.",
            author: "Mainthisha Engineering Team",
            imageUrl: "https://images.unsplash.com/photo-1541888081696-6e1003fa652f?auto=format&fit=crop&q=80&w=1000" // Steel structure
        },
        {
            title: "Pre-Engineered Buildings (PEB): The Future of Industrial Construction",
            content: "Pre-Engineered Buildings (PEBs) are rapidly replacing traditional concrete structures in the industrial sector. A PEB consists of a steel frame engineered and fabricated at a factory, then transported to the site for rapid assembly. This method reduces construction time by up to 50% compared to conventional methods.\n\nBeyond speed, PEBs offer immense flexibility. They allow for clear-span spaces without internal columns, which is ideal for warehouses and large manufacturing units. They are also highly scalable; expanding a PEB is as simple as adding more bays to the existing structure. With superior resistance to extreme weather and lower maintenance costs, it is no surprise that Mainthisha Associates is seeing a massive surge in demand for PEB constructions across Tamil Nadu.",
            author: "Industrial Projects Team",
            imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000" // Industrial warehouse
        },
        {
            title: "Embracing Modern Construction Materials",
            content: "The construction industry is constantly evolving, with new materials being developed to increase durability, sustainability, and aesthetic appeal. Traditional red bricks are rapidly being replaced by Autoclaved Aerated Concrete (AAC) blocks. AAC blocks are lightweight, offer superior thermal insulation, and significantly reduce the dead load on the building's framework.\n\nFurthermore, the use of Ready-Mix Concrete (RMC) ensures consistent quality and speeds up the casting process for large slabs. Waterproofing compounds integrated directly into the cement mix prevent seepage issues that plague older buildings. By adopting these modern building materials, Mainthisha Associates guarantees that our projects are not only structurally sound but also energy-efficient and environmentally conscious.",
            author: "Mr. Satheeshkumar",
            imageUrl: "https://images.unsplash.com/photo-1621619856624-42b10a9f5d34?auto=format&fit=crop&q=80&w=1000" // Modern materials/concrete
        },
        {
            title: "Navigating Commercial Building Construction",
            content: "Constructing a commercial building involves a completely different set of challenges compared to residential projects. Commercial spaces must be designed to handle high foot traffic, adhere to strict fire safety regulations, and provide flexible floor plans that can accommodate diverse business needs (from retail stores to corporate offices).\n\nKey considerations include adequate parking facilities, efficient HVAC (Heating, Ventilation, and Air Conditioning) systems, and robust internet/power infrastructure. Aesthetics play a massive role as the building's facade represents the businesses housed within it. Glass facades and modern composite cladding are popular choices. Our team specializes in delivering commercial complexes that maximize leasable area while adhering strictly to all urban development building codes.",
            author: "Commercial Planning Dept.",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" // Commercial glass facade
        },
        {
            title: "Luxury Villa Design and Strategic Planning",
            content: "Building a luxury villa is an exercise in marrying personalized aesthetic desires with rock-solid engineering. Villa planning often incorporates expansive living areas, double-height ceilings, and seamless integration between indoor and outdoor spaces like patios and private pools.\n\nPrivacy and security are paramount in villa design. From a structural perspective, large open spaces require specialized beam designs to support the load without obstructing the visual flow with excessive pillars. Smart home integration during the wiring phase is becoming standard practice. Whether it's a modern minimalist design or a traditional Kerala-style elevation, executing a villa project requires meticulous attention to the finest finishing details and premium material selection.",
            author: "Mainthisha Architectural Team",
            imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1000" // Luxury residential villa
        },
        {
            title: "The Unseen Hero: Importance of Building Foundation",
            content: "The foundation is arguably the most critical component of any structure, yet it remains completely hidden once the building is complete. Its primary purpose is to safely distribute the weight of the building to the earth below. Without a proper foundation, buildings are susceptible to differential settlement, which causes severe structural cracking and eventually, collapse.\n\nThe type of foundation chosen—whether shallow footings, raft foundations, or deep pile foundations—depends entirely on the soil's load-bearing capacity and the weight of the superstructure. Waterlogging and poor soil compaction are the biggest enemies of foundation integrity. At Mainthisha Associates, we never cut corners on earthwork and foundational concrete. A strong foundation ensures a building can stand strong for generations.",
            author: "Geotechnical Team",
            imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000" // Foundation/Groundwork
        },
        {
            title: "Implementing Sustainable Construction Techniques",
            content: "Sustainability in construction is no longer just a trend; it is an absolute necessity. Green building practices involve optimizing resource utilization, reducing waste, and minimizing the environmental impact throughout a building's lifecycle. This starts with sourcing local materials to reduce transportation emissions and utilizing recycled steel and fly-ash bricks where applicable.\n\nWater conservation techniques such as mandatory rainwater harvesting systems and dual-plumbing for greywater recycling are standard implementations in our modern projects. Designing for passive cooling by strategically orienting the building to maximize cross-ventilation and natural light significantly decreases the operational electricity consumption. Building sustainably not only helps the planet but heavily reduces the long-term maintenance costs for the property owners.",
            author: "Mr. Satheeshkumar",
            imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000" // Green building / Eco house
        }
    ];

    for (const b of blogPosts) {
        await prisma.blogPost.create({ data: b })
    }
    console.log(`Successfully seeded ${blogPosts.length} detailed blog posts.`);
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
