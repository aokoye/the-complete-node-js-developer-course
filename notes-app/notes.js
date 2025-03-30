const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken! Choose a unique title.'))
    }
}


const saveNotes = (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
    
}


const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length === notesToKeep.length) {
        console.log(chalk.red('Note title not found, check the title and try again.'))
    } else {
        console.log(chalk.green('Note removed!'))
        saveNotes(notesToKeep)
    } 
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.magenta.bold('List of Notes'))
    notes.forEach((note) => {
        console.log(chalk.cyanBright(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead) {
        console.log(chalk.bold(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red('Sorry we couldn\'t find that note.'))
    }
} 

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}