let plus=document.getElementById('addTask');
plus.addEventListener('click',addTaskUtility,false);

function addTaskUtility() {
    const trash=new Image();
        trash.src='img/trash.png';
        trash.className='trash';

    let actualTask=document.getElementById('task');
    let taskList=document.getElementById('taskList');
    
    let newTask= document.createElement('li');
    let inputArea=document.createElement('div');
        inputArea.className='inputArea';
    let actionArea=document.createElement('div');
        actionArea.className='actionArea';
    let tic=document.createElement('div');
        tic.className='tic';
    let pen=document.createElement('div');
        pen.className='pen';

    if (actualTask.value!=0){
        inputArea.appendChild(document.createTextNode(actualTask.value));
        actionArea.appendChild(pen);
        actionArea.appendChild(tic);
        actionArea.appendChild(trash);

        newTask.appendChild(inputArea);
        newTask.appendChild(actionArea);
        
        taskList.appendChild(newTask);
        counter();
        makeActions();
        actualTask.value='';
    }
}
function makeActions(){
    let minus=document.querySelectorAll('.trash');
    let allTic=document.querySelectorAll('.tic');
    let edit=document.querySelectorAll('.pen');
    for (i=0;i<document.querySelectorAll('.board>ul>li').length;i++){
        minus[i].addEventListener('click',erase,false);
        allTic[i].addEventListener('click',ticAction,false);
        edit[i].addEventListener('click',redoMode,false);
    }
}
function counter(){
    let taskCo=document.getElementById('counter');
    taskCo.innerHTML=document.querySelectorAll('.board>ul>li').length;
}
function erase(){
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    counter();
}
function ticAction(){
    this.classList.toggle('ticActive');
}
function redoMode(){
    let oldTask=this.parentNode.previousSibling.firstChild.nodeValue;
    let editInput=document.createElement('input');
    editInput.placeholder=oldTask;

    if (this.classList.contains('pen')){
        this.parentNode.previousSibling.firstChild.nodeValue='';
        this.parentNode.previousSibling.appendChild(editInput);
        this.className='save';
    }
    else {
        let updTask=this.parentNode.previousSibling.firstChild.nextSibling.value;
        this.parentNode.previousSibling.removeChild(this.parentNode.previousSibling.firstChild.nextSibling);
        this.parentNode.previousSibling.firstChild.nodeValue=updTask;
        this.className='pen';
        if (updTask==0) this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    }
    counter();
}