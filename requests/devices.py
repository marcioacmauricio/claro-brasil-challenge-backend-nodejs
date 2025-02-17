
requests.post(
	'http://127.0.0.1:3333/device',
	json={
		"user_id": 123, 
		"device_name": "android01", 
		"device_model":"Samsung S20", 
		"enable": True
	},
	headers={
		'content-type': 'application/json'
	}
)
# view
requests.get(
	'http://127.0.0.1:3333/device/1',
	headers={
		'content-type': 'application/json'
	}
)
# list
requests.get(
	'http://127.0.0.1:3333/device',
	headers={
		'content-type': 'application/json'
	}
)
# update
requests.patch(
	'http://127.0.0.1:3333/device/1',
	json={
		"user_id": 123, 
		"device_name": "android01", 
		"device_model":"Samsung S20", 
		"enable": True
	},
	headers={
		'content-type': 'application/json'
	}
)

# view
requests.delete(
	'http://127.0.0.1:3333/device/1',
	headers={
		'content-type': 'application/json'
	}
)