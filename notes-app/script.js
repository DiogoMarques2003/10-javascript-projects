const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {
    notes.forEach(note => addNewNote(note));
}

addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(noteValue = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${noteValue ? '' : 'hidden'}"></div>
            <textarea class="${noteValue ? 'hidden' : ''}"></textarea>
        </div>
    `;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');

    const mainEl = note.querySelector('.main');
    const textAreaEl = note.querySelector('textarea');

    mainEl.innerHTML = marked(noteValue);
    textAreaEl.value = noteValue;

    editBtn.addEventListener('click', () => {
        mainEl.classList.toggle('hidden');
        textAreaEl.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });

    textAreaEl.addEventListener('input', (e) => {
        const { value } = e.target;

        mainEl.innerHTML = marked(value);
        
        updateLS();
    });

    document.body.appendChild(note);
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        if(note.value)
            notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
