import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class DeletedCharacter extends Model {
  public id!: number;
  public character_id!: number;
  public session_id!: string;
  public deleted_at!: Date;
}

DeletedCharacter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    character_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'id',
      },
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'deleted_characters',
    timestamps: false,
    indexes: [
      {
        fields: ['session_id'],
      },
      {
        fields: ['character_id'],
      },
      {
        fields: ['session_id', 'character_id'],
        unique: true,
      },
    ],
  }
);

export default DeletedCharacter;
