'use strict'

const Device = use('App/Models/Device')
const Replacement = use('App/Models/Replacement')
let moment = require('moment');

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
      const data = request.only(["user_id", "device_name", "device_model", "enable", "replaced_device_id"])
      const devices = await Device.query().where('user_id', data.user_id).fetch() 
      
      if (data.replaced_device_id === undefined){
        if (devices.rows.length >= 3){
          let data_now = moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
          let replacement = await Replacement.query().where('user_id', data.user_id).where('created_at','>=', data_now).first()
          if (replacement !== null){
<<<<<<< HEAD
            let next_replace = moment(replacement.created_at).add(1, 'month').format('DD-MM-YYYY HH:mm:ss')
=======
            let next_replace = moment(replacement.created_at).add(1, 'month').format('DD-MM-YYYY')
>>>>>>> feature/task_006
            return response.status(405).send({status: 1, error: `Você já possue 3 dispositivos cadastrados e uma substituição a menos de 30 dias. Sua próxima substituição é em: ${next_replace}!` })
          } else {
            return response.status(405).send({status: 2, error: "Você já possue 3 dispositivos cadastrados, porém ainda pode substitui "})
          }        
        } else {
          const device = await Device.create( data )
          return device
        }       
      } else {
        let data_now = moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
        let replacement = await Replacement.query().where('user_id', data.user_id).where('created_at','>=', data_now).first()
        if (replacement === null){
          let replaced_device_id = data.replaced_device_id
          delete data['replaced_device_id']
          const device = await Device.create( data )
          let data_replace = { user_id: data.user_id, current_device_id: device.id, replaced_device_id }
          replacement = await Replacement.create(data_replace)
          return device
        } else {
<<<<<<< HEAD
          let next_replace = moment(replacement.created_at).add(1, 'month').format('DD-MM-YYYY HH:mm:ss')
=======
          let next_replace = moment(replacement.created_at).add(1, 'month').format('DD-MM-YYYY')
>>>>>>> feature/task_006
          return response.status(405).send({status: 2, error: `Você já possue 3 dispositivos cadastrados e uma substituição no ultimo mẽs. sua próxima subistituição será em:${next_replace}`})
        }
      }
    } catch ( err ){
      console.log(err.message)
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
    const device = await Device.query().where('id', params.id).first()
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
      return response.status(200).send({message: "Device removido com sucesso"})
    } catch ( err ){
      return response.status(500).send({ error: `Erro: ${err.message}`})
    }         
  }
}

module.exports = DeviceController
