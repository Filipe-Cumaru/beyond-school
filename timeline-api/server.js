const express = require('express')
const bodyParser = require('body-parser')
const { firestore } = require('./firebase')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

async function checkDataProps (data) {
    const { text, img, timestamp, username } = data
    const allUsernames = []

    // Verificação se o objeto contém todos os campos necessários.
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

    // Verificação de tipo dos campos dos objetos.
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

    return { text, img, timestamp, username }
}

/**
 * @description Implementação de um endpoint GET.
 * 
 * Retorna todas as publcações registradas no banco de dados Firebase.
 * Em caso de sucesso, retorna o código 200 (OK).
 * Caso negativo, retorna 500 (Internal server error).
 */
app.get('/post', async (req, res) => {
    try {
        const docs = []
        const querySnapshot = await firestore.collection('publications').get()
        querySnapshot.docs.forEach((doc) => {
            let docData = doc.data()
            docData.id = doc.id
            docs.push(docData)
        })
        res.status(200).send(docs)
    } catch (e) {
        res.status(500).send('Internal error.')
    }
})

/**
 * @description Implementação de um endpoint GET.
 * 
 * Retorna a publicação com ID "id" do banco de dados.
 * Em caso de sucesso, retorna o código 200 (OK).
 * Caso a publicação não exista, retorna 404 (Not found).
 * Caso ocorra um erro no processamento da requisição, retorna 500 (Internal server error).
 */
app.get('/post/:id', async (req, res) => {
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

/**
 * @description Implementação de um endpoint POST.
 * 
 * Insere uma nova publicação no banco de dados.
 * Em caso de sucesso, retorna o código 201 (Created).
 * Caso os dados informados na requisição possuam algum erro sintático ou semântico, 
 * retorna 422 (Unprocessable entity).
 * Em caso de erro no processamento da consulta ao BD, retorna 500 (Internal server error).
 */
app.post('/post', async (req, res) => {
    let data
    try {
        data = await checkDataProps(req.body)
    } catch (e) {
        res.status(422).send({ error: e.message })
        return
    }

    try {
        const doc = await firestore.collection('publications').add(data)
        res.status(201).send({ id: doc.id })
    }
    catch (e) {
        res.status(500).send('Internal error.')
    }

})

/**
 * @description Implementação de um endpoint PUT.
 * 
 * Atualiza uma publicação existente no banco de dados.
 * Em caso de sucesso, retorna o código 204 (No content).
 * Caso os dados informados na requisição possuam algum erro sintático ou semântico, 
 * retorna 422 (Unprocessable entity).
 * Em caso de erro no processamento da consulta ao BD, retorna 500 (Internal server error).
 */
app.put('/post/:id', async (req, res) => {
    let data
    try {
        data = await checkDataProps(req.body)
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

/**
 * @description Implementação de um endpoint DELETE.
 * 
 * Exclui uma publicação do banco de dados.
 * Em caso de sucesso, retorna o código 204 (No content).
 * Em caso de erro no processamento da consulta ao BD, retorna 500 (Internal server error).
 */
app.delete('/post/:id', async (req, res) => {
    const id = req.params.id
    try {
        await firestore.collection('publications').doc(id).delete()
        res.status(204).send()
    } catch (e) {
        res.status(500).send('Internal error.')
    }
})

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server started. Listening to port ${port}...`)
})