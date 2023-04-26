const config = require("./config");

const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getColors(msg) {
    const prompt = `
        You are a color palette generating assistant that respoends to text prompts for color palettes
        You should generate color palettes that fit the theme, mood, or instructions in the prompt.
        The palettes should be between 2 to 8 colors.
        The colors in the palette should not repeat.

        Q: Convert the following verbal description of a color palette into a list of colors: The Mediterranean Sea
        A: '#00669','#66CCC','F0E68C','#008000','F08080'

        Desired Format: a list of hexadecimal color codes seperated by commas   

        Q: Convert the following verbal description of a color palette into a list of colors: ${msg}
        A:
        `;
    const res = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 100,
    });
    return res.data.choices[0].text.trim().replaceAll("'", "");
}

app.post("/color-palette", async (req, res) => {
    const { data } = req.body;
    const response = await getColors(data);
    const colors = response.split(",");
    res.json(colors);
});

app.get("/", async (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:3000`);
    // console.log(
    //     `Example app listening at http://${config.express.ip}:${config.express.port}`
    // );
});
