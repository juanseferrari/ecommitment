(function () {
    // Your JavaScript
    let switchCheckbox = document.getElementById('mySwitch');

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
        background-color: #2196F3;
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
        document.head.appendChild(style);
        switchCheckbox = document.getElementById('mySwitch');
    } //End function add EnvironmentDiv

    function addProductToCart() {
        console.log("addProductToCart")
        if (LS.cart.items) {
            console.log("LSproduct")
            //datos hardocodeados, esto deberia ser dinamico por cada usuario despues. 
            //aplicar la lógica del store_id
            const list = [
                { pid: 190409457, vid: 764647295 }
            ];

            list.forEach(item => {
                const data = new URLSearchParams();
                data.append('add_to_cart', item.pid);
                data.append('variant_id', item.vid);

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
            });


        }
    }

    function removeProductToCart() {
        console.log("removeProductToCart")
        if (LS.cart.items) {
            console.log("LSproduct")
            //datos hardocodeados, esto deberia ser dinamico por cada usuario despues. 
            //aplicar la lógica del store_id
            const data = new URLSearchParams();
            data.append('quantity[1500061560]', 0);
  
                fetch('/update/', {
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
        switchCheckbox.checked = false;

    }

    function removeProductFromCart2() {
        const cartItems = document.querySelectorAll(".js-cart-item");
      
        cartItems.forEach((item) => {
          const itemId = item.dataset.itemId;
          console.log("itemId: "+ itemId)
          const quantity = {};
          quantity[itemId] = 0;
      
          const data = new URLSearchParams();
          data.append('quantity', JSON.stringify(quantity));

          console.log("data remove: "+ data)
      
          fetch("/cart/update/", {
            method: "POST",
            body: data,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((response) => {
              if (response.ok) {
                console.log("success remove cart");
              } else {
                console.log("error remove cart");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      
        alert(
          "Se borrarán todas las variantes y la página se actualizará. Por favor, espere."
        );
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



    //Check pathname
    console.log(window.location.pathname)
    // Check the current URL path
    if (window.location.pathname.startsWith('/checkout/v3/next/')) {

        //Chequear si tiene el producto cargado como bono ambiental.



        console.log("next path")

        //Fetch amount to show
        //Fetch function that sends the whole information of the order and returns the amount to display.
        let environmentAmount = 10

        //function that edits the product variant price for the one of that session.

        showEnvironmentDiv(environmentAmount)

        for (let p = 0; p < LS.cart.items.length; p++) {
            if (LS.cart.items[p].variant_id == 764647295) {
                console.log("variant 764647295 existe")
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
                removeProductFromCart2();

                // Call the function to initiate the delay and page reload
                //reloadPageAfterDelay();
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
