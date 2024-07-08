const { db } = require('@vercel/postgres');
const {
    statements,
    claimants,
    revenue,
    users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedStatements(client) {

}
async function seedUsers(client) {
    
}
async function seedClaimants(client) {
    
}
async function seedRevenue(client) {
    
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedClaimants(client);
    await seedRevenue(client);
    await seedStatements(client);
}