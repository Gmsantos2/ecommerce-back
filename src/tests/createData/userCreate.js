const User = require('../../models/User')

const userCreate = async() => {
    await User.create({
        firstName: 'fernando',
        lastName: 'Jesus',
        email: 'fernando@gmail',
        password: 'test',
        phone: '1234567'
    })
}

module.exports= userCreate;