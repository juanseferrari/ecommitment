//a futuro renombrar a tn-controller y tener un controller por app.

// Requires
const path = require("path");
const fs = require("fs");
const url = require('url');

const mainService = require("../services/main-service");



const mainController = {
  home: async (req, res) => {

    res.render("index")
  },
  productData: async (req,res) => {
    const store_id = req.query.store_id
    console.log(store_id)
    let return_object = {}
    if(!store_id){
        console.log("NO STORE ID FOUND")
        return_object = {
            "error": "You need to provide a store_id"
        }
    } else {
        const user_data = await mainService.returnUserData(store_id)
        console.log(user_data)
        if(user_data.error){
            return_object = user_data
        } else {
            return_object = {
                "store_id": user_data.store_id,
                "store_name": user_data.store_name,
                "product_id": user_data.product_id,
                "variant_id": user_data.variant_id
            }
        }

    }

    res.json(return_object)

  }
};

module.exports = mainController;