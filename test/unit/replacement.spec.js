'use strict'

const { test, trait } = use('Test/Suite')('Replacement')
const Replacement = use('App/Models/Replacement')

trait('Test/ApiClient')

let DeviceId = 0

test('Test insert device to replace', async ({ client,  assert }) => {
  const response = await client.post('device').header('accept', 'application/json').send({"user_id": 456, "device_name": "android01", "device_model":"Samsung S20", "enable": true}).end()
  let Obj = JSON.parse(response.text)
  DeviceId = Obj.id
  response.assertStatus(200)
})
