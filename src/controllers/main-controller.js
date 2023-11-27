//a futuro renombrar a tn-controller y tener un controller por app.

// Requires
const path = require("path");
const fs = require("fs");
const url = require('url');




const mainController = {
  home: async (req, res) => {

    res.send("HOLA MUNDO");
  }
};

module.exports = mainController;