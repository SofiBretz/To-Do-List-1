import task from './task';

const LOCAL_STORAGE_LIST_KEY = 'task.lists';
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY);

const listsContainer = document.querySelector('[data-lists]');
const newListForm = document.querySelector('[data-new-list-form]');
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]');
const createList = (name) => ({ id: Date.now().toString(), name, tasks: [] });
const completedTask = document.querySelector('[data-completed-task]');
const taskForm = task();

const save = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId);
};

const addingEntry = () => {
  listsContainer.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId;
      save();
      todoList();
    }
  });

  deleteListButton.addEventListener('click', (e) => {
    lists = lists.filter((list) => list.id !== selectedListId);
    selectedListId = null;
    save();
    todoList();
  });

  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = newListInput.value;
    if (listName == null || listName === '') return;
    const list = createList(listName);
    newListInput.value = null;
    lists.push(list);
    save();
    // todoList();
  });
};

completedTask.addEventListener('click', (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.taskForm.getTaskForm = selectedList.getTaskForm.filter((tak) => !tak.complete);
  save();
});


taskForm.getTaskForm().addEventListener('submit', (e) => {
  e.preventDefault();
  const taskName = taskForm.getTaskInput().value;
  if (taskName == null || taskName === '') return;
  const tks = taskForm.createTask(taskName);
  taskForm.getTaskInput().value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.task.push(tks);
  save();
  todoList();
});

function renderList() {
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.dataset.listId = list.id;
    listElement.classList.add('list-group-item');
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      console.log(selectedListId);
      listElement.classList.add('active');
    }
    listsContainer.appendChild(listElement);
  });
}

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
const taskTemplate = document.getElementById('task-template');
function renderTasks(task) {
  tasks.tasks.forEach((t) => {
    const taskElement = document.importNode(taskTemplate.content, true);
  });
}

const todoList = () => {
  clearElement(listsContainer);
  renderList();
  const selectedList = lists.find((list) => list.id === selectedListId);
  const tasking = task();
  if (selectedListId == null) {
    tasking.getListContainer().style.display = 'none';
  } else {
    tasking.getListContainer().style.display = ' ';
    tasking.getListTitle().innerText = selectedList.name;
  }
  clearElement(tasking.getTaskContainer());
  renderTasks(selectedList);
};


todoList();
addingEntry();
