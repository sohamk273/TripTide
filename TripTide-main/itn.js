document.addEventListener('DOMContentLoaded', () => {
    const addDayBtn = document.getElementById('add-day-btn');
    const newDayInput = document.getElementById('new-day-input');
    const itineraryList = document.querySelector('.itinerary-list');
    let itinerary = {}; // Object to store the itinerary

    addDayBtn.addEventListener('click', () => {
        const dayName = newDayInput.value.trim();
        if (dayName) {
            if (!itinerary[dayName]) {
                itinerary[dayName] = [];
                renderItinerary();
                newDayInput.value = '';
            } else {
                alert('Day already exists!');
            }
        }
    });

    function renderItinerary() {
        itineraryList.innerHTML = '';
        for (const day in itinerary) {
            const dayScheduleDiv = document.createElement('div');
            dayScheduleDiv.classList.add('day-schedule');

            const dayHeading = document.createElement('h3');
            dayHeading.textContent = day;

            const addTaskDiv = document.createElement('div');
            addTaskDiv.classList.add('add-task');
            const taskInput = document.createElement('input');
            taskInput.type = 'text';
            taskInput.classList.add('task-input');
            taskInput.placeholder = 'Add task';
            const timeInput = document.createElement('input');
            timeInput.type = 'time';
            timeInput.classList.add('time-input');
            const addTaskButton = document.createElement('button');
            addTaskButton.textContent = 'Add Activity';
            addTaskButton.classList.add('add-task-btn');
            addTaskDiv.appendChild(taskInput);
            addTaskDiv.appendChild(timeInput);
            addTaskDiv.appendChild(addTaskButton);

            const taskList = document.createElement('ul');
            taskList.classList.add('task-list');

            // Function to handle adding a task for this specific day
            addTaskButton.addEventListener('click', () => {
                const taskDescription = taskInput.value.trim();
                const taskTime = timeInput.value;
                if (taskDescription && taskTime) {
                    itinerary[day].push({ time: taskTime, description: taskDescription });
                    renderItinerary(); // Re-render to show the new task
                    taskInput.value = '';
                    timeInput.value = '';
                }
            });

            itinerary[day].forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <span class="task-time">${task.time}</span>
                    <span class="task-description">${task.description}</span>
                    <button class="delete-task-btn" data-day="${day}" data-index="${index}">&#10006;</button>
                `;
                taskList.appendChild(listItem);
            });

            dayScheduleDiv.appendChild(dayHeading);
            dayScheduleDiv.appendChild(addTaskDiv);
            dayScheduleDiv.appendChild(taskList);
            itineraryList.appendChild(dayScheduleDiv);
        }

        // Add event listeners for delete buttons after rendering
        const deleteButtons = document.querySelectorAll('.delete-task-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const dayToDeleteFrom = this.dataset.day;
                const indexToDelete = parseInt(this.dataset.index);
                itinerary[dayToDeleteFrom].splice(indexToDelete, 1);
                renderItinerary(); // Re-render after deletion
            });
        });
    }
});