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
            response_object = resultObject
        } else {
            console.log("Object not found with store_id: ", store_id);
            response_object = {
                "error": "Store_id not found"
            }
        }
        return response_object
    },
    async newUser(newUserData) {
        let new_users = users.push(newUserData);
        fs.writeFileSync(usersFilePath, JSON.stringify(new_users, null, 2));

        return newUserData
    },
    async createProduct(store_id, access_token) {
        console.log("createProduct")
        //Funcion reusable para crear el producto de Bono Ambiental en la tienda del usuario. 
        let response_object
        let json_to_tn = {
            "images": [
                {
                    "src": "https://cdn.pixabay.com/photo/2017/01/31/22/47/tree-2027899_640.png"
                }
            ],
            "name": {
                "en": "Bono Ambiental",
                "es": "Bono Ambiental",
                "pt": "Bono Ambiental"
            },
            "handle": {
                "en": "ecomm-bono-ambiental",
                "es": "ecomm-bono-ambiental",
                "pt": "ecomm-bono-ambiental"
            },
            "published": false,
            "requires_shipping": false,
            "variants": [
                {
                    "price": "10.00",
                    "sku": "ECOMM1234ABC"
                }
            ]
        }
        console.log("json_to_tn")
        console.log(json_to_tn)
        console.log("json_to_tn")

        url = "https://api.tiendanube.com/v1/" + store_id + "/products"

        var POSTrequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authentication": "bearer" + access_token,
                "User-Agent": "Ecommitment"
            },
            body: JSON.stringify(json_to_tn),
            redirect: 'follow'
        };


        try {
            var tn_response = await fetch(url, POSTrequestOptions)
            let tn_response_json = await tn_response.json();

            console.log("tn_response_json")
            console.log(tn_response_json)
            console.log("tn_response_json")

            console.log("tn_response")
            console.log(tn_response)
            console.log("tn_response")

            if (tn_response.status === 201) {
                // Process the data when the status code is 200
                let product_id = tn_response_json["id"]
                let variant_id = tn_response_json["variants"][0]["id"]
                response_object = {
                    "status": "success",
                    store_id,
                    product_id,
                    variant_id

                }
            } else {
                console.log(tn_response)
                response_object = data
            }

        } catch (error) {
            response_object = {
                "error": {
                    "type": "UNABLE_TO_CREATE_PRODUCT",
                    "message": "It was not possible to create the ecomm product"
                }
            }

        }

        console.log("response_object")
        console.log(response_object)
        console.log("response_object")

        return response_object

    },
    async addScript(store_id, access_token) {
        console.log("addScript")

        let response_object
        let json_to_tn = {
            "event": "onfirstinteraction",
            "src": "https://juanseferrari.github.io/ecommitment/public/js/ecommitment-v2.js",
            "where": "checkout"
    }
        console.log("json_to_tn")
        console.log(json_to_tn)
        console.log("json_to_tn")

        url = "https://api.tiendanube.com/v1/" + store_id + "/scripts"

        var POSTrequestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authentication": "bearer" + access_token,
                "User-Agent": "Ecommitment"
            },
            body: JSON.stringify(json_to_tn),
            redirect: 'follow'
        };


        try {
            var tn_response = await fetch(url, POSTrequestOptions)
            let tn_response_json = await tn_response.json();

            console.log("tn_response_json")
            console.log(tn_response_json)
            console.log("tn_response_json")

            console.log("tn_response")
            console.log(tn_response)
            console.log("tn_response")

            if (tn_response.status === 201) {
                // Process the data when the status code is 200
                response_object = {
                    "status": "success",
                    "status_code": tn_response.status

                }
            } else {
                response_object = tn_response
            }

        } catch (error) {
            response_object = {
                "error": {
                    "type": "UNABLE_TO_CONFIGURE_SCRIPT",
                    "message": "It was not possible to configure the ecommitment script."
                }
            }

        }

        console.log("response_object")
        console.log(response_object)
        console.log("response_object")

        return response_object


    }



};

module.exports = mainService;