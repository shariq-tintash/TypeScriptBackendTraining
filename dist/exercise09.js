const admins = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];
const users = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];
export function requestAdmins(callback) {
    callback({
        status: 'success',
        data: admins
    });
}
export function requestUsers(callback) {
    callback({
        status: 'success',
        data: users
    });
}
export function requestCurrentServerTime(callback) {
    callback({
        status: 'success',
        data: Date.now()
    });
}
export function requestCoffeeMachineQueueLength(callback) {
    callback({
        status: 'error',
        error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
    });
}
function logPerson(person) {
    console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}
function startTheApp(callback) {
    requestAdmins((adminsResponse) => {
        console.log('Admins:');
        if (adminsResponse.status === 'success') {
            adminsResponse.data.forEach(logPerson);
        }
        else {
            return callback(new Error(adminsResponse.error));
        }
        console.log();
        requestUsers((usersResponse) => {
            console.log('Users:');
            if (usersResponse.status === 'success') {
                usersResponse.data.forEach(logPerson);
            }
            else {
                return callback(new Error(usersResponse.error));
            }
            console.log();
            requestCurrentServerTime((serverTimeResponse) => {
                console.log('Server time:');
                if (serverTimeResponse.status === 'success') {
                    console.log(`   ${new Date(serverTimeResponse.data).toLocaleString()}`);
                }
                else {
                    return callback(new Error(serverTimeResponse.error));
                }
                console.log();
                requestCoffeeMachineQueueLength((coffeeMachineQueueLengthResponse) => {
                    console.log('Coffee machine queue length:');
                    if (coffeeMachineQueueLengthResponse.status === 'success') {
                        console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
                    }
                    else {
                        return callback(new Error(coffeeMachineQueueLengthResponse.error));
                    }
                    callback(null);
                });
            });
        });
    });
}
startTheApp((e) => {
    console.log();
    if (e) {
        console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
    }
    else {
        console.log('Success!');
    }
});
