CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at  TIMESTAMP DEFAULT NOW (),
    updated_at  TIMESTAMP DEFAULT NOW ()
);

CREATE TABLE modules (
    id             SERIAL PRIMARY KEY,
    name           TEXT NOT NULL,
    description    TEXT NOT NULL,
    resources      TEXT []
);

CREATE TYPE question_type AS ENUM ('select', 'drag');

CREATE TABLE questions (
    id                   SERIAL PRIMARY KEY,
    question             TEXT NOT NULL,
    answer               TEXT NOT NULL,
    question_spanish     TEXT NOT NULL,
    answer_spanish       TEXT NOT NULL,  
    incorrect_answers    TEXT [] NOT NULL,
    incorrect_answers_spanish TEXT [] NOT NULL,
    type                 question_type,
    module_id            INTEGER NOT NULL, 
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE TABLE user_profiles (
    id          SERIAL PRIMARY KEY,
    first_name  TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW (),
    updated_at  TIMESTAMP DEFAULT NOW (),
    user_id     INTEGER NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE userprogress (
    id                     SERIAL PRIMARY KEY,
    user_id                INTEGER NOT NULL,
    FOREIGN KEY (user_id)  REFERENCES users(id),
    module_one             BOOLEAN DEFAULT 'f',
    module_two             BOOLEAN DEFAULT 'f',
    module_three           BOOLEAN DEFAULT 'f',
    module_four            BOOLEAN DEFAULT 'f',
    module_five            BOOLEAN DEFAULT 'f',
    module_six             BOOLEAN DEFAULT 'f'
);

INSERT INTO modules (name, description)
VALUES('Learn Python','Learn Python basics.');

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 1);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 1);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 1);


