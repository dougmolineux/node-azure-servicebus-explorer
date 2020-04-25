exports.mock = [
	[{
		"_amqpMessage": {
			"delivery_count": 0,
			"delivery_annotations": {},
			"message_annotations": {
				"x-opt-enqueued-time": 1587073665438,
				"x-opt-sequence-number": 5,
				"x-opt-enqueue-sequence-number": 5
			},
			"message_id": "081f17a3b8...1583d35",
			"subject": "Scientist",
			"body": {
				"typecode": 117,
				"content": {
					"type": "Buffer",
					"data": [34, 65, 108, 98, 101, 114, 116, 32, 69, 105, 110, 115, 116, 101, 105, 110, 34]
				}
			}
		},
		"deliveryCount": 0,
		"body": "Albert Einstein",
		"label": "Scientist",
		"messageId": "081f17a3b...35",
		"enqueuedSequenceNumber": 5,
		"sequenceNumber": {
			"low": 5,
			"high": 0,
			"unsigned": false
		},
		"enqueuedTimeUtc": "2020-04-16T21:47:45.438Z",
		"expiresAtUtc": null
	}],
	[{
		"_amqpMessage": {
			"delivery_count": 0,
			"delivery_annotations": {},
			"message_annotations": {
				"x-opt-enqueued-time": 1587073665938,
				"x-opt-sequence-number": 6,
				"x-opt-enqueue-sequence-number": 6
			},
			"message_id": "78db33....a94d",
			"subject": "Scientist",
			"body": {
				"typecode": 117,
				"content": {
					"type": "Buffer",
					"data": [34, 78, 105, 107, 111, 108, 97, 117, 115, 32, 75, 111, 112, 101, 114, 110, 105, 107, 117, 115, 34]
				}
			}
		},
		"deliveryCount": 0,
		"body": "Nikolaus Kopernikus",
		"label": "Scientist",
		"messageId": "78db33a5...baa94d",
		"enqueuedSequenceNumber": 6,
		"sequenceNumber": {
			"low": 6,
			"high": 0,
			"unsigned": false
		},
		"enqueuedTimeUtc": "2020-04-16T21:47:45.938Z",
		"expiresAtUtc": null
	}]
];