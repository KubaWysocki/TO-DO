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
            done[i].closest('ul, ol').removeChild(done[i].closest('li'));
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
    counter();
}
window.onunload=()=>{
    const unsavedTasks= document.querySelectorAll('.save');
    for(i=0;i<unsavedTasks.length;i++) {unsavedTasks.closest('li').removeChild(unsavedTasks[i])}
    localStorage.setItem('list',document.getElementById('taskList').innerHTML);
}
