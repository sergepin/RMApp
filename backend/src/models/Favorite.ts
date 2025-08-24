import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

interface FavoriteAttributes {
  id: number;
  session_id: string;
  character_id: number;
  created_at?: Date;
  updated_at?: Date;
}

interface FavoriteCreationAttributes extends Omit<FavoriteAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Favorite extends Model<FavoriteAttributes, FavoriteCreationAttributes> implements FavoriteAttributes {
  public id!: number;
  public session_id!: string;
  public character_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Anonymous session identifier',
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'id',
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'favorites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['session_id', 'character_id'],
        name: 'favorites_session_character_unique',
      },
      {
        fields: ['session_id'],
        name: 'favorites_session_id_index',
      },
      {
        fields: ['character_id'],
        name: 'favorites_character_id_index',
      },
    ],
  }
);

export default Favorite;
