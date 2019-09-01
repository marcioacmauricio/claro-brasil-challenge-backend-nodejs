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


test('Test user 456 request insert device 01', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android01", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  response.assertStatus(200)
})

test('Test user 456 request insert device 02', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android02", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  response.assertStatus(200)
})

test('Test user 456 request insert device 03', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android03", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  let Obj = JSON.parse(response.text)
  DeviceId = Obj.id  
  response.assertStatus(200)
})

test('Test user 456 request insert device 04', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android04", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  response.assertStatus(405)
})

test('Test user 456 request replace device 03', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"replaced_device_id": DeviceId,"user_id": 456, "device_name": "android03", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  response.assertStatus(200)
})

test('Test user 456 request insert device 04 after replace', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android04", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  response.assertStatus(405)
})




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




let Device01, Device02
test('Test user 789 request insert device 01', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 789, "device_name": "android01", "device_model":"Samsung S20", "enable": true}).end()
  let Obj = JSON.parse(response.text)
  // Device01 = Obj.id
  response.assertStatus(200)
})

test('Test user 789 request replace device 02', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"replaced_device_id": Device01,"user_id": 789, "device_name": "android03", "device_model":"Samsung S20", "enable": true}).end()
  let Obj = JSON.parse(response.text)
  Device01 = Obj.id  
  response.assertStatus(200)
  console.log(Device01, Device02)
})


test('Test user 789 request insert device 02', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 789, "device_name": "android02", "device_model":"Samsung S20", "enable": true}).end()
  let Obj = JSON.parse(response.text)
  Device02 = Obj.id  
  response.assertStatus(200)
})

test('Test user 789 delete first device', async ({ client,  assert }) => {
  const response = await client.delete(`device/${Device01}`).header('accept', 'application/json').end()
  let Obj = JSON.parse(response.text)
  assert.equal(Obj.message, 'Device removido com sucesso')
})


test('Test user 789 delete second device', async ({ client,  assert }) => {
  const response = await client.delete(`device/${Device02}`).header('accept', 'application/json').end()
  let Obj = JSON.parse(response.text)
  assert.equal(Obj.message, 'Device removido com sucesso')
})