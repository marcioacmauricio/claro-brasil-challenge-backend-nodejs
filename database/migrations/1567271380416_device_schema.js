'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DeviceSchema extends Schema {
  up () {
    this.create('devices', (table) => {
      table.increments()
      table.integer('user_id').unsigned()
      table.string('device_name', 80).notNullable()
      table.string('device_model', 80).notNullable()
      table.boolean('enable').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('devices')
  }
}

module.exports = DeviceSchema
