const modal = document.getElementById("modal");
const btn = document.getElementById("new");
const inputFile = document.getElementById("inputFile");
const dlt = document.getElementById("delete");
const deletRow = document.getElementById("deleteRow");
const NewAdd = document.getElementById("NewAdd");
const cancle = document.getElementById("Cancle");
// edit detailes
const iName = document.getElementById("iName");
const iEmail = document.getElementById("iEmail");
const textarea = document.getElementById("textarea");


let url = "https://jsonplaceholder.typicode.com/users";
let num = "";

const arrayFromApi = [];
let dataForTable = [];
let usersEdit = [];
let editId = "";

const buildTable = (data) => {
    let tableData = "";
    data.map((users, i) => {
        tableData += `<tr>
                <td>${i + 1}</td>
                <td>${users.name}</td>
                <td>${users.email}</td>
                <td>${users.address.city}</td>
                <td><button class="btnn" id="editbtn"onclick="editbtn(${
                    users.id
                })">Edit</button></td>
                <td><button class="btnn" id="deletbtn" onclick="Deletbtn(${
                    users.id
                })">Delete</button></td>
                </tr>`;
    });
    document.getElementById("Tdshow").innerHTML = tableData;
};

window.onload = function () {
    fetch(url)
        .then((data) => {
            return data.json();
        })
        .then((objectData) => {
            arrayFromApi.push(objectData);
            dataForTable = objectData;
            buildTable(objectData);
        });
};

// open modal NEW
function openPopup() {
    modal.classList.add("openModal");
}
function closePopup() {
    modal.classList.remove("openModal");
}

function Save() {
    const UserName = document.getElementById("inputName");
    const Email = document.getElementById("inputEmail");
    const textArea = document.getElementById("inputField");

    fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(),
    })
        .then((data) => {
            return data.json();
        })
        .then(() => {
            dataForTable.push({
                id: dataForTable.length + 1,
                name: UserName.value,
                email: Email.value,
                address: { city: textArea.value },
            });

            buildTable(dataForTable);
            modal.classList.remove("openModal");
        })

        .catch((err) => console.log(err));
}
function Cancle() {
    modal.classList.remove("openModal");
}

function Deletbtn(id) {
    num = id;
    dlt.classList.add("Modal1");
}

function Submit() {
    const newValue = dataForTable.filter(
        (newValue, index) => newValue.id != num
    );
    console.log("num", num);
    console.log("newValue", newValue);
    dataForTable = newValue;
    buildTable(newValue);

    dlt.classList.remove("Modal1");
}

function remove() {
    dlt.classList.remove("Modal1");
}

function editbtn(id) {
    const foundObj = arrayFromApi[0].find((item, i) => {
        return item.id == id;
    });
    editId = id;

    document.querySelector(".iName").innerHTML = "";
    iName.value = foundObj.name;

    document.querySelector(".iEmail").innerHTML = "";
    iEmail.value = foundObj.email;
    document.getElementById("textarea").innerHTML = "";
    textarea.value = foundObj.address.city;
}
// Edit detailes
function update() {
    console.log(arrayFromApi[0]);

    const foundObj = arrayFromApi[0].find((item, i) => {
        return item.id == editId;
    });

    console.log("foundObj", foundObj);

    foundObj.name = document.querySelector(".iName").value;
    foundObj.email = document.querySelector(".iEmail").value;
    foundObj.address.city = document.getElementById("textarea").value;
    console.log("foundObj.name", foundObj);

    console.log(arrayFromApi[0]);
    buildTable(arrayFromApi[0]);
}

// Reset table
function clearFuncunction() {
    document.getElementById("iName").value = "";
    document.getElementById("iEmail").value = "";
    document.getElementById("textarea").value = "";
}
