#!/usr/bin/env node

const {
  initializeDb,
  addTask,
  deleteTask,
  updateTask,
  listAllTasks,
  updateTaskStatus,
} = require("./functions");

(() => {
  initializeDb();
  const [action, ...args] = process.argv.splice(2);
  try {
    switch (action) {
      case "add":
        {
          const task = args[0];
          addTask(task);
        }
        break;
      case "delete":
        {
          const id = args[0];
          deleteTask(id);
        }
        break;
      case "update":
        {
          if (args.length >= 2) {
            const id = args[0];
            const updatedTask = args[1];
            updateTask(id, updatedTask);
          } else {
            throw "Error: arguements missing";
          }
        }
        break;
      case "list":
        {
          let status = "";
          if (args.length > 0) {
            status = args[0];
          }
          listAllTasks(status);
        }
        break;
      case "mark-in-progress":
        {
          if (args.length > 0) {
            const id = args[0];
            updateTaskStatus(id, "in-progress");
          } else {
            throw "Error: missing arguement 'id'";
          }
        }

        break;
      case "mark-done":
        {
          if (args.length > 0) {
            const id = args[0];
            updateTaskStatus(id, "done");
          } else {
            throw "Error: missing arguement 'id'";
          }
        }

        break;
      case "mark-todo":
        {
          if (args.length > 0) {
            const id = args[0];
            updateTaskStatus(id, "todo");
          } else {
            throw "Error: missing arguement 'id'";
          }
        }

        break;
    }
  } catch (err) {
    console.log(err);
  }
})();
