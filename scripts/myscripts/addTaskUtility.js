function addTaskUtility() {
	const actualTask = document.getElementById('task')
	if (!actualTask.value) return

	const taskList = document.getElementById('taskList')

	const newTask = makeFullElement('li')
	const taskItem = makeFullElement('div', ['taskItem'])
	const inputArea = makeFullElement('div', ['inputArea'])
	const actionArea = makeFullElement('div', ['actionArea'])
	
	const tic = makeFullElement('div', ['tic'])
	tic.addEventListener('click', ticAction)
	
	const pen = makeFullElement('div', ['edit', 'pen'])
	pen.addEventListener('click', redoMode)
	
	const plus = makeFullElement('div', ['plus', 'addSubList'])
	plus.addEventListener('click', subList)
	
	const trash = makeFullElement('div', ['trash'])
	trash.addEventListener('click', erase)

	inputArea.appendChild(document.createTextNode(actualTask.value))
	actionArea.appendChild(pen)
	actionArea.appendChild(tic)
	actionArea.appendChild(plus)
	actionArea.appendChild(trash)

	taskItem.appendChild(inputArea)
	taskItem.appendChild(actionArea)

	newTask.appendChild(taskItem)

	taskList.insertBefore(newTask, taskList.childNodes[0])
	counter()
	actualTask.value = ''
}

function counter() {
	const taskCo = document.getElementById('counter')
	taskCo.innerHTML = document.querySelectorAll('.taskItem').length
}