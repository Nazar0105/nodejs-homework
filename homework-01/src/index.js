// index.js
const yargs = require('yargs');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const options = yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'list',
    describe: 'List all contacts',
  })
  .command({
    command: 'get',
    describe: 'Get contact by ID',
    builder: {
      id: {
        describe: 'Contact ID',
        demandOption: true,
        type: 'string',
      },
    },
  })
  .command({
    command: 'add',
    describe: 'Add a new contact',
    builder: {
      name: {
        describe: 'Contact name',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Contact email',
        demandOption: true,
        type: 'string',
      },
      phone: {
        describe: 'Contact phone',
        demandOption: true,
        type: 'string',
      },
    },
  })
  .command({
    command: 'remove',
    describe: 'Remove contact by ID',
    builder: {
      id: {
        describe: 'Contact ID',
        demandOption: true,
        type: 'string',
      },
    },
  })
  .demandCommand()
  .help().argv;

async function run() {
  try {
    switch (options._[0]) {
      case 'list':
        const allContacts = await listContacts();
        console.log('List of contacts:');
        console.log(allContacts);
        break;

      case 'get':
        const contactById = await getContactById(options.id);
        console.log('Contact by ID:');
        console.log(contactById || 'Contact not found');
        break;

      case 'add':
        const newContact = await addContact(options.name, options.email, options.phone);
        console.log('New contact added:');
        console.log(newContact);
        break;

      case 'remove':
        const removedContact = await removeContact(options.id);
        console.log('Removed contact:');
        console.log(removedContact || 'Contact not found');
        break;

      default:
        console.log('Invalid command. Use --help for usage information.');
        break;
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

run();
