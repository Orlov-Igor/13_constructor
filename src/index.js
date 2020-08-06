const ToDoList = function(listArr = []) {

    this.listArr = listArr;
}


ToDoList.prototype.findDublicate = function(text) {
    let task = this.listArr.find(function(item) {
        return item.text === text;
    });
    if (task === undefined) {
        return true;
    } else {
        return false;
    };
};


ToDoList.prototype.addTask = function(text) {
    if(this.findDublicate(text)) {
        let newTask = {
            name: "Task number",
            date: new Date(),
            status: false,
            text: "",
            }
        newTask.name = "Task №" + Number(this.listArr.length + 1);
        newTask.text = text;
        this.listArr.push(newTask);
    } else {
        throw new Error("This task already exist");
    };
};


ToDoList.prototype.deleteTask = function(text, confirmation) {
    if (confirmation) {
        let task = this.listArr.find(function(item) {
        return item.text === text;
     });
     let i = this.listArr.indexOf(task);
     if (i !== -1) {
         this.listArr.splice(i, 1);
     };
       
     }; 
};


 ToDoList.prototype.editTask = function(text, newText, confirmation) {
    if (confirmation) {
        let task = this.listArr.find(function(item) {
        return item.text === text;
        });
        if(this.findDublicate(newText)) {
            task.text = newText; 
        } else {
            throw new Error("This task already exist");
        };
    };  
};


Object.defineProperty(ToDoList.prototype, 'getInfo', {
    get() {
        let completedList = this.listArr.filter(function(item) {
            return item.status === true;
        });
            return `Total: ${this.listArr.length}, completed: ${completedList.length}`;
    }
  });


mustReadList = new ToDoList([
    {
    name: "Task №1",
    date: new Date(2020, 6, 29),
    status: false,
    text: "Ulysses",
    },
     
    {
    name: "Task №2",
    date: new Date(2020, 7, 1),
    status: true,
    text: "Brave New World",
    },
    
    {
    name: "Task №3",
    date: new Date(2020, 7, 3),
    status: false,
    text: "Les Misérables",
    },
]);


var confDel = confirm("Are you sure?");
var confEdit = confirm("Do you want to save changes?");
mustReadList.addTask("Harry Potter and the Goblet of fire");
mustReadList.deleteTask("Ulysses", confDel);
mustReadList.editTask("Harry Potter and the Goblet of fire", "Harry Potter and the Order of Phoenix", confEdit);

console.log(mustReadList);
console.log(mustReadList.getInfo);
Object.freeze(mustReadList);
console.log(Object.isFrozen(mustReadList));

