const input = document.querySelector(".todoinput");
const button = document.querySelector("button");
const todoList = document.querySelector("#todoList");
const todoDone = document.querySelector("#todoDone");

button.addEventListener("click", addTask);

const tasks = []; // starter tomt

function addTask() {
  const text = input.value.trim(); // læs teksten fra input
  if (text === "") return; // hvis tom, stop

  const type = document.querySelector("#dropdown").value; //den lytter til værdien af dropdrown

  const task = {
    text: text,
    done: false,
    id: Date.now(),
    type: type,
  };

  tasks.push(task); // gem i array
  renderTasks(); // tegn listen igen
  input.value = ""; // ryd inputfelt
}

function renderTasks() {
  console.log("RENDER", tasks);
  todoList.innerHTML = ""; // ryd TODO-liste
  todoDone.innerHTML = ""; // ryd DONE-liste
  tasks.forEach((task) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // for hver opgave
    const li = document.createElement("li"); // lav et li
    const checkbox = document.createElement("input"); //her laver den input
    const label = document.createElement("label"); //lav label

    label.textContent = `${task.type}: ${task.text}`;
    checkbox.type = "checkbox"; //det input der bliver lavet, er defineret til at være checkbox.
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      renderTasks();
    });

    // li.textContent = task.text; // skriv teksten

    // Append
    li.appendChild(checkbox);
    li.appendChild(label);

    todoList.appendChild(li); // læg det i ul

    if (task.done) {
      todoDone.appendChild(li);
    } else {
      todoList.appendChild(li);
    } // når den får kategorien done, vil den blive flyttet til todoDone. men hvornår ved den at den er done?
  });
}
