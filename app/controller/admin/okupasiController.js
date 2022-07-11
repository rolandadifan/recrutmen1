const Okupasi = require('../../model/okupasiModel')

exports.create = async(req,res) => {
    try {
        const nama = req.body.nama
        const ratePremi = req.body.rate_premi
        console.log(req.user)

        if(nama === null && ratePremi === null){
            return res.status(400).json({
                status: false,
                message: 'semua data harus diisi'
            })
        }

        const data = {
            nama: nama,
            ratePremi: parseFloat(ratePremi)
        }

        await Okupasi.create(data)
        return res.status(200).json({
            status: true,
            message: 'succes membuat data'
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.get = async(req,res) => {
    try {
        const data = await Okupasi.find()
        var per_page = 10
        if(typeof req.query.per_page !== 'undefined'){
            per_page = parseInt(req.query.per_page)
        }
        var page = 0
        var current_page = 1
        if(typeof req.query.page !== 'undefined'){
            page = parseInt((req.query.page - 1) * per_page)
            current_page = parseInt(req.query.page)
        }
        if(per_page > 0){
            total_page = Math.ceil(data.length / per_page)
        }else{
            total_page = 1
        }

        const okupasis = await Okupasi.find().skip(page).limit(per_page)
        let dataView = []
        for(const okupasi of okupasis){
            dataView.push({
                _id: okupasi._id,
                nama: okupasi.nama,
                ratePremi: parseFloat(okupasi.ratePremi)
            })
        }
        return res.status(200).json({
            status: true,
            message: 'success mendapatkan data',
            page: current_page,
            limit: per_page,
            total_page: total_page,
            total_data: okupasis.length,
            data: dataView
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.detail = async(req,res) => {
    try {
        const {id} = req.params
        const data = await Okupasi.findOne({_id: Object(id)})
        if(!data){
            return res.status(404).json({
                status: false,
                message: 'data tidak ditemukan'
            })
        }
        const dataView = {
            _id: data._id,
            nama: data.nama,
            ratePremi: parseFloat(data.ratePremi)
        }
        return res.status(200).json({
            status: true,
            message: 'success mendapatkan data',
            data: dataView
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.update = async(req,res) => {
    try {
        const {id} = req.params
        const data = await Okupasi.findOne({_id: Object(id)})
        if(!data){
            return res.status(404).json({
                status: false,
                message: 'data tidak ditemukan'
            })
        }
        data.nama = req.body.nama
        data.ratePremi = parseFloat(req.body.rate_premi)
        await data.save()
        return res.status(200).json({
            status: true,
            message: 'success update data',
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.delete = async(req,res) => {
    try {
        const {id} = req.params
        const data = await Okupasi.findOne({_id: Object(id)})
        if(!data){
            return res.status(404).json({
                status: false,
                message: 'data tidak ditemukan'
            })
        }
        await data.delete()
        return res.status(200).json({
            status: true,
            message: 'success delete data',
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}