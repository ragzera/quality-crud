import fs from "fs"; // ES6
// const fs = require("fs"); -- CommonJS

const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Array<Todo> = [...read(), todo];

  // save content in a file
  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todos,
      },
      null,
      2
    )
  );
  return content;
}

function read(): Array<Todo> {
  // read content from a file
  const db_res = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const parsed_res = JSON.parse(db_res || "{}");
  if (!parsed_res?.todos) {
    return [];
  }
  return parsed_res.todos;
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
CLEAR_DB();
create("Primeira TODO");
create("Segunda TODO");
console.log(read());
