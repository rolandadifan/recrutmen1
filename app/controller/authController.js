const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
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
        const jwt_key = process.env.JWT_SECRET

        const check = await User.findOne({email: email})
        if(!check) {
           return res.status(404).json({
                status: false,
                message: 'email tidak ditemukan'
            })
        }
        const checkPass = await bcrypt.compare(password, check.password)
        if(!checkPass){
            return res.status(404).json({
                status: false,
                message: 'password salah'
            })
        }
        const token = await jwt.sign({
            email: check.email,
            userId: check._id,
            role:check.role
        }, jwt_key, {expiresIn: '1y'})

        const data = {
            _id: check._id,
            email: check.email,
            nama: check.nama,
            role: check.role,
            token: token
        }

        return res.status(200).json({
            status: true,
            message: 'success login',
            data: data
        })
    } catch (error) {
       return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.updateProfile = async(req,res) => {
    try {
        const id = req.user.userId
        
        const users = await User.findOne({_id: Object(id)})
        const nama = req.body.nama ?? users.nama
        const email = req.body.email ?? users.email

        const updateData = {
            nama: nama,
            email: email
        }

         await User.updateOne({_id: Object(id)}, {
            $set: updateData
        })

        return res.status(200).json({
            status: true,
            message: 'success update profile',
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}