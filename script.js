document.addEventListener("DOMContentLoaded", function() {
  const todoList = document.getElementById("todo-list");
  const completedList = document.getElementById("completed-list");
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const themeSelect = document.getElementById("themeSelect");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");

  // Cargar tareas y tema desde el almacenamiento local al iniciar
  loadTodosFromStorage();
  applySavedTheme();

  todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText, false);
      todoInput.value = "";
      updateStorage();
    }
  });

  saveSettingsBtn.addEventListener("click", function() {
    const selectedTheme = themeSelect.value;
    changeTheme(selectedTheme);
    $('#settings-modal').modal('hide');
  });

  themeSelect.addEventListener('change', function() {
    changeTheme(this.value);
  });

  function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'default';
    changeTheme(savedTheme);
    themeSelect.value = savedTheme;
  }

  function changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }

  function loadTodosFromStorage() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => addTodoItem(todo.text, todo.completed));
  }

  function addTodoItem(text, completed) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const textSpan = document.createElement("span");
    textSpan.textContent = text;
    li.appendChild(textSpan);

    const div = document.createElement("div");

    const completeButton = document.createElement("button");
    completeButton.className = "btn btn-outline-primary btn-sm";
    completeButton.textContent = completed ? "Completada" : "Completar";
    completeButton.addEventListener("click", () => toggleComplete(li, completeButton));
    div.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-sm btn-danger";
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", () => {
      li.remove();
      updateStorage();
    });
    div.appendChild(deleteButton);

    li.appendChild(div);

    if (completed) {
      li.classList.add("completed");
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  }

  function toggleComplete(li, button) {
    const isCompleted = li.classList.contains("completed");
    li.classList.toggle("completed");
    button.textContent = isCompleted ? "Completar" : "Completada";
    if (isCompleted) {
      todoList.appendChild(li);
    } else {
      completedList.appendChild(li);
    }
    updateStorage();
  }

  function updateStorage() {
    const todos = [];
    document.querySelectorAll("#todo-list li, #completed-list li").forEach(li => {
      const taskText = li.querySelector("span").textContent;
      todos.push({ text: taskText, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
