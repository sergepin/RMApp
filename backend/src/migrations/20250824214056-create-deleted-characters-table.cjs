'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deleted_characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      session_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addIndex('deleted_characters', ['session_id']);
    await queryInterface.addIndex('deleted_characters', ['character_id']);
    await queryInterface.addIndex('deleted_characters', ['session_id', 'character_id'], {
      unique: true,
      name: 'deleted_characters_session_character_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deleted_characters');
  }
};
