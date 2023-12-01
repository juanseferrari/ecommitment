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

  },
  calculator: async (req,res) => {
    const cart_data = req.body.cart
    const store_data = req.body.store

    let return_object = {}

    console.log("cart_data: " + cart_data)
    console.log("store_data: " + store_data)

    if(!cart_data.shippingAddress.address){
      //No hay address
      return_object = {
        "quantity": 0, //Esto seria que cantidad de producto le mandamos al checkout
        "distance": 0, //Distancia del envío
        "distance_unit": "km", //Unidad de medida
        "co2_emitted": 0 //CO2 emitido
        //"cart_id": cart_id, //ID del carrito
        //cart_data ,
        //store_data
    }
    } else {
      return_object = {
        "quantity": 8, //Esto seria que cantidad de producto le mandamos al checkout
        "distance": 18, //Distancia del envío
        "distance_unit": "km", //Unidad de medida
        "co2_emitted": 12 //CO2 emitido
        //"cart_id": cart_id, //ID del carrito
        //cart_data ,
        //store_data
     }
    }


    //let shipping_data = cart_data.shippingAddress
    //let cart_id = cart_data.id
    //let items_data = cart_data.items
    //let subtotal = cart_data.subtotal
    //let store_id = store_data.id
    //ANALIZAR DISTANCIAS Y VER COMO HACER ESA PARTE



    res.json(return_object)
  },
  demo1: (req,res) => {
    res.render("environmentDiv1")
  },
  demo2: (req,res) => {
    res.render("environmentDiv2")
  }
};

module.exports = mainController;