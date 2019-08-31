'use strict'

const Device = use('App/Models/Device')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with devices
 */
class DeviceController {
  /**
   * Show a list of all devices.
   * GET devices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    try {
      const device = await Device.query().fetch() 
      return device
    } catch ( err ){
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }     
  }

  /**
   * Render a form to be used for creating a new device.
   * GET devices/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store ({ request, response }) {
    try {
      const data = request.only(["user_id", "device_name", "device_model", "enable"])
      const device = await Device.create( data )
      return device
    } catch ( err ){
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }  
  }

  /**
   * Display a single device.
   * GET devices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    try {
    const device = await Device.query().where('id', params.id).fetch() 

    if (!device){
      return response.status(404).send({message: "Device not found!"})
    }
    return device
    } catch ( err ){
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }      
  }

  /**
   * Update device details.
   * PUT or PATCH devices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const { user_id, device_name, device_model, enable } = request.all()
      const device = await Device.query().where('id', params.id).first()
      if (!device){
        return response.status(404).send({message: "Nenum registro localizado"})
      }
      device.user_id = user_id
      device.device_name = device_name
      device.device_model = device_model
      device.enable = enable
      await device.save()
      return device 
    } catch ( err ){
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }  
  }

  /**
   * Delete a device with id.
   * DELETE devices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const device = await Device.query().where('id', params.id).first()
      await device.delete()
      return response.status(200).send({message: "Registro Removido"})
    } catch ( err ){
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }         
  }
}

module.exports = DeviceController
