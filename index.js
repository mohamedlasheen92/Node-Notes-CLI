const commands = require('./commands');
const fs = require('fs');

const data = fs.readFileSync('./notes.json', 'utf-8');

// node index.js add title date
const [, , action, title, date] = process.argv;

// Read the Date from DataBase
const readDB = () => {
  const dbStr = fs.readFileSync('./notes.json', 'utf-8') || [];
  return dbStr.length === 0 ? [] : JSON.parse(dbStr);
}
// Add New Note to DataBase
const addNote = ({ title, date }) => {
  const db = readDB();

  const theNewNote = { id: Date.now(), title: title, date: date };
  db.push(theNewNote)

  fs.writeFileSync('./notes.json', JSON.stringify(db, null, 2), 'utf-8');
  console.log('Note has been added successfully.');
  console.log(`The Note:\n${JSON.stringify(theNewNote)}`);
}
// Display All Data in DataBase
const display = () => {
  const db = readDB();
  console.log(db);
}
// Delete a Note From DataBase
const deleteNote = (noteId) => {
  const db = readDB();
  let itemIndex;
  for (const index in db) {

    if (db[index]['id'] == noteId) {
      itemIndex = index;
      break;
    }
  }
  db.splice(itemIndex, 1);
  fs.writeFileSync('./notes.json', JSON.stringify(db, null, 2));
  console.log('The Note has been deleted successfully.');
}

switch (action) {
  case "add":
    addNote({ title: title, date: date });
    break;
  case "list":
    display();
    break;
  case 'delete':
    deleteNote(title);
    break;
  default:
    throw new Error('Not Implemented');
}


