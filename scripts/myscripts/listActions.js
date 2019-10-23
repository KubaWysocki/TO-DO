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
	let oldTask = this.parentNode.previousSibling.firstChild.nodeValue

	function save( that ) {
		let updTask = that.parentNode.previousSibling.firstChild.nextSibling
		that.parentNode.previousSibling.removeChild(
			that.parentNode.previousSibling.firstChild.nextSibling
		)
		that.parentNode.previousSibling.firstChild.nodeValue = updTask.value
		that.classList.remove('save')
		that.classList.add('pen')
		if (updTask.value == '') that.closest('ul').removeChild(that.closest('li'))
	}

	const editInput = makeFullElement('input', null, 'Aktualizuj zadanie')
	editInput.value = oldTask
	editInput.addEventListener('keydown', e => e.key == 'Enter' ? save(this) : null )
	
	if( this.classList.contains('pen') ) {
		this.parentNode.previousSibling.firstChild.nodeValue = ''
		this.parentNode.previousSibling.appendChild(editInput)
		this.classList.remove('pen')
		editInput.focus()
		this.classList.add('save')
	}
	else if( this.classList.contains('edit') ) save( this )
	
	counter()
}