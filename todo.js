const { Command } = require('commander');
const program = new Command(); 
const fsPromises = require('fs').promises;
let todos = [{
    id: "",
    status: false,
    description: ""
}]
const filePath = './todos.json';
let id = 0;
//name a command
//give description about what it does
//set the version
program
    .name('todo')
    .description('View, Add, Update and Delete, your Tasks Here')
    .version('1.0.2')



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
program
    .command("list")
    .description("list all the tasks")
    .action(async ()=>{
        try{
            //get the data:
            let data = await fsPromises.readFile(filePath,'utf-8');
            //parse into object:
                let todos = JSON.parse(data).todos;
            //display the data
               todos.forEach((todo)=>{
                const status = todo.status ? "Completed" : "Not Completed";
                console.log(`Description: ${todo.description}, Status: ${status}`);
               });
        }catch(error){
            console.error(error);
        }
    });

program.parse();