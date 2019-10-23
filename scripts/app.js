window.onload = () => {
	const plus = document.getElementById('addTask')
	plus.addEventListener('click', addTaskUtility)

	const enterTask = document.getElementById('task')
	enterTask.focus()
	enterTask.addEventListener('keydown', e => e.key == 'Enter' ? addTaskUtility() : null )

	const reset = document.getElementById('btnR')
	reset.addEventListener('click', () => {
		if( document.querySelectorAll('.taskItem').length > 0 ) {
			if( confirm('Czy na pewno chcesz usunąć wszystko?') ) {
				document.getElementById('taskList').innerHTML = ''
				counter()
			}
		}
	})
	
	const delDone = document.getElementById('btnG')
	delDone.addEventListener('click', () => {
		const done = document.querySelectorAll('.ticActive')
		done.forEach( d => d.closest('ul, ol').removeChild(d.closest('li')) )
		
		counter()
		delDone.className = 'btn btn-secondary'
	})

	const memo = localStorage.getItem('list')
	document.getElementById('taskList').innerHTML = memo

	makeActions()
	counter()
}
window.onunload = () => {
	const unsavedTasks = document.querySelectorAll('.save')
	unsavedTasks.forEach( ut => ut.closest('li').removeChild(ut))
	localStorage.setItem('list', document.getElementById('taskList').innerHTML)
}