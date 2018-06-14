/*eslint-disable no-redeclare, no-unused-vars*/
function getFile() {
	document.getElementById("fileinput").click();
}

function fileSelected(files) {
	var icon = document.getElementById("icon");
	var uploadingText = document.getElementById("uploadingText");

	icon.style.display = "none";
	uploadingText.style.display = "initial";

	var uploadingText = document.getElementById("uploadingText");

	uploadingText.innerHTML = "File Uploaded";

	setTimeout(function() {
		uploadingText.innerHTML = "Uploading...";
		uploadingText.style.display = "none";
		icon.style.display = "initial";
	}, 3000);

	displayData(files[0]);
}

function dropHandler(event) {
	event.preventDefault();

	var uploadTarget = document.getElementById("circle");
	var icon = document.getElementById("icon");
	var uploadingText = document.getElementById("uploadingText");

	uploadTarget.style.height = "100px";
	uploadTarget.style.width = "100px";
	icon.style.height = "75px";
	icon.style.width = "75px";

	icon.style.display = "none";
	uploadingText.style.display = "initial";

	if (event.dataTransfer.items) {
		var items = event.dataTransfer.items;

		if (items.length > 1) {
			alert("You can only upload one file at a time.");
		} else {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind === "file") {
					var uploadingText = document.getElementById("uploadingText");

					uploadingText.innerHTML = "File Uploaded";

					setTimeout(function() {
						uploadingText.innerHTML = "Uploading...";
						uploadingText.style.display = "none";
						icon.style.display = "initial";
					}, 3000);

					displayData(items[i].getAsFile());
				}
			}
		}
	} else {
		var items = event.dataTransfer.files;

		if (items.length > 1) {
			alert("You can only upload one file at a time.");
		} else {
			for (var i = 0; i < items.length; i++) {
				if (items[i].kind === "file") {
					var uploadingText = document.getElementById("uploadingText");

					uploadingText.innerHTML = "File Uploaded";

					setTimeout(function() {
						uploadingText.innerHTML = "Uploading...";
						uploadingText.style.display = "none";
						icon.style.display = "initial";
					}, 3000);

					displayData(items[i]);
				}
			}
		}
	}

	removeDragData(event);
}

function dragOverHandler(event) {
	event.preventDefault();

	event.dataTransfer.dropEffect = "move";

	var uploadTarget = document.getElementById("circle");
	var icon = document.getElementById("icon");

	uploadTarget.style.height = "120px";
	uploadTarget.style.width = "120px";
	icon.style.height = "95px";
	icon.style.width = "95px";
}

function dragLeave() {
	var uploadTarget = document.getElementById("circle");
	var icon = document.getElementById("icon");

	uploadTarget.style.height = "100px";
	uploadTarget.style.width = "100px";
	icon.style.height = "75px";
	icon.style.width = "75px";
}

function removeDragData(event) {
	if (event.dataTransfer.items) {
		event.dataTransfer.items.clear();
	} else {
		event.dataTransfer.clearData();
	}
}

function fadeElement(element, time, callback) {
	var effect = setInterval(function() {
		if (!element.style.opacity) {
			element.style.opacity = 1;
		}

		if (element.style.opacity > 0) {
			element.style.opacity -= 0.1;
		} else {
			element.style.display = "none";
			clearInterval(effect);
			callback();
		}
	}, time);
}

function displayData(file) {
	var uploadTarget = document.getElementById("circle");

	if (!uploadTarget.style.opacity) {
		fadeElement(uploadTarget, 75, function() {
			var reader = new FileReader();

			reader.onload = function() {
				var data = JSON.parse(reader.result);
				
				var table = document.createElement("table");
				
				table.id = "data";
				table.cellSpacing = "0";
				
				var tableHeader = document.createElement("tr");
				var itemName = document.createElement("td");
				var profit = document.createElement("td");
				var id = document.createElement("td");
				
				itemName.id = "header";
				itemName.innerHTML = "Item Name";
				profit.id = "header";
				profit.innerHTML = "Profit (isk)";
				profit.style.textAlign = "right";
				id.id = "header";
				id.innerHTML = "ID";
				id.style.textAlign = "right";
				
				tableHeader.appendChild(itemName);
				tableHeader.appendChild(id);
				tableHeader.appendChild(profit);
				
				table.appendChild(tableHeader);

				data.forEach(function(object) {
					var tr = document.createElement("tr");
					var inner = document.createElement("td");
					var outer = document.createElement("td");
					var id = document.createElement("td");
					
					inner.id = "cellInner";
					inner.innerHTML = object.profit;
					outer.id = "cellOuter";
					outer.innerHTML = object.name;
					id.id = "cellInner";
					id.innerHTML = object.id;
					
					tr.appendChild(outer);
					tr.appendChild(id);
					tr.appendChild(inner);
					table.appendChild(tr);
				});
				
				document.getElementById("upload").appendChild(table);
			};

			var fileContent = reader.readAsText(file);
		});
	}
}
