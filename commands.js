const { program } = require('commander');

program
  .command('add <title> <date>')
  .description('add new note to database')

program
  .command('delete <noteId>')
  .description('delete a note from database')

program
  .command('list')
  .description('show all data in database')

program.parse(process.argv)