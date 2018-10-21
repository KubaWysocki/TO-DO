window.onload=()=>{
    let plus=document.getElementById('addTask');
    plus.addEventListener('click',addTaskUtility);

    let reset=document.getElementById('btnR');
    reset.addEventListener('click',()=>{
        if(document.querySelectorAll('.taskItem').length>0){
            if(confirm('Czy na pewno chcesz usunąć wszystko?')){
                document.getElementById('taskList').innerHTML=''; 
                counter();
            }
        }
    });
    let delDone=document.getElementById('btnG');
    delDone.addEventListener('click',()=>{
        let done=document.querySelectorAll('.ticActive');
        for (i=0;i<done.length;i++){
            done[i].parentNode.parentNode.parentNode.parentNode.removeChild(done[i].parentNode.parentNode.parentNode)
        }
        counter();
        delDone.className='btn btn-secondary';
    });
    let enterTask=document.getElementById('task');
    enterTask.focus();
    enterTask.addEventListener('keydown',(e)=>{
        if(e.key=="Enter") addTaskUtility();
    });
    let memo= localStorage.getItem('list');
    document.getElementById('taskList').innerHTML=memo;
    makeActions();
    counter();
}
function addTaskUtility() {
    const trash=new Image();
        trash.src='img/trash.png';
        trash.className='trash';

    let actualTask=document.getElementById('task');
    let taskList=document.getElementById('taskList');
    
    let newTask= document.createElement('li');
    let taskItem=document.createElement('div');
        taskItem.className='taskItem';
    let inputArea=document.createElement('div');
        inputArea.className='inputArea';
    let actionArea=document.createElement('div');
        actionArea.className='actionArea';
    let tic=document.createElement('div');
        tic.className='tic';
    let pen=document.createElement('div');
        pen.classList.add('edit','pen');
    let plus=document.createElement('div');
        plus.classList.add('plus','addSubList');

    if (actualTask.value){
        inputArea.appendChild(document.createTextNode(actualTask.value));
        actionArea.appendChild(pen);
        actionArea.appendChild(tic);
        actionArea.appendChild(plus);
        actionArea.appendChild(trash);

        taskItem.appendChild(inputArea);
        taskItem.appendChild(actionArea);

        newTask.appendChild(taskItem);
        
        taskList.insertBefore(newTask, taskList.childNodes[0]);
        counter();
        makeActions();
        actualTask.value='';
    }
}
function makeActions(){
    let minus=document.querySelectorAll('.trash');
    let allTic=document.querySelectorAll('.tic');
    let edit=document.querySelectorAll('.edit');
    let addSubList=document.querySelectorAll('.addSubList');
    let arrow=document.querySelectorAll('.arr');
    let subItem=document.querySelectorAll('.addSubItem');
    let inputSubList=document.querySelectorAll('.inputSubList');

    for (i=0;i<document.querySelectorAll('.taskItem').length;i++){
        minus[i].addEventListener('click',erase);
        allTic[i].addEventListener('click',ticAction);
        edit[i].addEventListener('click',redoMode);
        if(addSubList[i])addSubList[i].addEventListener('click',subList);
        if(arrow[i]) arrow[i].addEventListener('click',hideSubList);
        if(subItem[i]) subItem[i].addEventListener('click',function(){addSubItem(this.previousSibling)});
        if(inputSubList[i])inputSubList[i].addEventListener('keydown',function(e){
            if(e.key=="Enter") addSubItem(this);
        });
    }
}
function counter(){
    let taskCo=document.getElementById('counter');
    taskCo.innerHTML=document.querySelectorAll('.taskItem').length;
}
function erase(){
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
    counter();
}
function ticAction(){
    this.classList.toggle('ticActive');
    let btn=document.getElementById('btnG');
    let ticks=document.querySelectorAll('.ticActive');
    if (ticks.length>0) btn.className='btn btn-success';
    else btn.className='btn btn-secondary';
}
function redoMode(){
    let oldTask=this.parentNode.previousSibling.firstChild.nodeValue;
    let editInput=document.createElement('input');
        editInput.placeholder='Aktualizuj zadanie';
        editInput.value=oldTask;
    editInput.addEventListener('keydown',(e)=>{
        if(e.key=="Enter") save(this);
    });
    if (this.classList.contains('pen')) pen(this);
    else if (this.classList.contains('edit')) save(this);

    function pen (that) {
        that.parentNode.previousSibling.firstChild.nodeValue='';
        that.parentNode.previousSibling.appendChild(editInput);
        that.classList.remove('pen');
        editInput.focus();
        that.classList.add('save');
    }
    function save (that){
        let updTask=that.parentNode.previousSibling.firstChild.nextSibling;
        that.parentNode.previousSibling.removeChild(that.parentNode.previousSibling.firstChild.nextSibling);
        that.parentNode.previousSibling.firstChild.nodeValue=updTask.value;
        that.classList.remove('save')
        that.classList.add('pen');
        if (updTask.value=="") that.parentNode.parentNode.parentNode.removeChild(that.parentNode.parentNode);
    }
    counter();
}
function subList(){
    let subBoard=document.createElement('div');
        subBoard.classList.add('subBoard');
    let orderLi=document.createElement('ol');
        subBoard.appendChild(orderLi);
    let box=document.createElement('div');
        box.className='box';
    let inputSubList=document.createElement('input');
        inputSubList.className='inputSubList';
        inputSubList.placeholder='Dodaj podpunkt do zadania';
        box.appendChild(inputSubList);
    let plus=document.createElement('div');
        plus.classList.add('plus','addSubItem');
        box.appendChild(plus);

        subBoard.appendChild(box);

    this.parentNode.parentNode.parentNode.appendChild(subBoard);
    this.removeEventListener('click',subList);
    this.className='arr';
    inputSubList.focus();
    makeActions();
}
function hideSubList(){
    let subBoard=this.parentNode.parentNode.nextSibling;
    subBoard.classList.toggle('hide');
    this.classList.toggle('rotor');
}
function addSubItem(that){
    let subItem=document.createElement('li');
    if(that.value){
        that.parentNode.previousSibling.appendChild(subItem);
        subItem.appendChild(document.createTextNode(that.value));
    }
    that.value='';
}
window.onunload=()=>{
    let unsavedTasks= document.querySelectorAll('.save');
    for(i=0;i<unsavedTasks.length;i++) {unsavedTasks.parentNode.parentNode.parentNode.removeChild(unsavedTasks[i])}
    localStorage.setItem('list',document.getElementById('taskList').innerHTML)
}