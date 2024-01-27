(function () {
  var element = document.querySelector('div[data-product-id="198035084"]');

  console.log('Selected Element:', element);

  // Check if the element is found
  if (element) {
    // Get the parent div
    var parentDiv = element.parentNode;
    var closest = element.closest("div")
    console.log("closest: ", closest)

    // Check if the parent div is found
    if (parentDiv) {
      console.log('Parent Div:', parentDiv);

      closest.style.display = 'none';

      console.log('Parent Div after hiding:', parentDiv);
      console.log("Element after hide", element)
    } else {
      console.log('Parent div not found');
    }
  } else {
    // Handle case when the element is not found
    console.log('Element not found');
  }
})();
