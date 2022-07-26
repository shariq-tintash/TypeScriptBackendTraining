import * as dateWizard from 'date-wizard';
import './module-augmentations/date-wizard';
const admins = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator', registered: new Date('2016-06-01T16:23:13') },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver', registered: new Date('2017-02-11T12:12:11') },
    { type: 'admin', name: 'Steve', age: 40, role: 'Steve', registered: new Date('2018-01-05T11:02:30') },
    { type: 'admin', name: 'Will Bruces', age: 30, role: 'Overseer', registered: new Date('2018-08-12T10:01:24') },
    { type: 'admin', name: 'Superwoman', age: 28, role: 'Customer support', registered: new Date('2019-03-25T07:51:05') }
];
const users = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep', registered: new Date('2016-02-15T09:25:13') },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut', registered: new Date('2016-03-23T12:47:03') },
    { type: 'user', name: 'Moses', age: 70, occupation: 'Desert guide', registered: new Date('2017-02-19T17:22:56') },
    { type: 'user', name: 'Superman', age: 28, occupation: 'Ordinary person', registered: new Date('2018-02-25T19:44:28') },
    { type: 'user', name: 'Inspector Gadget', age: 31, occupation: 'Undercover', registered: new Date('2019-03-25T09:29:12') }
];
const isAdmin = (person) => person.type === 'admin';
const isUser = (person) => person.type === 'user';
function logPerson(person, index) {
    let additionalInformation = '';
    if (isAdmin(person)) {
        additionalInformation = person.role;
    }
    if (isUser(person)) {
        additionalInformation = person.occupation;
    }
    let registeredAt = dateWizard(person.registered, '{date}.{month}.{year} {hours}:{minutes}');
    let num = `#${dateWizard.pad(index + 1)}`;
    console.log(` - ${num}: ${person.name}, ${person.age}, ${additionalInformation}, ${registeredAt}`);
}
export { dateWizard };
console.log('All users:');
[]
    .concat(users, admins)
    .forEach(logPerson);
console.log();
console.log('Early birds:');
[]
    .concat(users, admins)
    .filter((person) => dateWizard.dateDetails(person.registered).hours < 10)
    .forEach(logPerson);
