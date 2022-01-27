class Icon {
	constructor(
		displayName,
		iconImagePath,
		className,
		parent,
		clickFunction = null,
		selectable = true
	) {
		this.displayName = displayName;
		this.iconImagePath = iconImagePath;
		this.className = className + 'Icon';
		this.parent = parent;
		this.selected = false;
		this.clickFunction = clickFunction;
		this.selectable = selectable;
	}

	generateElement() {
		this.iconElem = document.createElement('div');
		this.iconElem.className = this.className + ' ' + this.parent + 'Icon';
		this.iconElem.id = 'icon';
		if (this.parent == 'desktop') this.iconElem.style.borderColor = '#008080';
		else this.iconElem.style.borderColor = '#e7e7e7';

		let iconImage = document.createElement('img');
		iconImage.src = this.iconImagePath;
		this.iconElem.appendChild(iconImage);

		let iconLabel = document.createElement('p');
		iconLabel.innerHTML = this.displayName;
		if (this.parent == 'desktop') iconLabel.style.color = 'white';
		else iconLabel.style.color = 'black';
		this.iconElem.appendChild(iconLabel);

		this.iconElem.onmousedown = (e) => {
			this.onClick(e);
		};
	}

	renderIntoColumn(element) {
		element.appendChild(this.iconElem);
	}

	onClick(e) {
		if (!this.selectable) return;
		removeAllBorders(e.target.className);
		if (this.selected) {
			//object was double clicked
			this.removeBorder();
			this.doubleClick();
		} else {
			//object was single clicked
			let borderColor;
			if (this.parent == 'desktop') borderColor = '#e7e7e7';
			else borderColor = 'blue';
			this.iconElem.style.borderColor = borderColor;
			this.selected = true;
		}
	}

	doubleClick() {
		if (!this.clickFunction) return;
		if (typeof this.clickFunction === 'function') this.clickFunction();
	}

	selectWithBox() {
		if (this.selected) return;
		this.iconElem.style.borderColor = '#e7e7e7';
		this.selected = true;
	}

	removeBorder(unselect = true) {
		let borderColor;
		if (this.parent == 'desktop') borderColor = '#008080';
		else borderColor = '#e7e7e7';
		this.iconElem.style.borderColor = borderColor;
		if (unselect) this.selected = false;
	}

	makeDraggable() {
		$(this.iconElem).draggable({ containment: '#desktop' });
	}

	checkForRecycle() {
		if (this.className == 'recycleBinIcon' || this.parent !== 'desktop') return;
		if (doElsCollide($(this.iconElem), $('.recycleBinIcon'))) {
			this.hoveringOverRecycleBin = true;
			this.iconElem.style.opacity = 0.5;
			this.removeBorder();
		} else {
			this.hoveringOverRecycleBin = false;
			this.iconElem.style.opacity = 1;
		}
	}

	checkForReleasedOverRecycle() {
		if (!this.hoveringOverRecycleBin) return;

		this.iconElem.style.transform = 'scale(0)';
		iconClasses.splice(iconClasses.indexOf(this), 1);
		recycledIcons.push(this);

		try {
			recycleBinWindows.forEach((recycleClass) => {
				let newIcon = recycleClass.generateRecycledIcon(this);
				newIcon.generateElement();
				recycleClass.addIcon(
					newIcon,
					recycleClass.elem.getElementsByClassName('recycleBinContents')[0],
					recycledIcons.length
				);
			});
		} catch {}
	}
}
