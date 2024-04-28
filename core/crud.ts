import fs from "fs"; // ES6
import { v4 as uuid } from "uuid";
// const fs = require("fs"); -- CommonJS

const DB_FILE_PATH = "./core/db";

console.log("[CRUD]");

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
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
  return todo;
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

function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
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
  if (!updatedTodo) {
    throw new Error("Please, provide another ID");
  }
  return updatedTodo;
}

function updateContentById(id: string, content: string): Todo {
  return update(id, { content });
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// [SIMULATION]
CLEAR_DB();
create("Primeira TODO");
create("Segunda TODO");
const thirdTodo = create("TODO 3");
update(thirdTodo.id, {
  content: "Terceira TODO atualizada",
  done: true,
});
updateContentById(thirdTodo.id, "Terceira TODO + atualizada");
console.log(read());
