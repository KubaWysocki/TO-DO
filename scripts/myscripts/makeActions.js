function makeActions() {
	const trash = document.querySelectorAll('.trash')
	trash.forEach(t => t.addEventListener('click', erase))

	const allTic = document.querySelectorAll('.tic')
	allTic.forEach(a => a.addEventListener('click', ticAction))

	const edit = document.querySelectorAll('.edit')
	edit.forEach(e => e.addEventListener('click', redoMode))

	const addSubList = document.querySelectorAll('.addSubList')
	addSubList.forEach(asl => asl.addEventListener('click', subList))

	const arrow = document.querySelectorAll('.arr')
	arrow.forEach(arr => arr.addEventListener('click', hideSubList))

	const subItem = document.querySelectorAll('.addSubItem')
	subItem.forEach(si => si.addEventListener('click', function() { addSubItem(this.previousSibling) }))

	const inputSubList = document.querySelectorAll('.inputSubList')
	inputSubList.forEach(isl =>
		isl.addEventListener('keydown', function(e) {
			if (e.key == 'Enter') addSubItem(this)
		})
	)
}