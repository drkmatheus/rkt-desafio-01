const mainInput = document.querySelector("#input-item");
const form = document.querySelector("form");
const itemsList = document.querySelector("ul");

mainInput.addEventListener("input", () => {
  const sanitizer = "/^[a-zA-ZÀ-ÿs]$/";

  mainInput.value.replace(sanitizer, "");
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
};

function createListItem(itemText) {
  const li = document.createElement("li");
  li.className = "item-card";

  li.innerHTML = `
            <div class="item-content">
              <input type="checkbox" id="item-1" />
              <label for="item-1">
                <span>${itemText}</span>
              </label>
            </div>
            <a class="gray">
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

  return li;
}
