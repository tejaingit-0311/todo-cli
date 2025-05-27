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
    .version("1.0.3")



//add-command:
program
    .command("add")
    .description("Adds a task")
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
    .description("List all the tasks")
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