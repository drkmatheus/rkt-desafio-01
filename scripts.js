const mainInput = document.querySelector("#input-item");
const form = document.querySelector("form");
const itemsList = document.querySelector("ul");

let itemCounter = 5;

mainInput.addEventListener("input", () => {
  const sanitizer = /[^a-zA-ZÀ-ÿ\s]/g;
  mainInput.value = mainInput.value.replace(sanitizer, "");
});

form.onsubmit = (event) => {
  event.preventDefault();

  const itemText = mainInput.value.trim();

  if (!itemText) {
    alert("Por favor, digite um item");
    return;
  }

  const newItem = createListItem(itemText);
  itemsList.appendChild(newItem);

  mainInput.value = "";
};

function createListItem(itemText) {
  const li = document.createElement("li");
  li.className = "item-card";

  const itemId = `item-${itemCounter++}`;
  li.id = itemId;

  li.innerHTML = `
    <div class="item-content">
      <input type="checkbox" id="${itemId}-checkbox" />
      <label for="${itemId}-checkbox">
        <span>${itemText}</span>
      </label>
    </div>
    <a class="gray remove-button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"
        />
      </svg>
    </a>`;

  const checkbox = li.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  });

  return li;
}

function deleteCardById(itemId) {
  const itemToRemove = document.getElementById(itemId);

  if (itemToRemove) {
    itemToRemove.remove();
    showRemovalNotification();
    return true;
  }

  alert(`Item com ID ${itemId} não encontrado`);
  return false;
}

itemsList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-button");

  if (removeButton) {
    event.stopPropagation();
    const listItem = removeButton.closest("li");
    const itemId = listItem.id;
    deleteCardById(itemId);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const existingCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]'
  );

  existingCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const listItem = this.closest(".item-card");

      if (this.checked) {
        listItem.classList.add("completed");
      } else {
        listItem.classList.remove("completed");
      }
    });
  });
});

function showRemovalNotification() {
  const infoCard = document.querySelector(".info-card");
  infoCard.style.display = "flex";

  setTimeout(() => {
    infoCard.style.display = "none";
  }, 4000);
}

document.querySelector(".close-notification").addEventListener("click", () => {
  document.querySelector(".info-card").style.display = "none";
});
