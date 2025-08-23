import dotenv from 'dotenv';

dotenv.config();

import axios from 'axios';
import sequelize from '../config/db';
import Character from '../models/Character';

async function seedCharacters() {
    try {
        await sequelize.sync();

        const existingCount = await Character.count();
        if (existingCount > 0) {
            console.log('Characters already seeded, skipping...');
            process.exit(0);
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
        process.exit(0);
    } catch (error) {
        console.error('Error seeding characters:', error);
        process.exit(1);
    }
}

seedCharacters();

