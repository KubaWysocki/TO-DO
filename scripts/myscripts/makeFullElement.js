function makeFullElement(type, style, plHold) {
	const element = document.createElement(type)
	if( style ) style.forEach( s => element.classList.add( s ))
	if( plHold ) element.placeholder = plHold
	return element
}