const { Command } = require('commander');
const program = new Command(); 

let todos = [{
    id: "",
    status: false,
    description: ""
}]
let id = 0;
//name a command
//give description about what it does
//set the version
program
    .name('todo')
    .description('View, Add, Update and Delete, your Tasks Here')


//add:
// command :  todo add <description>:

//view:
// command : todo list
    //options:
    //todo list --completed     # Only completed tasks
    //todo list --pending      # Only pending tasks

//update:
// command : todo update <id-to-update> <task-to-update-with> 

//delete:
// command : task delete <id-to-delete>

//add-command:
program
    .command("add")
    .description("adds a specified description")
    .argument("<description>",  "Text describing the task, to be added.")
    .action((newtask)=>{
        //create a task object:
        console.log(newtask);
        const todo = {
            id: ++id,
            status: false,
            description: newtask       
        }
        
        // add the task
        todos.push(todo);
        console.log("Task added:", newtask);
        console.log(todos);
    })

//view-command:

program.parse();