const mongoose = require("mongoose");

const transaksiSchema = mongoose.Schema(
    {
        pengajuanForm: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pengajuan',
            required: true
        },
        invoice:{
            type: String,
            required: true
         },
         total: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
         },
         keterangan:{
            type: String,
            default: 'Belum Bayar',
            enum: ['Sudah Dibayar', 'Belum Bayar']
         },
       
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Transaksi", transaksiSchema);
