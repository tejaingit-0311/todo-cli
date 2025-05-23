const { Command } = require('commander');
const program = new Command(); 
const fs = require('fs');
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
    .version('1.0.1')



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
    .action(()=>{
        fs.readFile(filePath,'utf-8',function(err, data){
            if(err) throw err;
            //console.log(data);
            let todosJson = JSON.parse(data);
            let todos = todosJson.todos;
            for(let todo of todos){
                //console.log(todo);
                let isComplete = ""
                if(todo.status){
                    isComplete="Completed";
                }else{
                    isComplete="Not Completed";
                }
                console.log(`Description : ${todo.description}, Status: ${isComplete}`);
            }
           
        });

    })

program.parse();