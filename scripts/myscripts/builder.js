function makeFullElement(element ,type, style, plHold){
    element=document.createElement(type);
    if(style){for(i=0;i<style.length;i++){
        element.classList.add(style[i]);
    }}
    if(plHold) element.placeholder=plHold;
    return element;
}