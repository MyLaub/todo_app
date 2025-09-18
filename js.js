const input = document.querySelector(".todoinput");
const button = document.querySelector("button");
const todoList = document.querySelector("#todoList");
const todoDone = document.querySelector("#todoDone");

button.addEventListener("click", addTask);

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

renderTasks();

function addTask() {
  const text = input.value.trim(); // læs teksten fra input
  if (text === "") return; // hvis input er tom

  const type = document.querySelector("#dropdown").value; //den lytter til værdien af dropdrown

  const task = {
    text: text,
    done: false,
    id: Date.now(),
    type: type,
  };

  tasks.push(task); // gem i array
  saveTasks(); // gem i localstorage
  renderTasks(); // skriv listen igen
  input.value = ""; // ryd inputfelt
}

function renderTasks() {
  console.log("RENDER", tasks);
  todoList.innerHTML = ""; // ryd TODO-liste
  todoDone.innerHTML = ""; // ryd DONE-liste
  tasks.forEach((task) => {
    // for hver opgave
    const li = document.createElement("li"); // lav et li
    const checkbox = document.createElement("input"); //her laver den input
    const label = document.createElement("label"); //lav label

    //Delete knap
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete task";
    deleteBtn.classList.add("delete-btn"); // giver en klasse til styling
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    label.textContent = `${task.type}: ${task.text}`;
    checkbox.type = "checkbox"; //det input der bliver lavet, er defineret til at være checkbox.
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // Append
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    if (task.done) {
      todoDone.appendChild(li);
    } else {
      todoList.appendChild(li);
    } // når den får kategorien done, vil den blive flyttet til todoDone.
  });
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id); // find den klikkede opgaves index
  if (index > -1) {
    tasks.splice(index, 1); // fjern netop den
    saveTasks();
    renderTasks(); // opdater DOM
  }
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks)); // gemmer tasks array i json streng
}
