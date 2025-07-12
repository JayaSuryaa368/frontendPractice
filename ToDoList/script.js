const plusIcon=document.querySelector(".fa-plus");
const dialogboxitem=document.querySelector(".dialogbox");
let todoTask=document.querySelector(".todoadded");

let task=1;
const body = document.querySelector("body");
// making dialog appear
plusIcon.addEventListener("click",function(){
    console.log("clicked the plus icon");
    dialogboxitem.style.display= "flex";
})

// diappearing the dialog box
const closeDialogBox=document.querySelector(".fa-square-xmark");
closeDialogBox.addEventListener("click",function(){
    console.log("clicked the close icon");
    dialogboxitem.style.display= "none";
})
const addTask=document.querySelector(".addTask");
let countOfTotalTask=0;
let totalToDoTask=document.querySelector(".todocount");
addTask.addEventListener("click",function(event){
    console.log("the event is "+event);
        const dropdown=document.querySelector(".dropdown");
        let dropdownText=dropdown.value;
        console.log("the drop down value is "+dropdownText);
        const taskAdded=document.querySelector(".text-area");
        const taskText=taskAdded.value.trim();
        console.log("the task added --- : "+taskAdded);
        console.log("the task is "+task);
        if(dropdownText != null && taskText != null){
            console.log("in if condition");
            // adding a element to to do container
            taskAdder(dropdownText,taskText,task);
            task+=1;
            updateToDoCount();
        }
        // resetting the dialog box contents to default
        dropdown.selectedIndex=0;
        taskAdded.value="";
        dialogboxitem.style.display= "none";
})
function updateToDoCount(){
    let todoTaskCount=document.querySelectorAll(".taskholder");
    totalToDoTask.innerText=todoTaskCount.length;
}
handleEdit();
function taskAdder(taskType,taskText,taskNumber){
    let taskContainer=document.createElement("div");
    let type=document.createElement("div");
    let task=document.createElement("div");
    
    taskContainer.classList.add("taskholder");
    type.classList.add("task-type");
    task.classList.add("task-area");
    type.innerText=taskNumber+" "+taskType;
    task.innerText=taskText;
    taskContainer.appendChild(type);
    taskContainer.appendChild(task);
    // here adding the delete and edit button once the task is filled and appending to the taskcontainer
    let buttonAdded=createDeleteEditButton();
    taskContainer.appendChild(buttonAdded);
    //here created task is added to taskholder
    todoTask.appendChild(taskContainer);
    // after task added listening to delete click
    let deleteButtonClicked=document.querySelectorAll(".fa-trash");
    for(let i=0;i<deleteButtonClicked.length;i++){
        deleteButtonClicked[i].addEventListener("click",function(e){
            console.log("clicked delte button");
            let target=e.target;
            let deleteEdit=target.parentElement;
            console.log(deleteEdit.parentElement + "the delted parent set")
            deleteEdit.parentElement.remove();
            updateToDoCount();
        })
    }
}


function handleEdit(){
     todoTask.addEventListener("click", function(e) {
        if (e.target.classList.contains("fa-pen")) {
            let editTarget=e.target;
            let delteEditcontainer=editTarget.parentElement;
            let parentTask=delteEditcontainer.parentElement;
            // getting the already existing value
            let editTaskType=parentTask.querySelector(".task-type");
            let selectedTaskNumber=editTaskType.innerText.split(" ")[0];
            let selectedTaskType=editTaskType.innerText.split(" ")[1];
            console.log("the selected tasktype is -- "+selectedTaskType);
            let editTaskText=parentTask.querySelector(".task-area");
            let taskAddedText=editTaskText.innerText;
            console.log("the already added task is "+taskAddedText);
            console.log("the text is "+editTaskType.innerText);
            // creating the edit box with the values
            let editboxCreated=createEditTaskDialogBox(selectedTaskType,taskAddedText);
            console.log("after create edit box");
            //appending the edt box to DOM
            body.append(editboxCreated);
            //after appending updating the edit box with above value
            let DDvalue=editboxCreated.querySelector(".edit-dropdown");
            DDvalue.value=selectedTaskType.toLowerCase();
            let taskexist=editboxCreated.querySelector(".edit-text-area");
            taskexist.value=taskAddedText;
            console.log("finish");
            // here diplaying the edit with actual task values
            editboxCreated.style.display="flex";

            // remove edit box id click on close

            let closeEditIcon = editboxCreated.querySelector(".fa-square-xmark");
            closeEditIcon.addEventListener("click", () => {
                body.removeChild(editboxCreated);
            });

            let updateButton=editboxCreated.querySelector(".update");
            // if click on update update the parent task and hides the edit box
            updateButton.addEventListener("click",function(e){
                // referencing the parent to update with new value
                let updateselectedTaskTypeEl = parentTask.querySelector(".task-type");
                let updateselectedTaskTextEl = parentTask.querySelector(".task-area");

                // getting the edit box value
                let editedDDvalue=editboxCreated.querySelector(".edit-dropdown");
                console.log("the updated dd = "+editedDDvalue.value)
                let editedtaskText=editboxCreated.querySelector(".edit-text-area");
                console.log("the update task = "+editedtaskText.value);
                //update parent element where we get the previous added value -- before edit value
                updateselectedTaskTypeEl.innerText=selectedTaskNumber+" "+editedDDvalue.value;
                updateselectedTaskTextEl.innerText=editedtaskText.value;
                // editboxCreated.style.display="none";
                body.removeChild(editboxCreated);
             });
        }
    });
}

function createDeleteEditButton(){
    let buttons=document.createElement("div");
    buttons.classList.add("icons");

    let deleteButton=document.createElement("i");
    deleteButton.classList.add("fa-solid","fa-trash");
    deleteButton.style.fontSize = "15px";
    deleteButton.style.color = "red";
    let editButton=document.createElement("i");
    editButton.classList.add("fa-solid","fa-pen");
    editButton.style.fontSize = "15px";
    editButton.style.color = "green";
    buttons.appendChild(deleteButton);
    buttons.appendChild(editButton);
    return buttons;
}

function createEditTaskDialogBox(taskType,taskText){
    console.log("creating the edit box");
    let editDialogBox=document.createElement("div");
    editDialogBox.classList.add("edit-dialogbox");
    editDialogBox.innerHTML=`<div class="edit-header-place">
        <h4 class="edit-dialogbox-header">Edit Your Task Here</h4>
        <i class="fa-solid fa-square-xmark" style="font-size: 30px;color: red;"></i>
      </div>
       <select class="edit-dropdown">
        <option value="none" disabled hidden>Select</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <textarea class="edit-text-area"></textarea>
      <button class="update" style=" color:balck;background-color:green">Update</button>`
      return editDialogBox;
}

let  dropdownNode=document.querySelector(".todo-options");
dropdownNode.addEventListener("change",function(e){
    let sortValueElement=e.target;
    console.log(sortValueElement.value+ " the dd value");
    let selectedSortingValue=sortValueElement.value;
    let allToDoTasks=document.querySelectorAll(".taskholder");
    for(let i=0;i<allToDoTasks.length;i++){
        let currentElement=allToDoTasks[i];
        let children = currentElement.children;
        let currenTaskType=children[0].innerText.split(" ")[1];
        console.log("the all task type current is "+currenTaskType);
        currentElement.style.display = "block"; 
        if(selectedSortingValue != currenTaskType){
            currentElement.style.display="none";
            console.log("removing the not matching")
        }
        if(selectedSortingValue === "all"){
            currentElement.style.display = "block";
            continue;
        }
    }
})