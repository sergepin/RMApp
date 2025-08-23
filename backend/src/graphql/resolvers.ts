import { Op } from 'sequelize'
import Character from '../models/Character'

class Resolvers {
    static async characters(_: any, args: any) {
        const filters: any = {};

        if (args.name) {
            filters.name = { [Op.iLike]: `%${args.name}%` }
        }
        if (args.status) {
            filters.status = { [Op.iLike]: args.status }
        }
        if (args.species) {
            filters.species = { [Op.iLike]: args.species }
        }
        if (args.gender) {
            filters.gender = { [Op.iLike]: args.gender }
        }
        if (args.origin) {
            filters.origin = { [Op.iLike]: args.origin }
        }

        return await Character.findAll({ where: filters });
    }

    static async character(_: any, { id }: { id: number }) {
        return await Character.findByPk(id);
    }
}

const resolvers = {
    Query: {
        characters: Resolvers.characters,
        character: Resolvers.character,
    },
};

export default resolvers;