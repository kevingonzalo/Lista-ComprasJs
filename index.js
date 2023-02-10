const form = document.getElementById("form");
const shoppingContainer = document.querySelector(".shopping-container");
const btnSubmit = document.querySelector(".btn-submit");
const alert = document.querySelector(".alert");
let list = [];

window.addEventListener("DOMContentLoaded", () => {
    listLocalStorage = JSON.parse(localStorage.getItem("items"));
    insertarElement(listLocalStorage);
});

// function alert elements
const displayAlert = (text, action) => {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1500);
};

// insert elements list
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("input").value;
    if (!input) {
        return displayAlert("por favor ingrese algo", "delete");
    }
    if (list.indexOf(input) == -1) {
        list.push(input);
        insertarElement(list);
        displayAlert("ingresado", "insert");
    } else {
        displayAlert("ya esta en la lista", "delete");
    }
});

//add elements to list
const insertarElement = (list) => {
    shoppingContainer.innerHTML = "";
    input.value = "";
    localStorage.setItem("items", JSON.stringify(list));
    if (list.length) {
        list.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("shopping-list");
            let attr = document.createAttribute(`data-id`);
            attr.value = item;
            div.setAttributeNode(attr);
            div.innerHTML = `
                    <div class="shopping-item">
                        <p class="item">${item}</p>
                                </div>
                    <!-- container btns -->
                    <div class="btn-container">
                        <button type="button" onclick="changeDone(event)" class="btn-edit"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn-edit-ok"><i class="fa-solid fa-check"></i></button>
                        <button type="button" class="btn-delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
            `;
            shoppingContainer.appendChild(div);
            // btn delete item
            const btnDelete = document.querySelectorAll(".btn-delete");
            btnDelete.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const element = e.currentTarget.parentElement.parentElement;
                    const id = element.dataset.id;
                    shoppingContainer.removeChild(element);
                    for (let i = 0; i < list.length; i++) {
                        if (id == list[i]) {
                            list.pop(i);
                        }
                    }
                    localStorage.setItem("items", JSON.stringify(list));
                    insertarElement(list);
                    displayAlert("eliminado", "delete");
                });
            });
        });
    }
};
// edit done btn
const changeDone = (event) => {
    event.currentTarget.classList.add(".ok");
    const element = event.currentTarget.parentElement.parentElement;
    element.classList.toggle("done");
};

const order = () => {};
// clear elements list
const clearBtn = document.querySelector(".clear-items");
clearBtn.addEventListener("click", () => {
    if (list.length) {
        list.length = 0;
        insertarElement(list);
        displayAlert("se elimino todo correctamente", "delete");
    }
});
