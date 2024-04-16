document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const searchForm = document.getElementById("search-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const completedList = document.getElementById("completed-list");
  
    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const todoText = todoInput.value.trim();
      if (todoText !== "") {
        addTodoItem(todoText);
        todoInput.value = "";
      }
    });
      
  
    function addTodoItem(text) {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>
          <input type="checkbox">
          ${text}
        </span>
        <button type="button" class="btn btn-sm btn-danger">Eliminar</button>
      `;
      todoList.appendChild(li);
  
      const checkbox = li.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
          li.classList.add("completed");
          completedList.appendChild(li);
        } else {
          li.classList.remove("completed");
          todoList.appendChild(li);
        }
      });
  
      const deleteButton = li.querySelector("button");
      deleteButton.addEventListener("click", function() {
        li.classList.add("fade-out");
        setTimeout(() => li.remove(), 500); // Delay removal to allow animation
      });
    }
  });
  