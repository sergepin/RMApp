import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

interface CommentAttributes {
  id: number;
  session_id: string;
  character_id: number;
  text: string;
  author_name?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface CommentCreationAttributes extends Omit<CommentAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public session_id!: string;
  public character_id!: number;
  public text!: string;
  public author_name?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Comment.init(
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
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Comment text content',
    },
    author_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Optional author name for the comment',
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
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['character_id'],
        name: 'comments_character_id_index',
      },
      {
        fields: ['session_id'],
        name: 'comments_session_id_index',
      },
      {
        fields: ['created_at'],
        name: 'comments_created_at_index',
      },
    ],
  }
);

export default Comment;
