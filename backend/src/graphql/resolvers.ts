import { Op } from 'sequelize'
import Character from '../models/Character'
import { timing } from '../decorators/timing'
import { getOrSetCache, buildCacheKey } from '../utils/cache'

class Resolvers {
    @timing
    static async characters(_: any, args: any) {
        const cacheKey = buildCacheKey("characters", args);

        return await getOrSetCache(cacheKey, async () => {
            const filters: any = {};

            if (args.name) filters.name = { [Op.iLike]: `%${args.name}%` };
            if (args.status) filters.status = { [Op.iLike]: args.status };
            if (args.species) filters.species = { [Op.iLike]: args.species };
            if (args.gender) filters.gender = { [Op.iLike]: args.gender };
            if (args.origin) filters.origin = { [Op.iLike]: args.origin };

            return await Character.findAll({ where: filters });
        }, 3600);
    }

    @timing
    static async character(_: any, { id }: { id: number }) {
        const cacheKey = `character:${id}`;
        return await getOrSetCache(cacheKey, async () => {
            return await Character.findByPk(id);
        }, 3600);
    }
}

const resolvers = {
    Query: {
        characters: Resolvers.characters,
        character: Resolvers.character,
    },
};

export default resolvers;
