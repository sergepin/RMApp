// Import all models to ensure associations are loaded
import Character from './Character';
import Favorite from './Favorite';
import Comment from './Comment';
import { setupAssociations } from './associations';

// Setup associations
setupAssociations();

// Export all models
export {
    Character,
    Favorite,
    Comment
};

// Export default for convenience
export default {
    Character,
    Favorite,
    Comment
};
