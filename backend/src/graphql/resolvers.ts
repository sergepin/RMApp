import { Op } from 'sequelize'
import Character from '../models/Character'
import Favorite from '../models/Favorite'
import Comment from '../models/Comment'
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

    @timing
    static async favorites(_: any, { session_id }: { session_id: string }) {
        const cacheKey = `favorites:${session_id}`;
        return await getOrSetCache(cacheKey, async () => {
            const favorites = await Favorite.findAll({
                where: { session_id },
                include: [{ model: Character, as: 'character' }]
            });
            return favorites.map(fav => fav.character_id);
        }, 300);
    }

    @timing
    static async isFavorite(_: any, { session_id, character_id }: { session_id: string, character_id: number }) {
        const cacheKey = `isFavorite:${session_id}:${character_id}`;
        return await getOrSetCache(cacheKey, async () => {
            const favorite = await Favorite.findOne({
                where: { session_id, character_id }
            });
            return !!favorite;
        }, 300);
    }

    @timing
    static async comments(_: any, { character_id }: { character_id: number }) {
        const cacheKey = `comments:${character_id}`;
        return await getOrSetCache(cacheKey, async () => {
            return await Comment.findAll({
                where: { character_id },
                order: [['created_at', 'DESC']]
            });
        }, 300);
    }
}

const resolvers = {
    Query: {
        characters: Resolvers.characters,
        character: Resolvers.character,
        favorites: Resolvers.favorites,
        isFavorite: Resolvers.isFavorite,
        comments: Resolvers.comments,
    },
    Mutation: {
        toggleFavorite: async (_: any, { session_id, character_id }: { session_id: string, character_id: number }) => {
            const existing = await Favorite.findOne({
                where: { session_id, character_id }
            });

            if (existing) {
                await existing.destroy();
                return { success: true, isFavorite: false };
            } else {
                await Favorite.create({ session_id, character_id });
                return { success: true, isFavorite: true };
            }
        },

        addComment: async (_: any, { session_id, character_id, text, author_name }: { session_id: string, character_id: number, text: string, author_name?: string }) => {
            const comment = await Comment.create({
                session_id,
                character_id,
                text,
                author_name
            });
            return comment;
        },

        deleteComment: async (_: any, { id, session_id }: { id: number, session_id: string }) => {
            const comment = await Comment.findOne({
                where: { id, session_id }
            });

            if (!comment) {
                throw new Error('Comment not found or not authorized');
            }

            await comment.destroy();
            return { success: true };
        }
    },
};

export default resolvers;
