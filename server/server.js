const list = require("./list.js");
const bodyParser = require('body-parser');
const express = require("express");
const saveShow = require("./saveTVShow.js");
const programmingLanguagesRouter = require("../routes/programmingLanguages");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/getlist', list);
app.use('/store-data', saveShow);

app.get("/", (req, res) => {
	res.send({ status: "ok" });
});


app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

