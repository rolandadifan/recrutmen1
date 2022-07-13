const mongoose = require("mongoose");

const noPolisSchema = mongoose.Schema(
    {
        dataPengajuan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pengajuan',
            required: true
        },
        noPolis:{
            type: String,
            required: true
         },
         tanggal_cetak: {
            type: Date,
            required: true
         },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Data_polis", noPolisSchema);
