const { getStreamingService }  = require ("./function.js");

const express = require("express");
const router = express.Router();
const {list, personData}  = require("./data.js");

router.post('/show/:show/service/:source', (req, res) => {
	let {show, source} = req.params;
	let saveTVShowObj = {
		"id": list.length + 1,
		"name": show,
		"source": source
	};
	list.push(saveTVShowObj);
	res.send(list)
});


router.post('/', (req, res) => {

	let userShowAdded = {
		"id": personData.length + 1,
		"name": req.body.show,
	};

	let filteredObj = list.filter(obj => obj.name === req.body.show);

	userShowAdded["source"] = filteredObj[0].source;
	personData.push(userShowAdded);

	res.send({
		shows: personData,
		mostCommonValue: getStreamingService(personData)
	})
});

module.exports = router;