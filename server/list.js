const express = require("express");
const router = express.Router();
const {list, services, personData}  = require("./data.js");
const {getStreamingService} = require('./function.js');

router.get('/', (req, res) => {
	res.json({show:list, channels: services});
});


router.get('/userData', (req, res) => {
	res.json({
		userList: personData,
		mostCommonValue: getStreamingService(personData)
	});
});


router.get('/search/:search', (req, res) => {
	let filteredList = list.filter(show => {
		return show.name.toLowerCase().slice(0, req.params.search.length) === req.params.search.toLowerCase()
	});
	res.json({shows: filteredList})
});


module.exports = router;
