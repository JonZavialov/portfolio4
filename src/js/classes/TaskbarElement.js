class TaskbarElement {
	constructor(displayName, id, iconPath) {
		this.displayName = displayName;
		this.iconPath = iconPath;
		this.id = id;
	}

	generateElement() {
		this.elem = document.createElement('button');
		this.elem.className = 'taskbar-element';
		this.elem.id = this.id + 'TaskbarElement';
		this.elem.innerHTML = `<img src="${this.iconPath}" alt="${this.id}"> <p>${this.displayName}</p>`;
	}

	render() {
		if ($("[id='" + this.id + "']").length > 1) return;
		$('#taskbarIcons').append(this.elem);
	}

	checkForClose() {
		if ($("[id='" + this.id + "']").length == 0)
			$('#' + this.id + 'TaskbarElement').remove();
	}
}
