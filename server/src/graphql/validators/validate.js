// for debugging: true=validate , false=skip_validation
const trigger = true;

// EMAIL

function validate_email (email) {
    if (!trigger) return 'ok';

    if (!validate_argument(email)) return arg_error(email, "that exists that is more than just whitespace");

    return 'ok';
}

// PASSWORD

function validate_password (password) {
    if (!trigger) return 'ok';

    if (!validate_argument(password)) return arg_error(password, "that exists that is more than just whitespace");

    return 'ok';
}

// USER

function validate_human_name (name) {
    if (!trigger) return 'ok';

    if (!validate_argument(name)) return arg_error(name, "that exists that is more than just whitespace");

    return 'ok';
}

// COURSE

function validate_course_name (name) {
    if (!trigger) return 'ok';

    if (!validate_argument(name)) return arg_error(name, "that exists that is more than just whitespace");

    return 'ok';
}

// SECTION

function validate_section_name (name) {
    if (!trigger) return 'ok';

    if (!validate_argument(name)) return arg_error(name, "that exists that is more than just whitespace");

    return 'ok';
}

// ROLE

function validate_role_type (type) {
    if (!trigger) return 'ok';

    if (!validate_argument(type)) return arg_error(type, "that exists that is more than just whitespace");

    return 'ok';
}

// QUIZ

function validate_quiz_type (type) {
    if (!trigger) return 'ok';

    if (!validate_argument(type)) return arg_error(type, "\'multiple-choice\' , \'short-answer\' , \'true-false\'");

    // check the quiz type against the format options
    // format: multiple-choice , short-answer , true-false

    const format = ["multiple-choice" , "short-answer" , "true-false"]
    let matched = false;

    for (option in format) {
        if (option === type) matched = true;
    }

    // if (!matched) throw new Error("Unknown Quiz type: \'" + type + "\'; expected string: \'multiple-choice\' , \'short-answer\' , \'true-false\'");
    if (!matched) return "Unknown Quiz type: \'" + type + "\'; expected string: \'multiple-choice\' , \'short-answer\' , \'true-false\'";
    
    return 'ok';
}

function validate_quiz_question (question) {
    if (!trigger) return 'ok';

    if (!validate_argument(question)) return arg_error(question, "that exists that is more than just whitespace");

    return 'ok';
}

function validate_quiz_options (options) {
    if (!trigger) return 'ok';

    if (!validate_argument(options)) return arg_error(options, "option1;option2;option3;...");

    return 'ok';
}

function validate_quiz_correct_answer (answer) {
    if (!trigger) return 'ok';

    if (!validate_argument(answer)) return arg_error(answer, "that exists that is more than just whitespace");
    
    return 'ok';
}

// ANSWER

function validate_answer_type (type) {
    if (!trigger) return 'ok';

    if (!validate_argument(type)) return arg_error(type, "that exists that is more than just whitespace");

    return 'ok';
}

function validate_answer_content (content) {
    if (!trigger) return 'ok';

    if (!validate_argument(content)) return arg_error(content, "that exists that is more than just whitespace");

    return 'ok';
}

// OTHER

function validate_date (date) {
    if (!trigger) return 'ok';

    // format: "MMDDYYYY"
    const format = "MMDDYYYY";

    if (!validate_argument(date)) return arg_error(date, format);

    // check length is correct
    // if (date.length !== format.length) throw new Error("Improper argument format: \'" + date + "\'; expected string: \'" + format + "\'");
    if (date.length !== format.length) return arg_error(date, format);

    // make sure all characters are numbers
    // if (!isNumeric(date)) throw new Error("Improper argument format: \'" + date + "\'; expected string: that contains only numbers");
    if (!isNumeric(date)) return arg_error(date, "that contains only numbers");

    return 'ok';
}

// UTILS

// throw new Error("Improper argument format: \'" + arg + "\'; expected string: \'" + properFormat + "\'")
function validate_argument (arg) {
    // not null  |  is string  |  not empty  |  more than just whitespace
    // if (!arg || !is_string(arg) || 0 === arg.length || !!arg.trim()) throw new Error("Improper argument format: \'" + arg + "\'; expected string: \'" + properFormat + "\'");
    return (arg && is_string(arg) && 0 < arg.length && !!arg.trim());
}

function is_string (s) {
    return Object.prototype.toString.call(s) === "[object String]"
}

function isNumeric (val) {
    return !isNaN(val - parseFloat(val));
}

function arg_error (arg, properFormat) {
    return "Improper argument format: \'" + arg + "\'; expected string: \'" + properFormat + "\'";
}

// EXPORT
module.exports = {
    validate_answer_type,
    validate_answer_content
}