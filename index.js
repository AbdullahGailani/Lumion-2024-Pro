const tasksContainer = document.querySelector(".tasks");
const addBtn = document.querySelector(".add");
const inputNewTask = document.querySelector(".input");
const dateLabel = document.querySelector(".date");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const loginBtn = document.querySelector(".login--btn");
const loginAppContainer = document.querySelector(".login");
const appContainer = document.querySelector(".container");
const greet = document.querySelector(".greet");

// creating accounts in javascript because no back-end used !
// using weak password to enter faster while testing
const abdullah = {
  email: "abdullah@maingroup.com",
  password: 111,
  tasks: ["study web", "go to work", "sleep"],
  owner: "Abdullah",
};

const sabr = {
  email: "sabr@maingroup.com",
  password: 222,
  tasks: ["study design", "go to work", "watch movie"],
  owner: "Sabr",
};

const ayad = {
  email: "ayad@maingroup.com",
  password: 333,
  tasks: ["study web", "Shex chaw chawanem krd", "Xo juwan krdn"],
  owner: "Ayad",
};

const shkar = {
  email: "shkar@maingroup.com",
  password: 444,
  tasks: ["xindn lo awail bun", "study to be awail", "again xindn"],
  owner: "Shkar",
};

const accounts = [abdullah, sabr, ayad, shkar];

//functions
const updateUI = function (account) {
  tasksContainer.innerHTML = "";
  account.tasks.forEach((task) => {
    const html = `
    <div class="task">
       <p class="t">${task}</p>
       <div class="btns">
          <button class="done">
          <i
             class="fa-solid fa-check"
             style="color: #ffffff; font-size: 20px"
             ></i>
          </button>
          <button class="remove">
          <i
             class="fa-solid fa-x"
             style="color: #ffffff; font-size: 20px"
             ></i>
          </button>
       </div>
    </div>
    `;
    tasksContainer.insertAdjacentHTML("afterbegin", html);
  });
};
// adding element to last item in arry

const updateLast = function (account) {
  const html = `
  <div class="task">
     <p class="t">${account.tasks[account.tasks.length - 1]}</p>
     <div class="btns">
        <button class="done">
        <i
           class="fa-solid fa-check"
           style="color: #ffffff; font-size: 20px"
           ></i>
        </button>
        <button class="remove">
        <i
           class="fa-solid fa-x"
           style="color: #ffffff; font-size: 20px"
           ></i>
        </button>
     </div>
  </div>
  `;
  tasksContainer.insertAdjacentHTML("afterbegin", html);
};

const greeting = function (acconut) {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 12) {
    greet.textContent = `Good Morning, ${acconut.owner}`;
  } else if (hours >= 12 && hours < 18) {
    greet.textContent = `Good Afternoon, ${acconut.owner}`;
  } else if (hours >= 18 && hours < 0) {
    greet.textContent = `Good Evening, ${acconut.owner}`;
  }

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  dateLabel.textContent = `${date.getDate()}/ ${
    shortMonths[date.getMonth()]
  } / ${date.getFullYear()}`;
};

// creatint active account in global scobe we might need it later

let activeAccount;

// event listeners

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const account = accounts.find((acc) => acc.email === emailInput.value);
  if (account.password === Number(passwordInput.value)) {
    activeAccount = account;
    updateUI(activeAccount);
    greeting(activeAccount);
    appContainer.classList.remove("container--hidden");
    loginAppContainer.classList.add("container--hidden");
  }
});

//using event delegation

tasksContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.closest(".done")) {
    e.target
      .closest(".task")
      .querySelector("p")
      .classList.add("task__finished");
  }
  if (e.target.closest(".remove")) {
    e.target.closest(".task").remove();
  }
});

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeAccount.tasks.push(inputNewTask.value);
  updateLast(activeAccount);
  inputNewTask.value = "";
});
