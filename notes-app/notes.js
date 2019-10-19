const fs = require('fs');
const chalk = require('chalk');
const getNotes = function(){
    return 'Your notes...';
}

debugger

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note =>  note.title === title );

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.inverse('New note added'));
    }else{
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
}
const removeNote = (title) => {
    const notes = loadNotes();
    const noteKeeps = notes.filter(note => note.title !== title);
    if(noteKeeps.length === notes.length){
        console.log(chalk.red.inverse('No note found!'));
    }else{
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(noteKeeps);
    }
    
}

const listNotes = () => {
    console.log(chalk.inverse('Your notes'));
    const notes = loadNotes();
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const readNote = notes.find(note => note.title === title);
    if(readNote){
        console.log(chalk.bold(readNote.title));
        console.log(readNote.body);
    }
    else{
        console.log('No note found');
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
    
}
module.exports = {
    addNote: addNote,
    removeNote : removeNote,
    listNotes: listNotes,
    readNote: readNote
}