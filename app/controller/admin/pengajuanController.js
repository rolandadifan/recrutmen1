const Pengajuan = require('../../model/pengajuanModel')
const Transaksi = require('../../model/transaksiModel')
const random = require('../../helper/randomNumber')

exports.list = async(req,res) => {
    try {
        const data_total = await Pengajuan.find()
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
            total_page = Math.ceil(data_total.length / per_page)
        }else{
            total_page = 1
        }

        const datas = await Pengajuan.find().populate('okupasiId').populate('userId').skip(page).limit(per_page).sort({'createdAt': -1})
        let dataView = []
        for(const data of datas){
            const transaski = await Transaksi.findOne({pengajuanForm: Object(data._id)})
            dataView.push({
                _id: data._id,
                nama: data.userId.nama,
                noPolis: data.noPolis,
                tipeAsuransi: data.tipeAsuransi,
                invoice: transaski.invoice,
                status: data.status,
                keterangan: transaski.keterangan
            })
        }
        return res.status(200).json({
            status: true,
            message: 'success mendapatkan data',
            page: current_page,
            limit: per_page,
            total_page: total_page,
            total_data: datas.length,
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
        const pengajuan = await Pengajuan.findOne({_id: id}).populate('okupasiId').populate('userId', 'nama email')
        // console.log(pengajuan)
        if(!pengajuan){
            return res.status(404).json({
                status: false,
                message: 'data tidak ditemukan'
            })
        }
        const history_transaction = await Transaksi.findOne({pengajuanForm: Object(pengajuan._id)})
        const data = {
            _id: pengajuan._id,
            user: pengajuan.userId,
            alamat: pengajuan.alamat,
            noPolis: pengajuan.noPolis,
            kontruksi: pengajuan.kontruksi,
            jangkaWaktu: pengajuan.jangkaWaktu,
            tipeAsuransi: pengajuan.tipeAsuransi,
            okupasi: pengajuan.okupasiId.nama,
            noInvoice: history_transaction.invoice,
            periode: pengajuan.jangkaWaktu,
            harga: pengajuan.harga,
            gempa: pengajuan.gempa,
            total: parseFloat(history_transaction.total),
            keterangan: history_transaction.keterangan,
            status: pengajuan.status
        }
        return res.status(200).json({
            status: true,
            message: 'succes mendapatkan data',
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.approval = async(req,res) => {
    try {
        const id = req.body.id
        const status = req.body.status
        const updateStatus = {
            status: status
        }
        if(status === 'disetujui'){
            updateStatus.noPolis = 'K.01.001.' + random.randomNumber(5)
        }
        await Pengajuan.updateOne({_id: Object(id)}, {
            $set: updateStatus
        })

        return res.status(200).json({
            status: true,
            message: 'success update status',
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}