const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')



//Customize yargs version
yargs.version('1.1.0')

//Create add command
yargs.command({
    command: 'add',
    description: 'Add a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note content',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    description: 'Remove a note',
    builder: {
        title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    description: 'List of notes',
    handler: function() {
        console.log('Listing notes')
    }
})

//Create read command
yargs.command({
    command: 'read',
    description: 'Let user read notes',
    handler: function() {
        console.log('Read notes!')
    }
})


yargs.parse()
