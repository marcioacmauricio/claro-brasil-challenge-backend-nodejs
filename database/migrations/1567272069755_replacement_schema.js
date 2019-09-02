'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReplacementSchema extends Schema {
  up () {
    this.create('replacements', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.integer('current_device_id')
      table.integer('replaced_device_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('replacements')
  }
}

module.exports = ReplacementSchema
