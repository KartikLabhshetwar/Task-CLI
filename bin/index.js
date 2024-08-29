#! /usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");
const path = require("path");

const TASKS_FILE = "task.json";

function loadTasks(){
    if(!fs.existsSync(TASKS_FILE)) {
        return [];
    }

    const data = fs.readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
}

function saveTasks(tasks){
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function generateId(tasks){
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1: 1;
}

function addTask(description){
    const tasks = loadTasks();
    const newTask = {
        id: generateId(tasks),
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
    
}

function updateTask(id, description){
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if(task){
        task.description = description,
        task.updateAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task updated successfully (ID: ${id})`);
    } else{
        console.log(`Task with ID ${id} not found`);
    }
}

function deleteTask(id){
    const tasks = loadTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== parseInt(id));
    if(tasks.length < initialLength){
        saveTasks(tasks);
        console.log(`Task deleted successfully (ID: ${id})`);
    } else{
        console.log(`Task with ID ${id} not found`);
    }
}

function markTask(id, status){
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === parseInt(id));
    if(task){
        task.status = status;
        task.updateAt = new Date().toISOString();
        saveTasks(tasks);
        console.log(`Task marked as ${status} (ID ${id})`);
        
    } else{
        console.log(`Task with ID ${id} not found`);
        
    }
}

function listTasks(filter){
    const tasks = loadTasks();
    let filteredTasks = tasks;
    if(filter){
        filteredTasks = tasks.filter(t => t.status === filter);
    }
    if(filteredTasks.length === 0){
        console.log('No tasks found');
        
    } else{
        filteredTasks.forEach(t => {
            console.log(`[${t.id}] ${t.description} (${t.status})`);
            
        })
    }
}


yargs
    .command('add <description>', "Add a new task", {}, (argv) =>{
        addTask(argv.description)
    })
    .command('update <id> <description>', 'Update a task', {}, (argv)=>{
        updateTask(argv.id, argv.description)
    })
    .command('delete <id>', "Delete a task", {}, (argv)=>{
        deleteTask(argv.id)
    })
    .command('mark-in-progress <id>', "Mark a task as in progress", {}, (argv)=>{
        markTask(argv.id, 'in-progress')
    })
    .command('mark-done <id>', "Mark a task as done", {}, (argv) => {
        markTask(argv.id, 'done')
    })
    .command('list [filter]', 'List tasks', {}, (argv)=>{
        listTasks(argv.filter);
    })
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .argv;