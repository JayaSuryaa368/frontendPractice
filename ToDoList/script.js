const plusIcon=document.querySelector(".fa-plus");
const dialogboxitem=document.querySelector(".dialogbox");
let todoTask=document.querySelector(".todoadded");
let inprogressTask=null;

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
let totalFinishedTask=document.querySelector(".finishedcount");
let totalInprogressTask=document.querySelector(".inprogresscount");

addTask.addEventListener("click",function(event){
    console.log("the event is "+event);
        const dropdown=document.querySelector(".dropdown");
        let dropdownText=capitalizeFirstLetter(dropdown.value);
        console.log("the drop down value is : "+dropdownText);
        const taskAdded=document.querySelector(".text-area");
        const taskText=taskAdded.value.trim();
        if(dropdownText === "None"){
            dropdownText="Daily";
        }
        if(taskText.length != 0){
            console.log("in if condition");
            // adding a element to to do container
            let ch=dropdownText.charAt(0).toUpperCase();
            let taskID=ch+generateTaskID();
            console.log("the task ID is -- "+taskID);
            taskAdder(dropdownText,taskText,taskID);
            updateToDoCount();
            taskProgressPercentageCalculation();
            // resetting the dialog box contents to default
            dropdown.selectedIndex=0;
            taskAdded.value="";
            dialogboxitem.style.display= "none";
            
        }
        else{
            window.alert("Please enter task description.");
        }
    
})

function updateToDoCount(){
    console.log("updating the todo count");
    let todoTaskCount=document.querySelectorAll(".taskholder.todo");
    totalToDoTask.innerText=todoTaskCount.length;
}
updateInprogressCount();
function updateInprogressCount(){
    console.log("in inprogress count update");
    let inprogressTaskCount=document.querySelectorAll(".taskholder.inprogress");
    totalInprogressTask.innerText=inprogressTaskCount.length;
}
function updateFinishedTaskCount(){
    totalFinishedTask
    console.log("in finished count update");
    let finishedTaskCount=document.querySelectorAll(".taskholder.finish");
    totalFinishedTask.innerText=finishedTaskCount.length;
}
handleEdit();
handleInprogressTaskEdit();

