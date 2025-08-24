'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('favorites', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      session_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Anonymous session identifier'
      },
      character_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'characters',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add unique constraint to prevent duplicate favorites
    await queryInterface.addIndex('favorites', ['session_id', 'character_id'], {
      unique: true,
      name: 'favorites_session_character_unique'
    });

    // Add index for faster queries
    await queryInterface.addIndex('favorites', ['session_id'], {
      name: 'favorites_session_id_index'
    });

    await queryInterface.addIndex('favorites', ['character_id'], {
      name: 'favorites_character_id_index'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('favorites');
  }
};
