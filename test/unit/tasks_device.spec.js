'use strict'

const { test, trait } = use('Test/Suite')('DeviceTasks')

const Device = use('App/Models/Device')
const Replacement = use('App/Models/Replacement')
let DeviceId = 0

trait('Test/ApiClient')


test('Test delete all devices for test', async ({ client,  assert }) => {
  let all_replacement = await Replacement.query().fetch()
  for (let i in all_replacement.rows){
    let replacement = all_replacement.rows[i]
    await replacement.delete()
  }

  let all_devices = await Device.query().fetch()
  for (let i in all_devices.rows){
    let device = all_devices.rows[i]
    await device.delete()
  }
  let chk_devices = await Device.query().fetch()
  assert.equal(0, chk_devices.rows.length)
})


test('Test request insert device 01', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android01", "device_model":"Samsung S20", "enable": true}).end()
  response.assertStatus(200)
})

test('Test request insert device 02', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android02", "device_model":"Samsung S20", "enable": true}).end()
  response.assertStatus(200)
})

test('Test request insert device 03', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android03", "device_model":"Samsung S20", "enable": true}).end()
  let Obj = JSON.parse(response.text)
  DeviceId = Obj.id  
  response.assertStatus(200)
})

test('Test request insert device 04', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android04", "device_model":"Samsung S20", "enable": true}).end()
  response.assertStatus(405)
})

test('Test request replace device 03', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"replaced_device_id": DeviceId,"user_id": 456, "device_name": "android03", "device_model":"Samsung S20", "enable": true}).end()
  response.assertStatus(200)
})