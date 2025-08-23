import Character from '../models/Character'

const resolvers = {

    Query: {
        characters: async () => {
            return await Character.findAll();
        },
        character: async(_:any, {id}:{id:number}) => {
            return await Character.findByPk(id);
        },
    },
};

export default resolvers;