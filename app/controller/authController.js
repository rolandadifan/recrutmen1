const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


exports.createUser = async(req,res) => {
    try {
        const passwordCus = await bcrypt.hash('customer1234', 10)
        const passwordAdm = await bcrypt.hash('admin1234', 10)
        const data = [
            {
                email: 'customer@gmail.com',
                password: passwordCus,
                nama: 'customer',
                role: 'customer'
            },
            {
                email: 'admin@gmail.com',
                password: passwordAdm,
                nama: 'admin',
                role: 'admin'
            }
        ]
        await User.create(data)
        res.status(200).json({
            status: true,
            message: 'success',
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.login = async(req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const check = await User.findOne({email: email})
        if(!check) {
            res.status(404).json({
                status: false,
                message: 'email tidak ditemukan'
            })
        }
        const checkPass = await bcrypt.compare(password, check.password)
        if(!checkPass){
            res.status(404).json({
                status: false,
                message: 'password salah'
            })
        }
        var token = await jwt.sign({
            email: check.email,
            userId: check._id,
            role:check.role
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}