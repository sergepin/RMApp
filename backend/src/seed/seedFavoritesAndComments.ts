import Favorite from '../models/Favorite';
import Comment from '../models/Comment';

export const seedFavoritesAndComments = async () => {
  try {
    console.log('🌱 Seeding favorites and comments...');

    const sessionIds = [
      'session_user_1',
      'session_user_2',
      'session_user_3'
    ];

    const characterIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const favoritesData = [
      { session_id: 'session_user_1', character_id: 1 },
      { session_id: 'session_user_1', character_id: 3 },
      { session_id: 'session_user_1', character_id: 5 },
      { session_id: 'session_user_2', character_id: 2 },
      { session_id: 'session_user_2', character_id: 4 },
      { session_id: 'session_user_2', character_id: 6 },
      { session_id: 'session_user_3', character_id: 1 },
      { session_id: 'session_user_3', character_id: 7 },
      { session_id: 'session_user_3', character_id: 9 },
    ];

    const commentsData = [
      {
        session_id: 'session_user_1',
        character_id: 1,
        text: 'Rick is absolutely brilliant! Love his scientific approach to everything.',
        author_name: 'Science Fan'
      },
      {
        session_id: 'session_user_1',
        character_id: 1,
        text: 'His catchphrase "Wubba Lubba Dub Dub" is iconic!',
        author_name: 'Science Fan'
      },
      {
        session_id: 'session_user_2',
        character_id: 2,
        text: 'Morty is such a relatable character. His growth throughout the series is amazing.',
        author_name: 'Adventure Seeker'
      },
      {
        session_id: 'session_user_2',
        character_id: 3,
        text: 'Summer is underrated! She brings so much to the family dynamic.',
        author_name: 'Adventure Seeker'
      },
      {
        session_id: 'session_user_3',
        character_id: 1,
        text: 'Rick\'s portal gun is the coolest invention ever!',
        author_name: 'Tech Enthusiast'
      },
      {
        session_id: 'session_user_3',
        character_id: 4,
        text: 'Beth is such a strong character. Love her relationship with Rick.',
        author_name: 'Tech Enthusiast'
      },
      {
        session_id: 'session_user_1',
        character_id: 5,
        text: 'Jerry... well, he tries his best! 😄',
        author_name: 'Science Fan'
      },
      {
        session_id: 'session_user_2',
        character_id: 6,
        text: 'The Citadel of Ricks episode was mind-blowing!',
        author_name: 'Adventure Seeker'
      },
      {
        session_id: 'session_user_3',
        character_id: 7,
        text: 'Evil Morty is such an interesting character. His backstory is fascinating.',
        author_name: 'Tech Enthusiast'
      },
      {
        session_id: 'session_user_1',
        character_id: 8,
        text: 'Bird Person! Need I say more?',
        author_name: 'Science Fan'
      },
    ];

    for (const favoriteData of favoritesData) {
      await Favorite.findOrCreate({
        where: {
          session_id: favoriteData.session_id,
          character_id: favoriteData.character_id
        },
        defaults: favoriteData
      });
    }

    for (const commentData of commentsData) {
      await Comment.create(commentData);
    }

    console.log('✅ Favorites and comments seeded successfully!');
    console.log(`📊 Created ${favoritesData.length} favorites`);
    console.log(`💬 Created ${commentsData.length} comments`);

  } catch (error) {
    console.error('❌ Error seeding favorites and comments:', error);
    throw error;
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedFavoritesAndComments()
    .then(() => {
      console.log('🎉 Seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Seeding failed:', error);
      process.exit(1);
    });
}
