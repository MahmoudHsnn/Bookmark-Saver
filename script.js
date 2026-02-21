let inputText = document.querySelector(".text");
let inputUrl = document.querySelector(".url");
let btn = document.querySelector("button");
let urlsList = document.querySelector("ul");
let regx = /(https:\/\/|http:\/\/)\w+.\w*/gi;

let urlArray = JSON.parse(localStorage.getItem("urls")) || [];

btn.addEventListener("click", function () {
  if (inputText.value == "" || inputUrl.value == "") {
    alert("fill all fields")
    return
  } else if (inputUrl.value.match(regx) == null) {
    alert("Please enter a valid URL starting with http:// or https://");
    return
  }

  addTask(inputText.value, inputUrl.value);

  inputText.value = "";
  inputUrl.value = "";
});

function addTask(textInput, urlInput) {
  const task = {
    id: Date.now(),
    title: textInput,
    url: urlInput,
  };

  urlArray.push(task);

  addElements(urlArray);
  saveData();
}

function addElements(urlArray) {
  urlsList.innerHTML = "";
  
  urlArray.forEach(function (task) {
    let li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `
    <a class="title" href="${task.url}" target="_blank">${task.title}</a>
    <span class="del">Remove</span>
    `;
    urlsList.appendChild(li)
  })
}

urlsList.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    urlArray = urlArray.filter(function (el) {
      return el.id != e.target.parentElement.getAttribute("data-id")
    })
    e.target.parentElement.remove();
    saveData();
  }
})

function saveData() {
  localStorage.setItem("urls", JSON.stringify(urlArray))
}

function getData() {
  addElements(JSON.parse(localStorage.getItem("urls")))
}

getData()

/*
Facebook
https://facebook.com

Google
https://Google.com


*/