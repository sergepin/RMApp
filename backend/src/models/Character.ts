import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';   

class Character extends Model {
    public id!: number;
    public name!: string;
    public species!: string;
    public status!: string;
    public gender!: string;
    public origin!: string;
    public image!: string;
}

Character.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    species: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    gender: {
        type: DataTypes.STRING,
    },
    origin: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
},
{
    sequelize,
    modelName: 'Character',
    tableName: 'characters',
    timestamps: false, // Disable createdAt and updatedAt fields
}
)

export default Character;