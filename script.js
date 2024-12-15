const cardData = [
  {
    id: 1,
    title: "1 Unit",
    discount: "10% Off",
    price: "$10.00 USD",
    originalPrice: "$24.00 USD",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Black", "White", "Green"],
    selectedSize: "S",
    selectedColor: "Red",
  },
  {
    id: 2,
    title: "2 Unit",
    discount: "20% Off",
    price: "$18.00 USD",
    originalPrice: "$24.00 USD",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Black", "White", "Green"],
    selectedSize: "S",
    selectedColor: "Black",
  },
  {
    id: 3,
    title: "3 Unit",
    discount: "30% Off",
    price: "$24.00 USD",
    originalPrice: "$24.00 USD",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Blue", "Black", "White", "Green"],
    selectedSize: "S",
    selectedColor: "Red",
  },
];

let selectedCardId = 2; // Default: "2 Unit" card is active.

function renderCards() {
  const container = document.getElementById("card-container");
  container.innerHTML = "";

  cardData.forEach((card) => {
    const isActive = card.id === selectedCardId;

    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    if (isActive) cardElement.classList.add("active");

    cardElement.innerHTML = `
        <div class="card-header">
          <label>
            <input type="radio" name="card" ${isActive ? "checked" : ""} />
            <span class="card-title">${card.title}</span> 
           
            <span class="discount">${card.discount}</span>
             ${
               card.id === 1
                 ? '<span class="standard-price ">Standard Price</span>'
                 : ""
             }
          </label>
          <div class="price-container">
            <div class="price">${card.price}</div>
            <div class="original-price">${card.originalPrice}</div>
          </div>
          ${
            card.id === 2
              ? '<span class="most-popular">MOST POPULAR</span>'
              : ""
          }
        </div>
        ${
          isActive
            ? `
<div class="card-body">
  <!-- Size Section -->
  <div class="dropdown">
    <div class="dropdown-title">Size</div>
    ${Array.from({ length: card.id })
      .map(
        (_, index) => `
        <div class="dropdown-item">
          <label>#${index + 1}:</label>
          <select id="size-${card.id}-${index}">
            ${card.sizes
              .map(
                (size) =>
                  `<option value="${size}" ${
                    size === card.selectedSize ? "selected" : ""
                  }>${size}</option>`
              )
              .join("")}
          </select>
        </div>
      `
      )
      .join("")}
  </div>

  <!-- Color Section -->
  <div class="dropdown">
    <div class="dropdown-title">Colour</div>
    ${Array.from({ length: card.id })
      .map(
        (_, index) => `
        <div class="dropdown-item">
          <label>#${index + 1}:</label>
          <select id="color-${card.id}-${index}">
            ${card.colors
              .map(
                (color) =>
                  `<option value="${color}" ${
                    color === card.selectedColor ? "selected" : ""
                  }>${color}</option>`
              )
              .join("")}
          </select>
        </div>
      `
      )
      .join("")}
  </div>
</div>

`
            : ""
        }
      `;

    // Radio button functionality
    const radioButton = cardElement.querySelector("input[type='radio']");
    radioButton.addEventListener("change", () => {
      selectedCardId = card.id;
      renderCards();
      updateTotalPrice(card.price);
    });

    // Click functionality for selecting the card
    cardElement.addEventListener("click", () => {
      selectedCardId = card.id;
      renderCards();
      updateTotalPrice(card.price);
    });

    // Attach event listeners for dropdowns (only for active card)
    if (isActive) {
      setTimeout(() => {
        Array.from({ length: card.id }).forEach((_, index) => {
          const sizeSelect = document.getElementById(
            `size-${card.id}-${index}`
          );
          const colorSelect = document.getElementById(
            `color-${card.id}-${index}`
          );

          if (sizeSelect && colorSelect) {
            sizeSelect.addEventListener("change", (e) => {
              card.selectedSize = e.target.value;
            });
            colorSelect.addEventListener("change", (e) => {
              card.selectedColor = e.target.value;
            });

            // Prevent dropdown clicks from closing the card
            sizeSelect.addEventListener("click", (e) => e.stopPropagation());
            colorSelect.addEventListener("click", (e) => e.stopPropagation());
          } else {
            console.error(
              `Dropdown not found for card ID: ${card.id}, Index: ${index}`
            );
          }
        });
      }, 0);
    }

    container.appendChild(cardElement);
  });
}

function updateTotalPrice(price) {
  document.getElementById("total-price").textContent = price;
}

// Initial Render
renderCards();
updateTotalPrice("$18.00 USD");
