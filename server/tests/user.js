function name_null () {
    console.log("name is null");

    return true;
}

function name_empty () {
    console.log("name is empty");

    return true;
}

module.exports = {
    testall: function () {
        console.log("Running User Testall");
        
        // congregate all tests
        const tests = [name_null, name_empty]

        let score = 0;
        for (i=0; i<tests.length; i++) {
            score += (tests[i]())? 1 : 0;
        }

        // print score
        console.log("Finished. Score: " + score + "/" + tests.length);
    }
};