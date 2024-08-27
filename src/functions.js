const fs = require("fs");
const path = require("path");

const dbDir = "db";
const filePath = path.join(dbDir, "tasks.json");

const addFakeData = () => {
  return [
    {
      id: 1,
      description: "some description of the task",
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 2,
      description: "second task",
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
};

const initializeDb = () => {
  const isDbDirectorExist = fs.existsSync(dbDir);
  if (!isDbDirectorExist) {
    fs.mkdirSync(dbDir);
    // checking if file exist
    if (!fs.existsSync(filePath)) {
      // initialize file
      fs.writeFileSync(filePath, JSON.stringify(addFakeData()));
    }
    console.log("Database initialized!");
  }
};

const handleReadFile = (filePath) => fs.readFileSync(filePath, "utf-8");
const handleWriteFile = (filePath, content) =>
  fs.writeFileSync(filePath, content);

function deleteTask(id) {
  const fileData = handleReadFile(filePath);
  let tasks = fileData ? JSON.parse(fileData) : [];

  try {
    if (!tasks.length) {
      throw "No data available";
    } else {
      const findItemToBeDelete = tasks.find((task) => task.id == id);
      if (!findItemToBeDelete) throw "No record found with id: " + id;
      const updatedTasks = tasks.filter((task) => task.id != id);
      handleWriteFile(filePath, JSON.stringify(updatedTasks));
      console.log("File deleted successfully");
    }
  } catch (err) {
    console.log(err);
  }
}

function addTask(task) {
  fs.readFile(filePath, "utf-8", function (err, data) {
    // parsing data
    const tasks = data ? JSON.parse(data) : [];
    // generating ID
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    //   updating task array
    tasks.push({
      id,
      description: task,
      status: "todo", // default status
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    // re writing the file
    fs.writeFile(filePath, JSON.stringify(tasks), function (err) {
      if (err) throw err;
      console.log("task added");
    });
  });
}

function updateTask(id, updatedTask) {
  const fileData = handleReadFile(filePath);
  const tasks = fileData ? JSON.parse(fileData) : [];

  // find the task with id
  const idxOfTheTaskToUpdate = tasks.findIndex((task) => task.id == id);

  if (idxOfTheTaskToUpdate == -1) {
    throw "No record found with this id: " + id;
  }

  tasks[idxOfTheTaskToUpdate].description = updatedTask;
  tasks[idxOfTheTaskToUpdate].updatedAt = Date.now();
  handleWriteFile(filePath, JSON.stringify(tasks));
  console.log("Task updated successfully!");
}

function listAllTasks(status = "") {
  const fileData = handleReadFile(filePath);
  let tasks = fileData ? JSON.parse(fileData) : [];

  if (!tasks.length) {
    console.log("Task list is empty");
    return;
  }
  console.log(`ID | Description | Status | Last Updated At`);

  if (status) {
    tasks = tasks.filter((task) => task.status == status);
  }
  tasks.forEach((task) =>
    console.log(
      `${task.id} | ${task.description} | ${
        task.status
      } | ${new Date().toISOString(task.updatedAt)}`
    )
  );
}

function updateTaskStatus(id, status) {
  const fileData = handleReadFile(filePath);
  const tasks = fileData ? JSON.parse(fileData) : [];

  // find the task with id
  const idxOfTheTaskToUpdate = tasks.findIndex((task) => task.id == id);

  if (idxOfTheTaskToUpdate == -1) {
    throw "No record found with this id: " + id;
  }

  tasks[idxOfTheTaskToUpdate].status = status;
  tasks[idxOfTheTaskToUpdate].updatedAt = Date.now();
  handleWriteFile(filePath, JSON.stringify(tasks));
  console.log("Task status updated successfully!");
}

module.exports = {
  initializeDb,
  addTask,
  updateTask,
  deleteTask,
  listAllTasks,
  updateTaskStatus,
};
