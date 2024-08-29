# Task Tracker CLI

A simple command-line interface (CLI) tool for tracking and managing your tasks. This project is built using Node.js and is perfect for developers who prefer working in the terminal.

## Features

- Add, update, and delete tasks
- Mark tasks as in progress or done
- List all tasks
- Filter tasks by status (todo, in-progress, done)
- Persistent storage using JSON file

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/task-tracker-cli.git
   cd task-tracker-cli
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Link the package globally:
   ```
   npm link
   ```

Now you can use the `task` command from anywhere in your terminal.

## Usage

Here are the available commands:

```
task add <description>           Add a new task
task update <id> <description>   Update a task
task delete <id>                 Delete a task
task mark-in-progress <id>       Mark a task as in progress
task mark-done <id>              Mark a task as done
task list [filter]               List tasks (optionally filter by status)
```

### Examples

1. Add a new task:
   ```
   task add "Buy groceries"
   ```

2. Update a task:
   ```
   task update 1 "Buy groceries and cook dinner"
   ```

3. Mark a task as in progress:
   ```
   task mark-in-progress 1
   ```

4. Mark a task as done:
   ```
   task mark-done 1
   ```

5. List all tasks:
   ```
   task list
   ```

6. List tasks with a specific status:
   ```
   task list todo
   task list in-progress
   task list done
   ```

7. Delete a task:
   ```
   task delete 1
   ```

## Data Storage

Tasks are stored in a `task.json` file in the same directory as the script. This file is created automatically when you add your first task.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [ISC License](LICENSE).

## Author

Kartik Labhshetwar

---

Happy task tracking!
