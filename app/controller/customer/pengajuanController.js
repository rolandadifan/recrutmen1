const Pengajuan = require('../../model/pengajuanModel')
const Transaksi = require('../../model/transaksiModel')
const Okupasi = require('../../model/okupasiModel')
const random = require('../../helper/randomNumber')

exports.create = async(req,res) => {
    try {
        const data = {
            userId: req.user.userId,
            okupasiId: req.body.okupasi_id,
            jangkaWaktu: req.body.jangka_waktu,
            harga: req.body.harga,
            kontruksi: req.body.kontruksi,
            alamat:{
                alamat: req.body.alamat,
                provinsi: req.body.provinsi,
                kota: req.body.kota,
                kabupaten: req.body.kabupaten,
                daerah: req.body.daerah,
            },
            gempa: req.body.gempa,
            status: 'pending'
        }
        const pengajuan = await Pengajuan.create(data)


        const transaski = new Transaksi()
        transaski.pengajuanForm = pengajuan._id
        transaski.invoice = 'K.001.' + random.randomNumber(5)
        transaski.total = parseFloat(req.body.total)
        transaski.keterangan = 'Belum Bayar'
        await transaski.save()

        return res.status(200).json({
            status: true,
            message: 'pengajuan berhasil dikirim',
            data: {
                _id: pengajuan._id
            }
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

        const datas = await Pengajuan.find().populate('okupasiId').skip(page).limit(per_page)
        let dataView = []
        for(const data of datas){
            const transaski = await Transaksi.findOne({pengajuanForm: Object(data._id)})
            dataView.push({
                _id: data._id,
                noPolis: data.noPolis,
                tipeAsuransi: data.tipeAsuransi,
                invoice: transaski.invoice,
                status: transaski.keterangan
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

exports.invoice = async(req,res) => {
    try {
        const {id} = req.params
        const pengajuan = await Pengajuan.findOne({_id: id}).populate('okupasiId')
        if(!pengajuan){
            return res.status(404).json({
                status: false,
                message: 'data tidak ditemukan'
            })
        }
        const history_transaction = await Transaksi.findOne({pengajuanForm: Object(pengajuan._id)})
        const data = {
            _id: pengajuan._id,
            tipeAsuransi: pengajuan.tipeAsuransi,
            okupasiId: pengajuan.okupasiId._id,
            okupasi: pengajuan.okupasiId.nama,
            noInvoice: history_transaction.invoice,
            periode: pengajuan.jangkaWaktu,
            harga: pengajuan.harga,
            total: parseFloat(history_transaction.total),
            keterangan: history_transaction.keterangan
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

exports.bayar = async(req,res) => {
    try {
        const {id} = req.params
        const bayar = await Transaksi.findOne({pengajuanForm: Object(id)})
        bayar.keterangan = 'Sudah Dibayar'
        await bayar.save()
        return res.status(200).json({
            status: true,
            message: 'transaksi succes',
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
