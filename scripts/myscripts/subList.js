function subList() {
	const subBoard = makeFullElement('div', ['subBoard'])

	const orderLi = makeFullElement('ol')

	const box = makeFullElement('div', ['box'])

	const inputSubList = makeFullElement('input', null, 'Dodaj podpunkt do zadania')
	inputSubList.addEventListener('keydown', function(e) {
		if (e.key == 'Enter') addSubItem(this)
	})

	const plus = makeFullElement('div', ['plus', 'addSubItem'])
	plus.addEventListener('click', function() {
		addSubItem(this.previousSibling)
	})

	subBoard.appendChild(orderLi)
	box.appendChild(inputSubList)
	box.appendChild(plus)
	subBoard.appendChild(box)

	this.closest('li').appendChild(subBoard)
	this.removeEventListener('click', subList)
	this.className = 'arr'
	this.addEventListener('click', hideSubList)
	inputSubList.focus()
}

function addSubItem(that) {
	if (that.value) {
		const trash = makeFullElement('div', ['trash'])
		trash.addEventListener('click', erase)

		const tic = makeFullElement('div', ['tic'])
		tic.addEventListener('click', ticAction)

		const subItem = makeFullElement('li')
		const subInputArea = makeFullElement('div', ['subInputArea'])
		const subActionArea = makeFullElement('div', ['subActionArea'])
		const subTaskItem = makeFullElement('div', ['subTaskItem'])

		subTaskItem.appendChild(subInputArea)
		subTaskItem.appendChild(subActionArea)
		subInputArea.appendChild(document.createTextNode(that.value))
		subActionArea.appendChild(tic)
		subActionArea.appendChild(trash)
		subItem.appendChild(subTaskItem)
		
		that.parentNode.previousSibling.appendChild(subItem)
	}
	that.value = ''
}