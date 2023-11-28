(function () {

  //FLUJOS DENTRO DEL JAVASCRIPT

  //VALIDAR QUE EL BONO AMBIENTAL EXISTA EN PRODUCTOS. SI NO EXISTE, CREAR EL PRODUCTO. SINO DEVOLVER ESE DATO

  //ESTO SE PUEDE HACER EN EL PASO ANTERIOR AL CHECKOUT. 

  //MOSTRAR EL BONO AMBIENTAL EN ESE CHECKOUT (EL BONO AMBIENTAL PUEDE SER UNA IMAGEN O MEJORA DEL CHECKOUT)




  // Your JavaScript
  let switchCheckbox = document.getElementById('mySwitch');

  //OBTENER INFO DEL SHIPPING Y CALCULAR DISTANCIA Y DEVOLVER EL environmentAmount



  function showEnvironmentDiv(environmentAmount) {
    // Get the div element with class "table-subtotal"
    var subtotalDiv = document.querySelector('.table-subtotal');
    var newDiv = document.createElement('div');

    // Set the HTML content of the subtotalDiv using innerHTML
    newDiv.innerHTML = `
           <div class="switch-container">
           <!-- Rounded switch -->
           <div>
            <label class="switch">
                <input type="checkbox" id="mySwitch">
                <span class="slider round"></span>
            </label>
           </div>
           <!-- Description -->
           <div class="switch-description">Bono ambiental</div>
           <div class="switch-amount">$${environmentAmount}</div>
           
           </div>
        `;

    subtotalDiv.appendChild(newDiv);



    // Set the height of the parent div to 20px
    //subtotalDiv.style.height = '20px';

    // Create a style element
    var style = document.createElement('style');

    // Set the CSS rules as text content
    style.textContent = `
            .switch-container {
                display: flex;
                justify-content: space-between;
            }
            .switch-description {
                display: flex;
                align-items: center;
                padding-left: 10px;
            }
            .switch-amount {
                display: flex;
                align-items: center;
            }
           /* The switch - the box around the slider */
           .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
            transition: .4s;
           }
           
           /* Hide default HTML checkbox */
           .switch input {
            opacity: 0;
            width: 0;
            height: 0;
           }
           
           /* The slider */
           .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
          }
           .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s; 
          }
           
           input:checked + .slider {
            background-color: #34a77c;
           }
           
           input:focus + .slider {
            box-shadow: 0 0 1px #2196F3;
           }
           
           input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
           }
           
           /* Rounded sliders */
           .slider.round {
            border-radius: 34px;
           }
           
           .slider.round:before {
            border-radius: 50%;
             }
           `;

    // Append the style element to the document's head
    //background-image: url('https://juanseferrari.github.io/ecommitment/public/images/earth.svg');

    document.head.appendChild(style);
    switchCheckbox = document.getElementById('mySwitch');
  } //End function add EnvironmentDiv



  function addProductToCart() {
    console.log("addProductToCart")
    if (LS.cart.items) {
      console.log("LSproduct")
      //datos hardocodeados, esto deberia ser dinamico por cada usuario despues. 
      //aplicar la lógica del store_id
      const data = new URLSearchParams();
      data.append('add_to_cart', 191980378); //product_id
      data.append('variant_id', 771992910); //variant_id
      data.append('quantity', 4); //quantity

      fetch('/comprar/', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => {
          if (response.ok) {
            console.log('success');
          } else {
            console.log('error');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });


    }
  }


  async function removeUniqueProductFromCart() {
    let items_on_cart = LS.cart.items
    console.log("items_on_cart")
    console.log(items_on_cart)
    console.log("items_on_cart")

    var result = items_on_cart.filter(obj => {
      return obj.sku === "BSG1234A"
    })
    console.log("result")
    console.log(result)
    console.log("result")
    if (result.length === 1) {

      //Existe un solo SKU
      console.log("EXISTE UN SOLO SKU ")

      let item_id = result[0].id.toString()
      console.log("item_id")
      console.log(item_id)
      console.log("item_id")

      let body = new URLSearchParams();
      body.append(`quantity[${item_id}]`, "0");

      console.log("Request Body:", body.toString());


      await fetch("/cart/update/", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("success remove cart");
            console.log(response)
          } else {
            console.log("error remove cart");
            console.log(response)
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

    }


  }


  // Wait for 1 second (1000 milliseconds) and then reload the page
  function reloadPageAfterDelay() {
    setTimeout(function () {
      // Reload the page after 1 second1
      window.location.reload();
    }, 200); // 1000 milliseconds = 1 second
    switchCheckbox.checked = true;
    console.log("checked")
  }


  function calculator(cart_data,store_data) {
      console.log("calculator")

      //let cart_data = LS.cart
      //let store_data = LS.store

      console.log(cart_data)
      console.log(store_data)

      let body = JSON.stringify({
        "cart": cart_data,
        "store": store_data
      })

      console.log("calculator body")
      console.log(body)
      console.log("calculator body")

      fetch('https://ecommitment-634117e74352.herokuapp.com/api/calculator', {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {   
        if (response.error) {
          console.log('Error:', response.error);
        } else {
          // Parse the response body as JSON
          return response.json();
        }
      })
      .then(data => {
        // Handle the parsed JSON data
        console.log('Parsed JSON data:', data);
    
        // Perform further actions with the data
        // ...
    
        // If you need to return the data from this function, you can do so here
        return data;
      })
        .catch(error => {
          console.error('Error:', error);
        });

        

  }

  //Check pathname
  console.log(window.location.pathname)
  // Check the current URL path
  if (window.location.pathname.startsWith('/checkout/v3/next/')) {

    //Obtener la data de la calculadora

    let calculator_response = calculator(LS.cart,LS.store)
    console.log("calculator_response")
    console.log(calculator_response)
    console.log(JSON.stringify(calculator_response))
    console.log("calculator_response")
    let calculator_quantity = calculator_response.quantity
    console.log("calculator_quantity: " + calculator_quantity)

    //Chequear si tiene el producto cargado como bono ambiental.



    console.log("next path")

    //Fetch amount to show
    //Fetch function that sends the whole information of the order and returns the amount to display.
    let environmentAmount = 10

    //function that edits the product variant price for the one of that session.

    showEnvironmentDiv(environmentAmount)

    for (let p = 0; p < LS.cart.items.length; p++) {
      if (LS.cart.items[p].variant_id == 771992910) {
        console.log("variant 771992910 existe")
        switchCheckbox.checked = true;
      }
    }

    // Check the state of the switch when it is clicked
    switchCheckbox.addEventListener('change', function () {
      if (switchCheckbox.checked) {
        console.log('Switch is ON');
        //Add product to cart for the amount given. 
        addProductToCart()

        // Call the function to initiate the delay and page reload
        reloadPageAfterDelay();

      } else {
        //REMOVE PRODUCT. 
        console.log('Switch is OFF');
        //Remove product from cart for the amount given. 
        removeUniqueProductFromCart()

        console.log("log after remove product")

        // Call the function to initiate the delay and page reload
        reloadPageAfterDelay();

      }
    });

  } else {
    console.log("start path")

  }

  console.log("LS")
  console.log(LS)
  console.log("LS")
  console.log("CART ITEMS")
  console.log(LS.cart.items)
  console.log("CART ITEMS")
  console.log("CART SHIPPING ADDRESS")
  console.log(LS.cart.shippingAddress)
  console.log("CART SHIPPING ADDRESS")
  console.log("CART SUBTOTAL")
  console.log(LS.cart.subtotal)
  console.log("CART SUBTOTAL")
  console.log("CART CONTACT")
  console.log(LS.cart.contact)
  console.log("CART CONTACT")
})();