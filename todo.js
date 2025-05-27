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
    .version('1.0.3')


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

//update-command:
// read-file->data.id === id-> data.desc = description->write data into file

program
    .command('update')
    .description('Updates the existing task')
    .argument("<id>", "id of which task has to be updated")
    .argument("<description>", "add a description")
    .action(async (idArg, description)=>{
        //parse into number:
        let id = parseInt(idArg, 10);
        try{
            //read file to get data:
            let data = await fsPromises.readFile(filePath, "utf-8");
            //parse JSON into object and extract todos[]:
            let todos = JSON.parse(data).todos;
            //iterate on array and find id:
            let index = todos.findIndex((todo)=> todo.id === id);
            if(index === -1)
                throw "Id Not Found";
            //add desc:
            todos[index].description=description;
            //parse back object into JSON:
            let todosJson = JSON.stringify({todos});
            //write into file:
            await fsPromises.writeFile(filePath,todosJson);
            console.log("Successfully Updated");
        }catch(error){
            console.error(`Failed to update as: ${error}`);
        }

    })

program.parse();