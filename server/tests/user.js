module.exports = {
    testall: function () {
        console.log("Running User Testall");
        
        // run all tests

        const tests = [name_null, name_empty]

        let score = 0;
        for (i=0; i<tests.length; i++) {
            score += (tests[i]())? 1 : 0;
        }

        console.log("Finished. Score: " + score + "/" + tests.length);
    }
};

function name_null () {
    console.log("name is null");

    return false;
}

function name_empty () {
    console.log("name is empty");

    return false;
}