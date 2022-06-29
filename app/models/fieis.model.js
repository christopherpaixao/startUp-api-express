const mongoose = require("mongoose");

const Fieis = mongoose.model(
  "Fieis",
  new mongoose.Schema(
    {
      nome: String,
      nascimento: String,
      cpf: String,
      rg: String,
      casado: Boolean,
      batizado: Boolean,
      dataBatismo: Date,
    },
    { timestamps: true }
  )
);

module.exports = Fieis;
