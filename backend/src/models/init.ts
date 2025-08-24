import Character from './Character';
import Favorite from './Favorite';
import Comment from './Comment';

// Initialize associations after all models are defined
export function initializeAssociations() {
  console.log('🔗 Setting up model associations...');
  
  // Character associations
  Character.hasMany(Favorite, {
    foreignKey: 'character_id',
    as: 'favorites'
  });

  Character.hasMany(Comment, {
    foreignKey: 'character_id',
    as: 'comments'
  });

  // Favorite associations
  Favorite.belongsTo(Character, {
    foreignKey: 'character_id',
    as: 'character'
  });

  // Comment associations
  Comment.belongsTo(Character, {
    foreignKey: 'character_id',
    as: 'character'
  });

  console.log('✅ Model associations initialized successfully!');
}

// Export models
export {
  Character,
  Favorite,
  Comment
};
