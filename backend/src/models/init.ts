import Character from './Character';
import Favorite from './Favorite';
import Comment from './Comment';
import DeletedCharacter from './DeletedCharacter';

export function initializeAssociations() {
  console.log('Setting up model associations...');

  Character.hasMany(Favorite, {
    foreignKey: 'character_id',
    as: 'favorites'
  });

  Character.hasMany(Comment, {
    foreignKey: 'character_id',
    as: 'comments'
  });

  Character.hasMany(DeletedCharacter, {
    foreignKey: 'character_id',
    as: 'deletedRecords'
  });

  Favorite.belongsTo(Character, {
    foreignKey: 'character_id',
    as: 'character'
  });

  // Comment associations
  Comment.belongsTo(Character, {
    foreignKey: 'character_id',
    as: 'character'
  });

  // DeletedCharacter associations
  DeletedCharacter.belongsTo(Character, {
    foreignKey: 'character_id',
    as: 'character'
  });

  console.log('✅ Model associations initialized successfully!');
}

// Export models
export {
  Character,
  Favorite,
  Comment,
  DeletedCharacter
};
