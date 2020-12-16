const express = require('express')
const User = require('./User')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user , token })
    } catch (e) {
        res.status(400).send({error: 'Invalid credentials'})
    }
})

router.get('/users', async(req, res) => {
    const users = await User.find()
    res.status(200).send(users)
})

module.exports = router