const ToDoList = function(tasks = []) {

    this.tasks = tasks;

    this.findDublicate = function(value) {
        let newTask = this.tasks.find(function(task) {
            return task.value === value;
        });
        if (newTask === undefined) {
            return true;
        } else {
            return false;
        };
    };
}


ToDoList.prototype.addTask = function(value) {
    if (this.findDublicate(value)) {
        let task = {
            date: new Date(),
            completed: false,
            value,
        }    
        this.tasks = [task, ...this.tasks];
    } else {
        throw new Error("This task already exists");
    }
    };


ToDoList.prototype.deleteTask = function(value, confirmation) {
    if (confirmation) {
        this.tasks = this.tasks.filter(task => task.value !== value);
     }; 
};


ToDoList.prototype.editTask = function(value, newValue, confirmation) {
    if (confirmation) {
        if (this.findDublicate(newValue)) {
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
        } else {
            throw new Error("This task already exists");
        }
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


let augustList = new ToDoList([]);

augustList.addTask("Visit a doctor");
augustList.addTask("Bake a cake");
augustList.addTask("Cut nose hair");
augustList.addTask("Save the World");
augustList.deleteTask("Bake a cake", confirm("Are you sure?"));
augustList.editTask("Cut nose hair", "Cut nose hair and shave legs", confirm ("Do you want to save changes?"));
augustList.completeTask("Visit a doctor");

console.log(augustList);
console.log(augustList.getInfo);
// Object.freeze(mustReadList);
// console.log(Object.isFrozen(mustReadList));

