function erase() {
	this.closest('ul, ol').removeChild(this.closest('li'))
	counter()
}

function ticAction() {
	this.classList.toggle('ticActive')
	const btn = document.getElementById('btnG')
	const ticks = document.querySelectorAll('.ticActive')
	if (ticks.length > 0) btn.className = 'btn btn-success'
	else btn.className = 'btn btn-secondary'
}

function hideSubList() {
	const subBoard = this.parentNode.parentNode.nextSibling
	subBoard.classList.toggle('hide')
	this.classList.toggle('rotor')
}

function redoMode() {
	const rootElement = this.parentNode.previousSibling
	const oldTask = rootElement.firstChild.nodeValue

	const save = () => {
		const updTask = rootElement.firstChild.nextSibling
		rootElement.removeChild(updTask)
		rootElement.firstChild.nodeValue = updTask.value
		this.classList.remove('save')
		this.classList.add('pen')
		if (updTask.value == '') this.closest('ul').removeChild(this.closest('li'))
	}

	const editInput = makeFullElement('input', [], 'Aktualizuj zadanie')
	editInput.value = oldTask
	editInput.addEventListener('keydown', e => e.key == 'Enter' ? save() : null )
	
	if( this.classList.contains('pen') ) {
		rootElement.firstChild.nodeValue = ''
		rootElement.appendChild(editInput)
		this.classList.remove('pen')
		editInput.focus()
		this.classList.add('save')
	}
	else if( this.classList.contains('edit') ) save( this )
	
	counter()
}