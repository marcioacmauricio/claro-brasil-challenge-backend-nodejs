'use strict'

const { test, trait } = use('Test/Suite')('Device')

const Device = use('App/Models/Device')
trait('Test/ApiClient')
let DeviceId = 0


test('Delete all devices for test', async ({ client,  assert }) => {
  let all_devices = await Device.query().fetch()
  for (let i in all_devices.rows){
    let device = all_devices.rows[i]
    await device.delete()
  }
  let chk_devices = await Device.query().fetch()
  assert.equal(0, chk_devices.rows.length)
})



test('Test Request insert device', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 123, "device_name": "android01", "device_model":"Samsung S20", "enable": true}).end()
  console.log(response.text)
  let Obj = JSON.parse(response.text)
  DeviceId = Obj.id
  response.assertStatus(200)
})

test('Test user 123 request get device', async ({ client,  assert }) => {
  const response = await client.get(`device/${DeviceId}`).header('accept', 'application/json').end()
  let Obj = JSON.parse(response.text)
  assert.equal(Obj.id, DeviceId)
})


test('Test update device', async ({ client,  assert }) => {
  const response = await client.patch(`device/${DeviceId}`).header('accept', 'application/json').send({"user_id": 123, "device_name": "android100", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  let Obj = JSON.parse(response.text)
  assert.equal(Obj.id, DeviceId)
  assert.equal(Obj.device_name, 'android100')
})


test('Test user 123 request insert second device to test list', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 123, "device_name": "android01", "device_model":"Samsung S20", "enable": true}).end()
  // console.log(response.text)
  response.assertStatus(200)
})

test('Test user 123 request list devices', async ({ client,  assert }) => {
  const response = await client.get('device').header('accept', 'application/json').end()
  // console.log(response.text)
  let Obj = JSON.parse(response.text)
  assert.equal(Obj.length, 2)
})

test('Test user 123 delete device', async ({ client,  assert }) => {
  const response = await client.delete(`device/${DeviceId}`).header('accept', 'application/json').end()
  // console.log(response.text)
  let Obj = JSON.parse(response.text)
  assert.equal(Obj.message, 'Device removido com sucesso')
})






