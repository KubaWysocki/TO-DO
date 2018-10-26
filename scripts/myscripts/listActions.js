function counter(){
    const taskCo=document.getElementById('counter');
    taskCo.innerHTML=document.querySelectorAll('.taskItem').length;
}
function erase(){
    this.closest('ul, ol').removeChild(this.closest('li'));
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
    let editInput;
    editInput=makeFullElement(editInput, 'input', [], 'Aktualizuj zadanie')
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
        if (updTask.value=="") that.closest('ul').removeChild(that.closest('li'));
    }
    counter();
}
function hideSubList(){
    const subBoard=this.parentNode.parentNode.nextSibling;
    subBoard.classList.toggle('hide');
    this.classList.toggle('rotor');
}