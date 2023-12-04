// ***** Global requires *****
const path = require("path");
const fs = require("fs");
const { response } = require("express");


// ***** Database folder *****
const usersFilePath = path.join(__dirname, "../db/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));



const mainService = {
   async returnUserData(store_id) {
    let response_object = {}

    let resultObject = await users.find(obj => obj.store_id === store_id)

    // Check if an object was found
    if (resultObject) {
        console.log("Object found:", resultObject);
        response_object =  resultObject
    } else {
        console.log("Object not found with store_id: ", store_id);
        response_object = {
            "error": "Store_id not found"
        }
    }
    return response_object
    },
    async createProduct(){
        //Funcion reusable para crear el producto de Bono Ambiental en la tienda del usuario. 
        
    }
  
 
  
  };
  
  module.exports = mainService;