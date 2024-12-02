document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTask');
    const taskInput = document.getElementById('taskInput');
    const columns = document.querySelectorAll('.task-list');
    const toggleThemeButton = document.getElementById('toggleTheme');
    let colorIndex = 1;
  
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTaskToList(taskText);
        taskInput.value = '';
      }
    });
  
    toggleThemeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  
    function addTaskToList(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.setAttribute('draggable', 'true');
    
        li.classList.add(`color-${colorIndex}`);
        colorIndex = colorIndex === 3 ? 1 : colorIndex + 1;
      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖'; // Botón más pequeño
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            li.remove();
        });
        
        li.appendChild(deleteButton);
    
        li.addEventListener('dragstart', () => {
            li.classList.add('dragging');
        });
    
        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });
    
        // Añadir a la lista
        document.getElementById('pendingList').appendChild(li);
    }
  
    columns.forEach(column => {
      column.addEventListener('dragover', e => {
        e.preventDefault();
        const draggingTask = document.querySelector('.dragging');
        column.appendChild(draggingTask);
      });
    });
  });

