const addBtn = document.querySelector("#addBtn");
const contenedor = document.querySelector("#contenedor");

addBtn.addEventListener("click",addNote);

function addNote(){
	const note = document.createElement("div");
	note.classList.add("nota");
	note.innerHTML = `
	   <div class="herramienta">
			<i class="save fas fa-save"></i>
			<i class="trash fas fa-trash"></i>
		</div>
		<textarea></textarea>
		`;
	
	const save = note.querySelector(".save");
	const trash = note.querySelector(".trash");
	const textarea = note.querySelector("textarea");
	
	save.addEventListener("click",saveNotes);
	textarea.addEventListener("input",saveNotes);
	trash.addEventListener("click",()=>{
		note.remove();
		saveNotes();
		
	});
	
	contenedor.appendChild(note);
}

function saveNotes(){
	const notes = document.querySelectorAll(".nota textarea");
	const data = Array.from(notes).map(notes => notes.value);
	console.log(notes, data);
	
	if(data.length === 0){
		localStorage.removeItem("notes");
	}else{
		localStorage.setItem("notes",JSON.stringify(data));
	}
}

function loadNotes(){
	
	const lsNotes = JSON.parse(localStorage.getItem("notes"));
	
	if(lsNotes !== null){
		lsNotes.forEach(noteText => {
			addNote();
			const notes = document.querySelectorAll(".nota textarea");
			const lastNote = notes[notes.length -1];
			lastNote.value = noteText;
			
			
		});
	}else{
		addNote();
	}
}

loadNotes();