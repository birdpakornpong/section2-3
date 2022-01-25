const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const port = 3000

app.use(express.json())

app.use('/', async (req, res) => {
    try {
        const data = await axios.get('https://codequiz.azurewebsites.net/')
        if (data.status !== 200) {
            return res.status(data.status).send({
                message: "invalid"
            })
        }

        const html = await data.data
        const $ = cheerio.load(html)
        const result = Array.from($('body')).map((element) => ({
            name: $(element).find('p:nth-child(3)').text().trim()
        })) || []
        console.log('result', result)
        return res.status(200).send({
            result
        })

    } catch (err) {
        console.log('err',err)
    }
  })

let data = [
    { name: "B-INCOMESSF", value: "10.0548" },
    { name: "BM70SSF", value: "9.9774" },
    { name: "BEQSSF", value: "11.247" },
    { name: "B-FUTURESSF", value: "11.443" }
]
let text = process.argv[2]
data.filter((d) => {
    return d.name == text
})
let textReturn = data[0].value || "ไมพบ"

app.listen(port, () => {
  console.log(`${textReturn}`)
})