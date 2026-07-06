create table if not exists users(
    token text primary key,
    name text,
    email text,
    picture text,
    createdAt timestamp not null default now()
);

create table if not exists cats(
    catId int primary key,
    breed varchar(100) not null,
    personality text[] not null,
    imgPath text,
    cluster int not null
);

create table if not exists cat_status (
    id serial primary key,
    token text references users(token),
    catId int references cats(catId),
    hunger int not null default 100,
    happiness int not null default 100,
    cleanness int not null default 100,
    health int not null default 100,
    updatedAt timestamp not null default now()
);

create table if not exists questions (
    questionId int primary key,
    questionText text not null
);

create table if not exists answers (
    answerId int primary key,
    questionId int not null references questions(questionId),
    answerText text not null,
    interactionScore int not null default 0,
    aggressiveScore int not null default 0,
    shynessScore int not null default 0
);

create table if not exists stories (
    storyId int primary key,
    questionId int not null references questions(questionId),
    pageOrder int not null,
    storyText text not null,
    imgPath text,
    UNIQUE (questionId, pageOrder)
);