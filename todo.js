const { Command } = require('commander');
const program = new Command(); 
const fsPromises = require('fs').promises;

const filePath = './todos.json';

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
    .action(async (newTask)=>{
        //create a task object:
        //console.log(newtask);
        console.log(newTask);
        try{
            
            let data = await fsPromises.readFile(filePath, "utf-8");
            //data already present:
            if(data){
                //parse JSON into Object and extract array from it:
                let todos = JSON.parse(data).todos;
                //push the created object into the array
                const todo = {
                    id: parseInt(generateId()),
                    status: false,
                    description: newTask       
                }
                if(todos.some((t)=> t.id === todo.id)){
                    throw "Id Already Present";    
                }
                todos.push(todo);
                //parse back into JSON:
                const todoJson = JSON.stringify({todos});
                //write into the file:
               await fsPromises.writeFile(filePath, todoJson);
               console.log("Task Added successfully...");
            }
            //data is not present:
            else{
                //create a todObbject:
                const todo = {
                    id: parseInt(generateId()),
                    status: false,
                    description: newTask       
                }
                //place it in an array:
                let todos = [todo];
                //parse object into JSON:
                const todosData = JSON.stringify({todos});
                //write into the file:
                await fsPromises.writeFile(filePath,todosData);
                console.log("Task Added successfully...");
            }

        }catch(error){ 
            console.error(error);
        }

    })

//view-command:
program
    .command("list")
    .description("list all the tasks")
    .option("-c, --completed", "gets only completed tasks", false)
    
    //two approaches using: 1. _,command 2. this with function 
    .action(async function (_, command){
        try{
            const options = command.opts();

            //get the data:
            let data = await fsPromises.readFile(filePath,'utf-8');
            //parse into object:
           
                let todos = JSON.parse(data).todos;
               //to view only completed tasks:
                if(options.completed){
                    //get only completed tasks
                    todos.forEach((todo)=>{
                        if(todo.status === true){
                            console.log(`Description: ${todo.description}`);
                        }
                    });
                    
                }
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
        console.log(id);
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

//delete-command:
// read-file->data.id === id->splice(index,1)->write data into file
program
    .command("delete")
    .description("Deletes the existing Task")
    .argument("<id>", "id of which task has to be updated")
    .action(async (idArg)=>{
        //covert idArg into number:
        const id = parseInt(idArg);
       
        try{
            //read-file to get data:
            let data = await fsPromises.readFile(filePath,"utf-8");
            //parse into object:
            const todos = JSON.parse(data).todos;
            //iterate on array and find the index:
            //validate and then delete:
            console.log(todos);
            const index = todos.findIndex((todo)=> todo.id === id);
            if(index === -1){
                throw "Id Not Found";
            }
            todos.splice(index,1);
            //parse back into JSON:
            const todosData = JSON.stringify({todos});
            //write back into the file:
            await fsPromises.writeFile(filePath, todosData);
            console.log("Task deleted successfully...");
            console.log(todos);

        }catch(error){
            console.error(`Failed to update as: ${error}`);
        }
    })

function generateId(){
    const randomString = "1234567890";
    let id = "";
    for(let i = 0; i <= 1; i++){
        id += randomString.charAt(Math.ceil(Math.random() * randomString.length));
    }
    return id;
}

program.parse();