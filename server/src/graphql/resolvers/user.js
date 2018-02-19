class User {
    constructor(id, {firstName, lastName}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.courses = [];
    }

    // addCourse () {}
}

var fakeDatabase = {};
fakeDatabase[0] = {id: 0, firstName: "Todd", lastName: "Griffin", courses: []};
fakeDatabase[1] = {id: 1, firstName: "Justin", lastName: "Hartman", courses: []};
fakeDatabase[2] = {id: 2, firstName: "Theo", lastName: "Burkhart", courses: []};
fakeDatabase[3] = {id: 3, firstName: "Mason", lastName: "Wesolek", courses: []};
fakeDatabase[4] = {id: 4, firstName: "Tyler", lastName: "Rex", courses: []};

export default {
    // Query //

    users: () => Object.values(fakeDatabase),

    user: ({id}) => {
        // make sure User with given id actually exists
        if (!fakeDatabase[id]) {
            // User with id doesn't exist, throw error
            throw new Error("No user exists with id: " + id + ".");
        }

        // return User to client
        return fakeDatabase[id];
    },
    
    // Mutation //

    createUser: ({input}) => {
        // (TEMPORARY FIX) use fakeDatabase's size to create initial id
        const id = Object.keys(fakeDatabase).length;

        // create new User
        const user = new User(id, input);

        // update database with new User (potentially async task)
        fakeDatabase[id] = user;

        // return newly created User to client
        return user;
    },

    updateUser: ({id, input}) => {
        // make sure User with given id actually exists
        if (!fakeDatabase[id]) {
            // User with id doesn't exist, throw error
            throw new Error("No user exists with id: " + id + ".");
        }

        // partially/fully update User
        Object.assign(fakeDatabase[id], input);
        
        // return updated User to client
        return fakeDatabase[id];
    }
}