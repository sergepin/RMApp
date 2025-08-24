import dotenv from 'dotenv';

dotenv.config();

import axios from 'axios';
import sequelize from '../config/db';
import Character from '../models/Character';
import { seedFavoritesAndComments } from './seedFavoritesAndComments';

async function seedCharacters() {
    try {
        await sequelize.sync();

        const existingCount = await Character.count();
        if (existingCount > 0) {
            console.log('Characters already seeded, skipping...');
            return;
        }

        const { data } = await axios.get('https://rickandmortyapi.com/api/character');
        const characters = data.results.slice(0, 15);

        const mapped = characters.map((character: any) => ({
            id: character.id,
            name: character.name,
            species: character.species,
            status: character.status,
            gender: character.gender,
            origin: character.origin?.name || 'Unknown',
            image: character.image,
        }));

        await Character.bulkCreate(mapped);

        console.log('Characters seeded successfully');
    } catch (error) {
        console.error('Error seeding characters:', error);
        throw error;
    }
}

async function runAllSeeds() {
    try {
        console.log('🌱 Starting database seeding...');
        
        await seedCharacters();
        
        await seedFavoritesAndComments();
        
        console.log('✅ All seeds completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('💥 Seeding failed:', error);
        process.exit(1);
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    runAllSeeds();
}

