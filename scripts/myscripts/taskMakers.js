function addTaskUtility() {
    let actualTask=document.getElementById('task');
    const taskList=document.getElementById('taskList');

    let newTask, taskItem, inputArea, actionArea, tic, pen, plus, trash;

    newTask=makeFullElement(newTask, 'li');
    taskItem=makeFullElement(taskItem, 'div', ['taskItem']);
    inputArea=makeFullElement(inputArea, 'div', ['inputArea']);
    actionArea=makeFullElement(actionArea, 'div', ['actionArea']);
    tic=makeFullElement(tic, 'div', ['tic']);
        tic.addEventListener('click',ticAction);
    pen=makeFullElement(pen, 'div', ['edit', 'pen']);
        pen.addEventListener('click',redoMode);
    plus=makeFullElement(plus, 'div', ['plus', 'addSubList']);
        plus.addEventListener('click',subList);
    trash=makeFullElement(trash, 'div', ['trash']);
        trash.addEventListener('click',erase);

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
function subList(){
    let subBoard, orderLi, box, inputSubList, plus;
    subBoard=makeFullElement(subBoard, 'div', ['subBoard']);
    orderLi=makeFullElement(orderLi, 'ol')
    box=makeFullElement(box, 'div', ['box']);
    inputSubList=makeFullElement(inputSubList, 'input', '', 'Dodaj podpunkt do zadania')
        inputSubList.addEventListener('keydown',function(e){
            if(e.key=="Enter") addSubItem(this);
        });
    plus=makeFullElement(plus, 'div', ['plus', 'addSubItem'])
        plus.addEventListener('click',function(){addSubItem(this.previousSibling)});

        subBoard.appendChild(orderLi);
        box.appendChild(inputSubList);
        box.appendChild(plus);
        subBoard.appendChild(box);

    this.closest('li').appendChild(subBoard);
    this.removeEventListener('click',subList);
    this.className='arr';
    this.addEventListener('click',hideSubList);
    inputSubList.focus();
}
function addSubItem(that){
    let trash, tic, subItem, subInputArea, subActionArea, subTaskItem;

    trash=makeFullElement(trash, 'div', ['trash']);
        trash.addEventListener('click',erase);
    tic=makeFullElement(tic, 'div', ['tic'])
        tic.addEventListener('click',ticAction);
    subItem=makeFullElement(subItem, 'li')
    subInputArea=makeFullElement(subInputArea, 'div', ['subInputArea']);
    subActionArea=makeFullElement(subInputArea, 'div', ['subActionArea'])
    subTaskItem=makeFullElement(subTaskItem, 'div', ['subTaskItem'])

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