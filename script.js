window.onload=()=>{
    const plus=document.getElementById('addTask');
    plus.addEventListener('click',addTaskUtility);

    const reset=document.getElementById('btnR');
    reset.addEventListener('click',()=>{
        if(document.querySelectorAll('.taskItem').length>0){
            if(confirm('Czy na pewno chcesz usunąć wszystko?')){
                document.getElementById('taskList').innerHTML=''; 
                counter();
            }
        }
    });
    const delDone=document.getElementById('btnG');
    delDone.addEventListener('click',()=>{
        const done=document.querySelectorAll('.ticActive');
        for (i=0;i<done.length;i++){
            done[i].parentNode.parentNode.parentNode.parentNode.removeChild(done[i].parentNode.parentNode.parentNode)
        }
        counter();
        delDone.className='btn btn-secondary';
    });
    const enterTask=document.getElementById('task');
    enterTask.focus();
    enterTask.addEventListener('keydown',(e)=>{
        if(e.key=="Enter") addTaskUtility();
    });
    const memo= localStorage.getItem('list');
    document.getElementById('taskList').innerHTML=memo;
    makeActions();
    counter();
}
function makeActions(){
    const trash=document.querySelectorAll('.trash');
    const allTic=document.querySelectorAll('.tic');
    const edit=document.querySelectorAll('.edit');
    const addSubList=document.querySelectorAll('.addSubList');
    const arrow=document.querySelectorAll('.arr');
    const subItem=document.querySelectorAll('.addSubItem');
    const inputSubList=document.querySelectorAll('.inputSubList');

    for (i=0;i<trash.length;i++){
        if(trash[i])trash[i].addEventListener('click',erase);
        if(allTic[i])allTic[i].addEventListener('click',ticAction);
        if(edit[i])edit[i].addEventListener('click',redoMode);
        if(addSubList[i])addSubList[i].addEventListener('click',subList);
        if(arrow[i]) arrow[i].addEventListener('click',hideSubList);
        if(subItem[i]) subItem[i].addEventListener('click',function(){addSubItem(this.previousSibling)});
        if(inputSubList[i])inputSubList[i].addEventListener('keydown',function(e){
            if(e.key=="Enter") addSubItem(this);
        });
    }
}
function addTaskUtility() {
    const trash=new Image();
        trash.src='img/trash.png';
        trash.className='trash';
        trash.addEventListener('click',erase);

    let actualTask=document.getElementById('task');
    const taskList=document.getElementById('taskList');
    
    const newTask= document.createElement('li');
    const taskItem=document.createElement('div');
        taskItem.className='taskItem';
    const inputArea=document.createElement('div');
        inputArea.className='inputArea';
    const actionArea=document.createElement('div');
        actionArea.className='actionArea';
    const tic=document.createElement('div');
        tic.className='tic';
        tic.addEventListener('click',ticAction);
    const pen=document.createElement('div');
        pen.classList.add('edit','pen');
        pen.addEventListener('click',redoMode);
    const plus=document.createElement('div');
        plus.classList.add('plus','addSubList');
        plus.addEventListener('click',subList);

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
        actualTask.value='';
    }
}
function counter(){
    const taskCo=document.getElementById('counter');
    taskCo.innerHTML=document.querySelectorAll('.taskItem').length;
}
function erase(){
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
    counter();
}
function ticAction(){
    this.classList.toggle('ticActive');
    const btn=document.getElementById('btnG');
    const ticks=document.querySelectorAll('.ticActive');
    if (ticks.length>0) btn.className='btn btn-success';
    else btn.className='btn btn-secondary';
}
function redoMode(){
    let oldTask=this.parentNode.previousSibling.firstChild.nodeValue;
    const editInput=document.createElement('input');
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
    const subBoard=document.createElement('div');
        subBoard.classList.add('subBoard');
    const orderLi=document.createElement('ol');
        subBoard.appendChild(orderLi);
    const box=document.createElement('div');
        box.className='box';
    const inputSubList=document.createElement('input');
        inputSubList.className='inputSubList';
        inputSubList.placeholder='Dodaj podpunkt do zadania';
        inputSubList.addEventListener('keydown',function(e){
            if(e.key=="Enter") addSubItem(this);
        });
        box.appendChild(inputSubList);
    const plus=document.createElement('div');
        plus.classList.add('plus','addSubItem');
        plus.addEventListener('click',function(){addSubItem(this.previousSibling)});
        box.appendChild(plus);

        subBoard.appendChild(box);

    this.parentNode.parentNode.parentNode.appendChild(subBoard);
    this.removeEventListener('click',subList);
    this.className='arr';
    this.addEventListener('click',hideSubList);
    inputSubList.focus();
}
function hideSubList(){
    const subBoard=this.parentNode.parentNode.nextSibling;
    subBoard.classList.toggle('hide');
    this.classList.toggle('rotor');
}
function addSubItem(that){
    const trash=new Image();
        trash.src='img/trash.png';
        trash.className='trash';
        trash.addEventListener('click',erase);
    const tic=document.createElement('div');
        tic.className='tic';
        tic.addEventListener('click',ticAction);

    const subItem=document.createElement('li');
    const subInputArea=document.createElement('div');
        subInputArea.className='subInputArea';
    const subActionArea=document.createElement('div');
        subActionArea.className='subActionArea';
    const subTaskItem=document.createElement('div');
        subTaskItem.className='subTaskItem';

    if(that.value){
        subTaskItem.appendChild(subInputArea);
        subTaskItem.appendChild(subActionArea);
        subInputArea.appendChild(document.createTextNode(that.value));
        subActionArea.appendChild(tic);
        subActionArea.appendChild(trash);
        subItem.appendChild(subTaskItem);
        that.parentNode.previousSibling.appendChild(subItem);
    }
    that.value='';
}
window.onunload=()=>{
    const unsavedTasks= document.querySelectorAll('.save');
    for(i=0;i<unsavedTasks.length;i++) {unsavedTasks.parentNode.parentNode.parentNode.removeChild(unsavedTasks[i])}
    localStorage.setItem('list',document.getElementById('taskList').innerHTML)
}
