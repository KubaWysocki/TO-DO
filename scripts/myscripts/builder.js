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
function makeFullElement(element ,type, style, plHold){
    element=document.createElement(type);
    if(style){for(i=0;i<style.length;i++){
        element.classList.add(style[i]);
    }}
    if(plHold) element.placeholder=plHold;
    return element;
}