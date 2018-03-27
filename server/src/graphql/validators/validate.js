const testing = true;

// EMAIL

function validate_email (email) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// PASSWORD

function validate_password (password) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// USER

function validate_human_name (name) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// COURSE

function validate_course_name (name) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// SECTION

function validate_section_name (name) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// ROLE

function validate_role_type (type) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// QUIZ

function validate_quiz_type (type) {
    if (!testing) return;

    validate_argument(content, "\'multiple-choice\' , \'short-answer\' , \'true-false\'");

    // check the quiz type against the format options
    // format: multiple-choice , short-answer , true-false

    const format = ["multiple-choice" , "short-answer" , "true-false"]
    let matched = false;

    for (option in format) {
        if (option === type) matched = true;
    }

    if (!matched) throw new Error("Unknown Quiz type: \'" + type + "\'; expected string: \'multiple-choice\' , \'short-answer\' , \'true-false\'");
}

function validate_quiz_question (question) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");

    // make sure question exists and is not empty
}

function validate_quiz_options (options) {
    if (!testing) return;

    validate_argument(content, "option1;option2;option3;...");
}

function validate_quiz_correct_answer (answer) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// ANSWER

function validate_answer_type (type) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

function validate_answer_content (content) {
    if (!testing) return;

    validate_argument(content, "that exists that is more than just whitespace");
}

// OTHER

function validate_date (date) {
    if (!testing) return;

    // format: "MMDDYYYY"
    const format = "MMDDYYYY";

    validate_argument(date, format);

    // check length is correct
    if (date.length !== format.length) throw new Error("Improper argument format: \'" + date + "\'; expected string: \'" + format + "\'");

    // make sure all characters are numbers
    if (!isNumeric(date)) throw new Error("Improper argument format: \'" + date + "\'; expected string: that contains only numbers");
}

// UTILS

function validate_argument (arg, properFormat) {
    if (!testing) return;

    // not null  |  is string  |  not empty  |  more than just whitespace
    if (!arg || !is_string(arg) || 0 === arg.length || !!arg.trim()) throw new Error("Improper argument format: \'" + arg + "\'; expected string: \'" + properFormat + "\'")
}

function is_string (s) {
    return Object.prototype.toString.call(s) === "[object String]"
}

function isNumeric (val) {
    return !isNaN(val - parseFloat(val));
}