const ToDoList = function(tasks = []) {

    this.tasks = tasks;
}


ToDoList.prototype.addTask = function(value) {
    
        let task = {
            date: new Date(),
            completed: false,
            value,
        }    
        this.tasks = [task, ...this.tasks];
    };


ToDoList.prototype.deleteTask = function(value, confirmation) {
    if (confirmation) {
        let task = this.tasks.find(task => {
        return task.value === value;
     });
     let i = this.tasks.indexOf(task);
     if (i !== -1) {
         this.tasks.splice(i, 1);
         this.tasks = [...this.tasks];
     };
       
     }; 
};


ToDoList.prototype.editTask = function(value, newValue, confirmation) {
    if (confirmation) {
        this.tasks = this.tasks.map(task => {
        let newTask = task;
        if(task.value === value) {
            newTask = {
                ...task,
                value: newValue
            };
        };
        return newTask;
        });
    };  
};


ToDoList.prototype.completeTask = function(value){
    this.tasks = this.tasks.map(task => ({
        ...task,
        completed: task.value === value ? !task.completed : task.completed
    }));
};


Object.defineProperty(ToDoList.prototype, 'getInfo', {
    get() {
       return this.tasks.reduce(
            (acc, task) => {
            task.completed && acc.completed++;
            return acc;
            },
            {total: this.tasks.length, completed: 0}
        );
    }
}
);


let mustReadList = new ToDoList([]);

mustReadList.addTask("Visit a doctor");
mustReadList.addTask("Bake a cake");
mustReadList.addTask("Cut nose hair");
mustReadList.addTask("Save the World");
mustReadList.deleteTask("Bake a cake", confirm("Are you sure?"));
mustReadList.editTask("Cut nose hair", "Cut nose hair and shave legs", confirm ("Do you want to save changes?"));
mustReadList.completeTask("Visit a doctor");

console.log(mustReadList);
console.log(mustReadList.getInfo);
// Object.freeze(mustReadList);
// console.log(Object.isFrozen(mustReadList));

