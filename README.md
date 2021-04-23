
Deploy occurs automatically on commit into master

Create todo list and use received token for authorization header

1 account = 1 todo list

Token expires in 4h, so u can create the new one using `GetAuthToken()`

## Queries

```graphql
mutation CreateTodoList($email: String, $password: String) {
  createTodoList(email: $email, password: $password)
}

mutation GetAuthToken($email: String, $password: String) {
  getAuthToken(email: $email, password: $password)
}

query GetTodoList {
  todos {
    id, title, marked, created_at, updated_at
  }
}

query GetTodo($id: ID!) {
  todo(id: $id) {
    id, marked, title, created_at, updated_at
  }
}

mutation AddTodo($title: String) {
  addTodo(title: $title) {
    id, marked, title, created_at, updated_at
  }
}

mutation ToggleTodoStatus($id: ID!) {
  toggleTodoStatus(id: $id) {
    id, marked, title, created_at, updated_at
  }
}

mutation RemoveTodo($id: ID!) {
  removeTodo(id: $id) {
    id, marked, title, created_at, updated_at
  }
}
```
