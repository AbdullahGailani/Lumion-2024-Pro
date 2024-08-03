const tasksContainer = document.querySelector(".tasks");
const tasksContainerFinish = document.querySelector(".tasks--finish");
const addBtn = document.querySelector(".add");
const inputNewTask = document.querySelector(".input");
const dateLabel = document.querySelectorAll(".date");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const loginBtn = document.querySelector(".login--btn");
const loginAppContainer = document.querySelector(".login");
const taskContainer = document.querySelector(".hidden__container--1");
const finishTaskContainer = document.querySelector(".hidden__container--2");
const greet = document.querySelector(".greet");
const body = document.querySelector("body");
const changeBtn = document.querySelectorAll(".change--container");

// creating accounts in javascript because no back-end used !
// using weak password to enter faster while testing

class Account {
  #email;
  #password;
  #owner;

  constructor(email, password, tasks, owner, finishTasks) {
    this.email = email;
    this.password = password;
    this.tasks = tasks;
    this.owner = owner;
    this.finishTasks = finishTasks;
  }
}

const abdullah = new Account(
  "abdullah@maingroup.com",
  111,
  ["study web", "go to work", "sleep"],
  "Abdullah",
  []
);

console.log(abdullah.finishTasks);

const sabr = new Account(
  "sabr@maingroup.com",
  222,
  ["study design", "go to work", "watch movie"],
  "Sabr",
  []
);

const ayad = new Account(
  "ayad@maingroup.com",
  333,
  ["study web", "Shex chaw chawanem krd", "Xo juwan krdn"],
  "Ayad",
  []
);

const shkar = new Account(
  "shkar@maingroup.com",
  444,
  ["xindn lo awail bun", "study to be awail", "again xindn"],
  "Shkar",
  []
);

const accounts = [abdullah, sabr, ayad, shkar];

//functions
const updateTasks = function (account) {
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

const updateFinishTasks = function (account) {
  tasksContainerFinish.innerHTML = "";
  account.finishTasks.forEach((task) => {
    const html = `
    <div class="task">
       <p class="t">${task}</p>
       <div class="btns">
          <button class="remove rm-Finish">
          <i
             class="fa-solid fa-x"
             style="color: #ffffff; font-size: 20px"
             ></i>
          </button>
       </div>
    </div>
    `;
    tasksContainerFinish.insertAdjacentHTML("afterbegin", html);
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

const emptyFinishTaskAlert = function () {
  const html = `<div class="task">
                   <p class="no--task">No task Has been finished</p>
                </div>`;
  tasksContainerFinish.insertAdjacentHTML("afterbegin", html);
};

const emptyTaskAlert = function () {
  const html = `<div class="task">
                   <p class="no--task">Add new task to get start!</p>
                </div>`;
  tasksContainer.insertAdjacentHTML("afterbegin", html);
};

const greeting = function (acconut) {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 12) {
    greet.textContent = `Good Morning, ${acconut.owner}`;
  } else if (hours >= 12 && hours < 18) {
    greet.textContent = `Good Afternoon, ${acconut.owner}`;
  } else if (hours >= 18 && hours < 24) {
    greet.textContent = `Good Evening, ${acconut.owner}`;
  }

  console.log(hours);
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

  dateLabel.forEach(
    (d) =>
      (d.textContent = `${date.getDate()}/ ${
        shortMonths[date.getMonth()]
      } / ${date.getFullYear()}`)
  );
};

const switchUI = function (container) {
  taskContainer.classList.add("hidden__container--1");
  finishTaskContainer.classList.add("hidden__container--2");
  taskContainer.classList.remove("container--active");
  finishTaskContainer.classList.remove("container--active");

  activeContainer =
    activeContainer === 1 ? (activeContainer = 2) : (activeContainer = 1);

  console.log(activeContainer);

  document
    .querySelector(`.container--${activeContainer}`)
    .classList.remove(`hidden__container--${activeContainer}`);

  document
    .querySelector(`.container--${activeContainer}`)
    .classList.add(`container--active`);
};

const updateUI = function () {
  updateTasks(activeAccount);
  greeting(activeAccount);

  taskContainer.classList.remove("hidden__container--1");
  taskContainer.classList.add("container--active");
  loginAppContainer.classList.add("container--hidden");
};

// creatint active account in global scobe we might need it later

let activeContainer = 1;
let activeAccount;

// event listeners

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const account = accounts.find((acc) => acc.email === emailInput.value);
  if (account.password === Number(passwordInput.value)) {
    activeAccount = account;

    updateUI();
  } else {
    console.log("error");
  }
});

//using event delegation

tasksContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.closest(".done")) {
    const finish = e.target.closest(".task").querySelector("p").textContent;
    e.target.closest(".task").remove();
    activeAccount.finishTasks.push(finish);

    updateFinishTasks(activeAccount);
  }
  if (e.target.closest(".remove")) {
    if (e.target.classList.contains("remove")) {
      const a = e.target.closest(".task").querySelector("p").textContent;
      const index = activeAccount.finishTasks.indexOf(a);
      activeAccount.tasks.splice(index, 1);
      console.log(activeAccount.tasks.length);
      activeAccount.tasks.length === 0 ? emptyTaskAlert() : "";
    }
    e.target.closest(".task").remove();
  }
});

finishTaskContainer.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.closest(".done")) {
    const finish = e.target.closest(".task").querySelector("p").textContent;
    e.target.closest(".task").remove();
    activeAccount.finishTasks.push(finish);

    updateFinishTasks(activeAccount);
  }
  if (e.target.closest(".remove")) {
    if (e.target.classList.contains("rm-Finish")) {
      const a = e.target.closest(".task").querySelector("p").textContent;
      const index = activeAccount.finishTasks.indexOf(a);
      activeAccount.finishTasks.splice(index, 1);
      activeAccount.finishTasks.length === 0 ? emptyFinishTaskAlert() : "";
    }
    e.target.closest(".task").remove();
  }
});

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  activeAccount.tasks.push(inputNewTask.value);
  updateLast(activeAccount);
  inputNewTask.value = "";
});

changeBtn.forEach((btn) => btn.addEventListener("click", switchUI));
