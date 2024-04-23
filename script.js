document.addEventListener("DOMContentLoaded", function() {
  const todoList = document.getElementById("todo-list");
  const completedList = document.getElementById("completed-list");
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Load todos from localStorage
  todos.forEach(todo => addTodoItem(todo.text, todo.completed));

  todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      todoInput.value = "";
    }
  });

  function addTodoItem(text, completed = false) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span>
        <button type="button" class="btn btn-outline-primary btn-sm mark-completed">${completed ? "Completada" : "Completar"}</button>
        ${text}
      </span>
      <button type="button" class="btn btn-sm btn-danger">Eliminar</button>
    `;
    if (completed) {
      li.classList.add("completed");
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    const deleteButton = li.querySelector(".btn-danger");
    deleteButton.addEventListener("click", function() {
      li.classList.add("fade-out");
      setTimeout(() => {
        li.remove();
        updateLocalStorage();
      }, 500); 
    });

    const completeButton = li.querySelector(".mark-completed");
    completeButton.addEventListener("click", function() {
      li.classList.toggle("completed");
      if (li.classList.contains("completed")) {
        completeButton.textContent = "Completada";
        completedList.appendChild(li);
      } else {
        completeButton.textContent = "Completar";
        todoList.appendChild(li);
      }
      updateLocalStorage();
    });
  }

  function updateLocalStorage() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      todos.push({
        text: li.textContent.trim(),
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
