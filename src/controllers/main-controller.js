//a futuro renombrar a tn-controller y tener un controller por app.

// Requires
const path = require("path");
const fs = require("fs");
const url = require('url');

const mainService = require("../services/main-service");

//Ecommitment tokens. 
const tn_client_id = "6107"
const tn_client_secret = "d05ab78cfd8ec215ffe08d235cbf079a6c224c9b066b641e"



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

    //Obtener información de la location del store (para calcular la distancia origen y destino)

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
  },
  demo3: (req,res) => {
    res.render("environmentDiv3")
  },
  tnOauth: async (req, res) => {
    let code = req.query.code

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", tn_client_id);
    urlencoded.append("client_secret", tn_client_secret);
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Ecommitment"
      },
      body: urlencoded,
      redirect: 'follow'
    };

    let response = await fetch("https://www.tiendanube.com/apps/authorize/token", requestOptions)
    let data = await response.json();
    if (data['error']) {
      //WIP despues manejar bien este error handling. 
      let message = "No hemos podido validar la conexión con Tienda Nube. Por favor intente nuevamente."
      res.render("error-page", { message })
    } else {
      /** FUNCIONO OK EL OAUTH */

      // GET al store para traer mas informacion relevante de la store.
      var GETrequestOptions = {
        method: 'GET',
        headers: {
          "Authentication": "bearer" + data['access_token']
        },
        redirect: 'follow'
      };
      let tn_user_request_data = await fetch("https://api.tiendanube.com/v1/" + data['user_id'] + "/store", GETrequestOptions)
      let tn_user_data = await tn_user_request_data.json();
      //console.log(tn_user_data)
      let access_token = data['access_token']
      let store_id =  data['user_id'].toString()
      let store_name = tn_user_data['name']['es']
      let product_id
      let variant_id


      //CREATE PRODUCT
      try {
        let product_response = await mainService.createProduct(store_id,access_token)

        console.log("product_response")
        console.log(product_response)
        console.log("product_response")
        if(product_response.status == "success"){
          product_id = product_response.product_id
          variant_id = product_response.variant_id
        }

      } catch (error) {
        console.log(error)
        let message = "Hubo un error al crear el producto. "
        res.render("error-page", { message })
      }

      //SAVE INTO DB
      //TODO migrate into a better DB. 
      let new_user_data = {
        access_token,
        store_id,
        store_name,
        product_id,
        variant_id
      }

      let new_user_data_response = await mainService.newUser(new_user_data)
      console.log("new_user_data_response")
      console.log(new_user_data_response)
      console.log("new_user_data_response")

      res.render("configuration", {user_data: new_user_data})



    } /** Fin del else error */
  },
};

module.exports = mainController;