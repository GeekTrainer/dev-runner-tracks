import { PrismaClient } from "@prisma/client";

const raceList = [
    { name: "Fleet Feet 5K", distance: 3.1 },
    { name: "Whirlwind 10K", distance: 6.2 },
    { name: "Leap Frog 15K", distance: 9.3 },
    { name: "Swift Stream Half Marathon", distance: 13.1 },
    { name: "Thunder Run 20K", distance: 12.4 },
    { name: "Marathon Madness", distance: 26.2 },
    { name: "Speedy Stride 5 Miler", distance: 5 },
    { name: "Turbo Trot 10 Miler", distance: 10 },
    { name: "Swift Surge 15 Miler", distance: 15 },
    { name: "Fast Finish 20 Miler", distance: 20 },
    { name: "Sprint to the Finish 25 Miler", distance: 25 },
    { name: "Jet Jump 30 Miler", distance: 30 },
    { name: "Rapid Rush 5K", distance: 3.1 },
    { name: "Velocity Voyage 10K", distance: 6.2 },
    { name: "Endurance Expedition 15K", distance: 9.3 },
    { name: "Swift Sprint Half Marathon", distance: 13.1 },
    { name: "Burst Blitz 20K", distance: 12.4 },
    { name: "Marathon Mania", distance: 26.2 },
    { name: "Quick Quest 5 Miler", distance: 5 },
    { name: "Tireless Trek 10 Miler", distance: 10 },
    { name: "Vigorous Venture 15 Miler", distance: 15 },
    { name: "Furious Finish 20 Miler", distance: 20 },
    { name: "Sprint Surge 25 Miler", distance: 25 },
    { name: "Mighty Marathon 30 Miler", distance: 30 },
    { name: "Speedy Sizzle 5K", distance: 3.1 },
    { name: "Zooming Zeal 10K", distance: 6.2 },
    { name: "Jubilant Journey 15K", distance: 9.3 },
    { name: "Pace Push Half Marathon", distance: 13.1 },
    { name: "Flash Flood 20K", distance: 12.4 },
    { name: "Marathon Magic", distance: 26.2 },
    { name: "Brisk Blaze 5 Miler", distance: 5 },
    { name: "Eager Expedition 10 Miler", distance: 10 },
    { name: "Rapid Race 15 Miler", distance: 15 },
];

// populate the database using the raceList
async function populateDatabase() {
    const prisma = new PrismaClient();
    for (const data of raceList) {
        await prisma.race.create({ data });
    }
    await prisma.$disconnect();
}

populateDatabase()
    .then(() => {
        console.log('Database populated');
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });