let selectedPiece=null;
window.addEventListener("load",()=>{
    console.log("creating the table");
    const tableBody=document.querySelector(".table-body");
    for(let row=0;row<8;row++){
        console.log("inside the function");
        const tr=document.createElement("tr");
        tr.classList.add("rows");
        for(let col=0;col<8;col++){
            const td=document.createElement("td");
            td.textContent=`${row}-${col}`;
            td.setAttribute("data-col",`${row}-${col}`);
            td.classList.add("box");
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }
    console.log("after table");
    // making the bg color
    const rows=document.querySelectorAll(".rows");
    for(let r=0;r<8;r++){
        const cols=rows[r].querySelectorAll(".box");
        console.log(cols);
        for(let c=0;c<8;c++){
            if((r+c) % 2 == 0){
                cols[c].classList.add("white");
            }
            else{
                cols[c].classList.add("black");
            }
        }
    }

    // adding the cell pathstorage

    const table=document.querySelector(".table");
    const cells=document.querySelectorAll(".box");
    table.addEventListener("click",function(e){
        for(let i=0;i<cells.length;i++){
            cells[i].classList.remove("teal");
        }
    })
    table.addEventListener("click",function(e){
    let tableCell=e.target;
    const dataIndex=tableCell.dataset.col;
    let [row,col]=dataIndex.split("-").map((index)=> parseInt(index));
    const pathStorage={};
    pathStorage[dataIndex]=true;
    const getSelectedChessPiece=selectedPiece;
    console.log("the choosen value is "+getSelectedChessPiece);
    
    if(getSelectedChessPiece === "Queen"){
        getQueenpath(row,col,pathStorage);
    }
    if(getSelectedChessPiece === "Rukh"){
        getRukhpath(row,col,pathStorage);
    }
    if(getSelectedChessPiece === "Bishop"){
        getBishopPath(row,col,pathStorage);
    }
    console.log(pathStorage);
    for(let i=0;i<cells.length;i++){
        if(pathStorage[cells[i].dataset.col] === true){
            console.log("condition is true");
            cells[i].classList.add("teal");
        }
    }
})

})
// getting the options
const option=document.querySelector(".chess-pieces");
const splits=document.querySelector(".split");
option.addEventListener("change",function(e){
    // function getSelectedDropDownvalue(){
    //     return option.value;
    // }
    selectedPiece=option.value;
    if(option.value === "Queen"){
        console.log("the choose piece is "+option.value);
    }
    let dialogBoxElement=showTheDialogBox(option.value);
    splits.appendChild(dialogBoxElement);
    dialogBoxElement.style.display="block";
    const okBtn=dialogBoxElement.querySelector(".okbtn");
    okBtn.addEventListener("click",function(e){
        console.log("in ok button");
        dialogBoxElement.style.display="none";
    })

})

function showTheDialogBox(pieceName){
    console.log("box creation");
    const boxPopup=document.createElement("div");
    boxPopup.classList.add("dialog-box");
    boxPopup.innerHTML=`<div> Click anywhere on the chessboard and know the possible move
                        of the
                        </span><b> ${pieceName}</b>
                        </div><div class="okBtn"><button class="okbtn">OK</button> </div></div>`;
    return boxPopup;
}


function getQueenpath(row,col,pathStorage){
    console.log("queenpath")
    getTop(row,col,pathStorage);
    getBottom(row,col,pathStorage);
    getRight(row,col,pathStorage);
    getLeft(row,col,pathStorage);
    getTopRightDiagnol(row,col,pathStorage);
    getTopLeftDiagnol(row,col,pathStorage);
    getBottomRightDiagnol(row,col,pathStorage);
    getBottomLeftDiagnol(row,col,pathStorage);
}

function getRukhpath(row,col,pathStorage){
    getTop(row,col,pathStorage);
    getBottom(row,col,pathStorage);
    getRight(row,col,pathStorage);
    getLeft(row,col,pathStorage);
}

function getBishopPath(row,col,pathStorage){
    getTopRightDiagnol(row,col,pathStorage);
    getTopLeftDiagnol(row,col,pathStorage);
    getBottomRightDiagnol(row,col,pathStorage);
    getBottomLeftDiagnol(row,col,pathStorage);
}
function getTop(row,col,pathStorage){
    row--;
    while(row>=0){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        row--;
    }
}

function getBottom(row,col,pathStorage){
    row++;
    // col--;
    while(row<=7){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        row++;
    }
}

function getRight(row,col,pathStorage){
    col++;
    while(col<=7){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        col++;
    }
}

function getLeft(row,col,pathStorage){
    col--;
    while(col>=0){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        col--;
    }
}

function getTopRightDiagnol(row,col,pathStorage){
    row--;
    col++;
    while(row>=0 && col<=7){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        row--;
        col++;
    }
}

function getTopLeftDiagnol(row,col,pathStorage){
    row--;
    col--;
    while(row>=0 && col>=0){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        row--;
        col--;
    }
}

function getBottomRightDiagnol(row,col,pathStorage){
    row++;
    col++;
    while(row<=7&& col<=7){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        row++;
        col++;
    }
}

function getBottomLeftDiagnol(row,col,pathStorage){
    row++;
    col--;
    while(row<=7&& col>=0){
        const dataIndex=`${row}-${col}`;
        pathStorage[dataIndex]=true;
        row++;
        col--;
    }
}

