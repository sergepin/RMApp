'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
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
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: 'Comment text content'
      },
      author_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
        comment: 'Optional author name for the comment'
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

    // Add indexes for faster queries
    await queryInterface.addIndex('comments', ['character_id'], {
      name: 'comments_character_id_index'
    });

    await queryInterface.addIndex('comments', ['session_id'], {
      name: 'comments_session_id_index'
    });

    await queryInterface.addIndex('comments', ['created_at'], {
      name: 'comments_created_at_index'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};
