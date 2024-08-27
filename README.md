## Task Tracker CLI

A practice project of https://roadmap.sh/projects/task-tracker,
Task Tracker is a command-line application to manage and track your tasks. This simple tool allows you to add, update, delete, and list tasks, as well as mark them as "in progress," "done," or "todo."

### Features

- Add a Task: Create a new task with a default status of "todo."
- Update a Task: Modify the description of an existing task.
- Delete a Task: Remove a task by its ID.
- List Tasks: View all tasks, or filter by status (e.g., "done", "in-progress", "todo").
- Mark Task Status: Change the status of a task to "in progress," "done," or "todo."

### Requirements

Node.js installed on your machine.

### Setup Instructions

1- Clone the repository

```bash
git clone https://github.com/fahadaleem/task-tracker-cli
cd task-tracker-cli
```

2- Install Dependencies

```bash
npm install
```

3- Run the Application

To start using the Task Tracker, you can use the following commands:

```bash
npm install -g
task-tracker-cli <action> [arguments]
```

## Usage/Examples

- Add a Task

```bash
task-tracker-cli add "Task description"
```

- Delete a Task

```bash
task-tracker-cli delete <task-id>
```

- Update a Task

```bash
task-tracker-cli update <task-id> "Updated task description"
```

- List All Tasks

```bash
task-tracker-cli list
```

- List Tasks by Status

```bash
task-tracker-cli list <status>
# Status can be "todo", "in-progress", or "done"
```

- Mark a Task as In Progress

```bash
task-tracker-cli mark-in-progress <task-id>
```

- Mark a Task as Done

```bash
task-tracker-cli mark-done <task-id>
```

- Mark a Task as Todo

```bash
task-tracker-cli mark-todo <task-id>
```
