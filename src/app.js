import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(express.json())

const user = []
const tweets = []


app.post('/sign-up', (req, res) => {

    const { username, avatar } = req.body

    if (!username || typeof username !== "string" || !avatar || typeof avatar !== "string") {
        return res.status(400).send("Todos os campos são obrigatorios!!")
    }

    user.push({ username, avatar })

    res.send("OK")
})

app.post('/tweets', (req, res) => {

    const { username, tweet } = req.body

    if (!username || typeof username !== "string" || !tweet || typeof tweet !== "string") {
        return res.status(400).send("Todos os campos são obrigatorios!!")
    }

    const verify = user.find((u) => u.username === username)

    if (!verify) {
        return res.send('UNAUTHORIZED')

    }

    tweets.push({ username, tweet })



    res.send("OK")
})

app.get('/tweets', (req, res) => {

    const mensages = tweets.map((tweet) => {

        const userTweets = user.find((u) => u.username === tweet.username)
        return { ...tweet, avatar: userTweets.avatar }
    })

    res.send(mensages.slice(-10))
})

const server = (5000)
app.listen(server, () => console.log(`Servidor rodando na porata ${server}`))