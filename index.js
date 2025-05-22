const { Command } = require('commander');
const program = new Command(); 

let todos = [{
    id: '',
    description: ''
}]
//name a command
//give description about what it does
//set the version
program
    .name('todo')
    .description('Add, Update and Delete All Your Tasks Here')
