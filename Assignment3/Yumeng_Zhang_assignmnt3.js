//Q1
const tableInfo = {
  tableHeader: ["Student Name", "Age", "Phone", "Address"],
  tableContent: [
    {
      "Student Name": "John",
      Age: 19,
      Phone: "455 - 983 - 0903",
      Address: "123 Ave, San Francisco, CA, 94011",
    },
    {
      "Student Name": "Alex",
      Age: 21,
      Phone: "455 - 983 - 0912",
      Address: "456 Rd, San Francisco, CA, 94012",
    },
    {
      "Student Name": "Josh",
      Age: 22,
      Phone: "455 - 345 - 0912",
      Address: "789 Dr, Newark, CA, 94016",
    },
    {
      "Student Name": "Matt",
      Age: 23,
      Phone: "321 - 345 - 0912",
      Address: "223 Dr, Sunnyvale, CA, 94016",
    },
  ],
};

let table = document.createElement("table");
table.setAttribute("id", "myTable");
for (let i = 0; i < tableInfo.tableContent.length; i++) {
  let row = table.insertRow(i);
  let myName = row.insertCell(0);
  let myAge = row.insertCell(1);
  let myPhone = row.insertCell(2);
  let myAddress = row.insertCell(3);
  myName.innerHTML = tableInfo.tableContent[i]["Student Name"];
  myName.setAttribute("class", "myName");
  myAge.innerHTML = tableInfo.tableContent[i].Age;
  myAge.setAttribute("class", "myAge");
  myPhone.innerHTML = tableInfo.tableContent[i].Phone;
  myPhone.setAttribute("class", "myPhone");
  myAddress.innerHTML = tableInfo.tableContent[i].Address;
  myAddress.setAttribute("class", "myAddress");
}
let header = table.createTHead();
let headerRow = header.insertRow(0);
for (var i = 0; i < tableInfo.tableHeader.length; i++) {
  let cur = headerRow.insertCell(i);
  cur.innerHTML = tableInfo.tableHeader[i];
  cur.setAttribute("class", "myHeader");
}
document.body.append(table);

let formClick = document.getElementById("button");
formClick.onclick = function (e) {
  e.preventDefault();
  let newRow = table.insertRow();
  let newName = newRow.insertCell(0);
  newName.setAttribute("class", "myName");
  let newAge = newRow.insertCell(1);
  newAge.setAttribute("class", "myAge");
  let newPhone = newRow.insertCell(2);
  newPhone.setAttribute("class", "myPhone");
  let newAddress = newRow.insertCell(3);
  newAddress.setAttribute("class", "myAddress");
  newName.innerHTML = document.querySelector("#student_name").value;
  newAge.innerHTML = document.querySelector("#age").value;
  newPhone.innerHTML = document.querySelector("#phone").value;
  newAddress.innerHTML = document.querySelector("#address").value;
  document.querySelector("#form").reset();
};

//Q2
const list = ["HTML", "JavaScript", "CSS", "React", "Redux", "Java"];
let orderList = document.createElement("ol");
list.forEach((e) => {
  let l = document.createElement("li");
  l.innerText = e;
  orderList.appendChild(l);
});
document.getElementById("order_list").append(orderList);

let unorderList = document.createElement("ul");
list.forEach((e) => {
  let l = document.createElement("li");
  l.innerText = e;
  unorderList.appendChild(l);
});
document.getElementById("unorder_list").append(unorderList);

//Q3
const dropDownList = [
  { value: "newark", content: "Newark" },
  { value: "santaClara", content: "Santa Clara" },
  { value: "unionCity", content: "Union City" },
  { value: "albany", content: "Albany" },
  { value: "dalyCity", content: "Daly City" },
  { value: "sanJose", content: "San Jose" },
];

let selector = document.querySelector("#selector");
let select = document.createElement("select");
select.setAttribute("id", "mySelect");
dropDownList.forEach((e) => {
  let option = document.createElement("option");
  option.setAttribute("class", "myOption");
  option.value = e.value;
  option.text = e.content;
  select.appendChild(option);
});
selector.append(select);
let myOption = document.querySelector(".myOption");
function listQ() {
  console.log(this.value);
}
document.getElementById("mySelect").onchange = listQ;