function taskAdder(taskType,taskText,taskNumber){
    let taskContainer=document.createElement("div");
    let type=document.createElement("div");
    let task=document.createElement("div");
    let tickeID=document.createElement("div");
    taskContainer.classList.add("taskholder");
    taskContainer.classList.add("todo");
    taskContainer.setAttribute("draggable","true");
    // taskContainer.at
    type.classList.add("task-type");
    task.classList.add("task-area");
    tickeID.id=taskNumber;
    tickeID.innerText=taskNumber;
    tickeID.classList.add("ticket-id");
    type.innerText=taskType;
    task.innerText=taskText;
    taskContainer.id=taskNumber;
    taskContainer.appendChild(tickeID);
    taskContainer.appendChild(type);
    taskContainer.appendChild(task);
    // here adding the delete and edit button once the task is filled and appending to the taskcontainer
    let buttonAdded=createDeleteEditButton();
    taskContainer.appendChild(buttonAdded);
    //here created task is added to taskholder
    todoTask.appendChild(taskContainer);
    //attaching dragstart

    taskContainer.addEventListener("dragstart",function(e){
            e.dataTransfer.setData("text/plain", taskContainer.id);
            console.log("the elements id is "+e.target.id);
        });
    
    // after task added listening to delete click
    let deleteButtonClicked=document.querySelectorAll(".fa-trash");
    for(let i=0;i<deleteButtonClicked.length;i++){
        deleteButtonClicked[i].addEventListener("click",function(e){
            console.log("clicked delete button");
            let target=e.target;
            let deleteEdit=target.parentElement;
            console.log(deleteEdit.parentElement + "the deleted parent set")
            deleteEdit.parentElement.remove();
            updateToDoCount();
            updateInprogressCount();
            updateFinishedTaskCount();
            taskProgressPercentageCalculation();
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
            let selectedTaskNumber=parentTask.querySelector(".ticket-id");
            console.log("the edited task id is"+selectedTaskNumber.innerText);
            let editTaskType=parentTask.querySelector(".task-type");
            // let selectedTaskNumber=editTaskType.innerText.split(" ")[0];
            let selectedTaskType=editTaskType.innerText;
            let editTaskText=parentTask.querySelector(".task-area");
            let taskAddedText=editTaskText.innerText;
            // creating the edit box with the values
            let editboxCreated=createEditTaskDialogBox(selectedTaskType,taskAddedText);
            //appending the edt box to DOM
            body.append(editboxCreated);
            //after appending updating the edit box with above value
            let DDvalue=editboxCreated.querySelector(".edit-dropdown");
            DDvalue.value=selectedTaskType.toLowerCase();
            let taskexist=editboxCreated.querySelector(".edit-text-area");
            taskexist.value=taskAddedText;
            // here diplaying the edit with actual task values
            editboxCreated.style.display="flex";

            // remove edit box id click on close

            let closeEditIcon = editboxCreated.querySelector(".fa-square-xmark");
            closeEditIcon.addEventListener("click", () => {
                body.removeChild(editboxCreated);
            });
            // let checkeditedtaskText=editboxCreated.querySelector(".edit-text-area");
            let updateButton=editboxCreated.querySelector(".update");
            // if click on update update the parent task and hides the edit box
            updateButton.addEventListener("click",function(e){
                // referencing the parent to update with new value
                let updateselectedTaskTypeEl = parentTask.querySelector(".task-type");
                let updateselectedTaskTextEl = parentTask.querySelector(".task-area");
                // getting the edit box value
                let editedDDvalue=editboxCreated.querySelector(".edit-dropdown");
                let editedtaskText=editboxCreated.querySelector(".edit-text-area");
                if(editedtaskText.value.length < 1){
                    window.alert("Task text should not be empty");
                }
                else{
                    //update parent element where we get the previous added value -- before edit value
                    updateselectedTaskTypeEl.innerText=capitalizeFirstLetter(editedDDvalue.value);
                    updateselectedTaskTextEl.innerText=editedtaskText.value;
                    // editboxCreated.style.display="none";
                    body.removeChild(editboxCreated);
                }
                
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
    console.log("inside the todod dropdown sorting");
    let sortValueElement=e.target;
    console.log("inside the todod dropdown sorting");
    let selectedSortingValue=capitalizeFirstLetter(sortValueElement.value);
    console.log("inside the todod dropdown sorting");
    let allToDoTasks=document.querySelectorAll(".todo");
    console.log(allToDoTasks.innerHTML);
    console.log("inside the todod dropdown sorting");
    for(let i=0;i<allToDoTasks.length;i++){
        let currentElement=allToDoTasks[i];
        let currenTaskType=currentElement.querySelector(".task-type").innerText;
        currentElement.style.display = "block"; 
        if(selectedSortingValue != currenTaskType){
            currentElement.style.display="none";
        }
        if(selectedSortingValue === "All"){
            currentElement.style.display = "block";
            continue;
        }
    }
})

function generateTaskID(){
    const chars = "ABCEFGHIJKLNOPQRSTUVXYZ";
    const numbers="123456789";
    let taskID="";
    for(let i=0;i<3;i++){
        taskID+=numbers.charAt(Math.random()*9);
    }
    for(let i=0;i<3;i++){
        taskID+=chars.charAt(Math.random()*chars.length);
    }

    return taskID;
    
}

//displaying inprogress task based on dropdown value
let  inProgressDropDownNode=document.querySelector(".inprogress-options");
inProgressDropDownNode.addEventListener("change",function(e){
    let sortValueElement=e.target;
    console.log(sortValueElement.value+ " the expected dd value");
    let selectedSortingValue=capitalizeFirstLetter(sortValueElement.value);
    console.log(selectedSortingValue+ " the expected value");
    let allToDoTasks=document.querySelectorAll(".inprogress");
    for(let i=0;i<allToDoTasks.length;i++){
        let currentElement=allToDoTasks[i];
        let currenTaskType=capitalizeFirstLetter(currentElement.querySelector(".task-type").innerText);
        console.log("the all task type current is "+currenTaskType);
        currentElement.style.display = "block"; 
        if(selectedSortingValue != currenTaskType){
            currentElement.style.display="none";
        }
        if(selectedSortingValue === "All"){
            currentElement.style.display = "block";
            continue;
        }
    }
    
})
// displaying finished task based on dropdown value
let  finishedDropDownNode=document.querySelector(".finished-options");
finishedDropDownNode.addEventListener("change",function(e){
    let sortValueElement=e.target;
    let selectedSortingValue=sortValueElement.value;
    let allToDoTasks=document.querySelectorAll(".finish");
    for(let i=0;i<allToDoTasks.length;i++){
        let currentElement=allToDoTasks[i];
        let currenTaskType=currentElement.querySelector(".task-type").innerText;
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

//this function handles the editing of inprogress task
function handleInprogressTaskEdit(){
     inprogressTask=document.querySelector(".inprogress");
     inprogressTask.addEventListener("click", function(e) {
        if (e.target.classList.contains("fa-pen")) {
            let editTarget=e.target;
            let delteEditcontainer=editTarget.parentElement;
            let parentTask=delteEditcontainer.parentElement;
            // getting the already existing value
            let selectedTaskNumber=parentTask.querySelector(".ticket-id");
            let editTaskType=parentTask.querySelector(".task-type");
            let selectedTaskType=editTaskType.innerText;
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
            // let checkeditedtaskText=editboxCreated.querySelector(".edit-text-area");
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
                console.log("before empty check");
                if(editedtaskText.value.length < 1){
                    window.alert("Task text should not be empty");
                }
                else{
                    //update parent element where we get the previous added value -- before edit value
                    updateselectedTaskTypeEl.innerText=capitalizeFirstLetter(editedDDvalue.value);
                    updateselectedTaskTextEl.innerText=editedtaskText.value;
                    // editboxCreated.style.display="none";
                    body.removeChild(editboxCreated);
                }
                
             });
        }
    });
}

dropToInprogress();
dropToFinished();

function dropToInprogress(){
    console.log("dropfunction called");
    const inprdrogressDropZone=document.querySelector(".in-progress");
    const inprogressTaskHolder=document.querySelector(".inprogress");
    inprdrogressDropZone.addEventListener("dragover",function(e){
        console.log("inside dragover");
        e.preventDefault();
    });

    inprdrogressDropZone.addEventListener("drop",function(e){
        e.preventDefault();
        let task=e.dataTransfer.getData("text/plain");
        let draggedTask=document.getElementById(task);
        draggedTask.classList.remove("todo");
        draggedTask.classList.add("inprogress");
        inprogressTaskHolder.appendChild(draggedTask);
        updateToDoCount();
        updateInprogressCount();
    });
    
}

function dropToFinished(){
    const finishDropZone=document.querySelector(".finished");
    const finishDropZoneTaskHolder=document.querySelector(".finish");
    finishDropZone.addEventListener("dragover",function(e){
        e.preventDefault();
    });
    finishDropZone.addEventListener("drop",function(e){
        e.preventDefault();
        let task=e.dataTransfer.getData("text/plain");
        let draggedTask=document.getElementById(task);
        draggedTask.setAttribute("draggable","false");
        draggedTask.classList.remove("inprogress");
        draggedTask.classList.add("finish");
        finishDropZoneTaskHolder.appendChild(draggedTask);
        updateInprogressCount();
        updateFinishedTaskCount();
        taskProgressPercentageCalculation();
    });
}

function capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
let progressBar=document.querySelector(".progressbarcolor");
function taskProgressPercentageCalculation(){
    let totalTaskCount=parseInt(totalToDoTask.innerText)+parseInt(totalInprogressTask.innerText)+parseInt(totalFinishedTask.innerText);
    let finishedTaskCount=parseInt(totalFinishedTask.innerText);
    let percent=(finishedTaskCount/totalTaskCount)*100;
    progressBar.innerText=percent+"%";
    progressBar.style.width=percent*2+"px";
}
