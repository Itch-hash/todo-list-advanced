function addTask(event) {
  event.preventDefault();
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const newLi = document.createElement("li");
  newLi.classList.add(
    "flex",
    "items-center",
    "bg-gray-50",
    "p-3",
    "rounded-lg",
    "shadow-sm"
  );
  newLi.id = "task-" + Date.now();

  const newInput = document.createElement("input");
  newInput.type = "checkbox";
  const checkboxId = "checkbox-" + Date.now();
  newInput.id = checkboxId;
  newInput.classList.add(
    "form-checkbox",
    "h-5",
    "w-5",
    "rounded-md",
    "mr-3",
    "cursor-pointer"
  );
  newLi.appendChild(newInput);
  newInput.addEventListener("change", () => doneTask(newLabel, newInput));
  const newLabel = document.createElement("label");
  newLabel.htmlFor = checkboxId;
  newLabel.classList.add("flex-grow", "text-lg", "text-gray-800");
  newLabel.textContent = taskInput.value;
  newLi.appendChild(newLabel);

  const newButton = document.createElement("button");
  newButton.classList.add(
    "ml-auto",
    "text-red-500",
    "hover:text-red-700",
    "hover:cursor-pointer",
    "focus:outline-none"
  );
  newButton.addEventListener("click", () => removeTask(newLi));
  newLi.appendChild(newButton);

  const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSvg.classList.add("w-6", "h-6");
  newSvg.setAttribute("fill", "none");
  newSvg.setAttribute("stroke", "currentColor");
  newSvg.setAttribute("viewBox", "0 0 24 24");

  const newPath = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  newPath.setAttribute("stroke-linecap", "round");
  newPath.setAttribute("stroke-linejoin", "round");
  newPath.setAttribute("stroke-width", "2");
  newPath.setAttribute("d", "M6 18L18 6M6 6l12 12");
  newSvg.appendChild(newPath);

  newButton.appendChild(newSvg);

  taskList.appendChild(newLi);
  taskInput.value = "";
  saveList();
}

function removeTask(newLi) {
  newLi.remove();
  saveList();
}

function doneTask(newLabel, newInput) {
  if (newInput.checked) {
    newLabel.classList.add("line-through");
    newLabel.classList.replace("text-gray-800", "text-gray-500");
  } else {
    newLabel.classList.remove("line-through");
    newLabel.classList.replace("text-gray-500", "text-gray-800");
  }
  saveList();
}

function saveList() {
  const savedList = [];

  taskList.querySelectorAll("li").forEach((liElement) => {
    const checkbox = liElement.querySelector('input[type="checkbox"]');
    const label = liElement.querySelector("label");

    if (checkbox && label) {
      savedList.push({
        // Push a *new object* for *each* <li>
        id: liElement.id, // Get the unique ID for the task
        text: label.textContent, // Get the task's text
        isChecked: checkbox.checked, // Get the checkbox's state
      });
    }
  });

  localStorage.setItem("saved list", JSON.stringify(savedList));
}

document.addEventListener("DOMContentLoaded", function () {
  const savedList = JSON.parse(localStorage.getItem("saved list"));
  console.log(savedList);
});
