const express = require('express')
const bodyParser = require('body-parser')
const { firestore } = require('./firebase')

const app = express()
app.use(bodyParser.json())

function checkDataProps (data) {
    const { text, img, timestamp, username } = data
    const imgFilePathRegex = /^[A-Za-z0-9]+[\/][A-Za-z0-9]+$/

    if (!text) {
        throw new Error('Missing text field.')
    }
    if (!img && img !== '') {
        throw new Error('Missing img field.')
    }
    if (!timestamp) {
        throw new Error('Missing timestamp field.')
    }
    if (!username) {
        throw new Error('Missing username field.')
    }
    if (typeof text !== 'string') {
        throw new Error('text field must be string.')
    }
    if (typeof img !== 'string') {
        throw new Error('img field must be String.')
    }
    if (typeof timestamp !== 'number') {
        throw new Error('timestamp field must be Number.')
    }
    if (typeof username !== 'string') {
        throw new Error('img field must be String.')
    }
    if (!img.match(imgFilePathRegex) && img !== '') {
        throw new Error('img field does not describe a valid path.')
    }

    return { text, img, timestamp, username }
}

app.get('/publication', async (req, res) => {
    try {
        const docs = []
        const querySnapshot = await firestore.collection('publications').get()
        querySnapshot.docs.forEach((doc) => {
            docs.push(doc.data())
        })
        res.status(200).send(docs)
    } catch (e) {
        res.status(500).send('Internal error.')
    }
})

app.get('/publication/:id', async (req, res) => {
    const id = req.params.id
    try {
        const doc = await firestore.collection('publications').doc(id).get()
        if (doc.exists) {
            res.status(200).send(doc.data())
        }
        else {
            res.status(404).send();
        }
    } catch (e) {
        e.status(500).send('Internal error.')
    }
})

app.post('/publication', async (req, res) => {
    let data
    try {
        data = checkDataProps(req.body)
    } catch (e) {
        res.status(422).send({ error: e.message })
        return
    }

    try {
        await firestore.collection('publications').add(data)
        res.status(201).send()
    }
    catch (e) {
        res.status(500).send('Internal error.')
    }

})

app.put('/publication/:id', async (req, res) => {
    let data
    try {
        data = checkDataProps(req.body)
    } catch (e) {
        res.status(422).send({ error: e.message })
        return
    }

    try {
        const id = req.params.id
        await firestore.collection('publications').doc(id).set(data, { merge: true })
        res.status(204).send()
    } catch (e) {
        res.status(500).send('Internal error.')
    }
})

app.delete('/publication/:id', async (req, res) => {
    const id = req.params.id
    try {
        await firestore.collection('publications').doc(id).delete()
        res.status(204).send()
    } catch (e) {
        res.status(500).send('Internal error.')
    }
})

app.listen(4000, () => {
    console.log('Server started. Listening...')
})