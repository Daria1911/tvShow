const getMostCommonService = (tvShowList) => {
	let servicesMap = new Map();


	for (let elem of tvShowList) {
		if (servicesMap.has(elem.source)) {
			servicesMap.set(elem.source, servicesMap.get(elem.source) + 1)

		} else {
			servicesMap.set(elem.source, 1);
		}
	}

	let maxValue = Math.max(...servicesMap.values());

	return [...servicesMap].find(([key, val]) => val === maxValue)[0]
};


exports.getStreamingService = getMostCommonService;


