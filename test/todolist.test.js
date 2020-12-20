const { test, expect } = require('@jest/globals');
const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  })

  test('toArray method returns an array of todos', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  })

  test('toArray method returns a copy of the array of todos', () => {
    expect(list.toArray()).not.toBe(list.todos);
  })

  test('first method returns the first todo', () => {
    expect(list.first()).toBe(todo1);
  })

  test('last method returns the last todo', () => {
    expect(list.last()).toBe(todo3);
  })

  test('shift method removes the first item in the list', () => {
    list.shift()
    expect(list.toArray()).toEqual([todo2, todo3]);
  })

  test('shift method returns the first item in the list', () => {
    expect(list.shift()).toBe(todo1);
  })

  test('pop method removes the last item in the array', () => {
    list.pop()
    expect(list.toArray()).toEqual([todo1, todo2]);
  })

  test('pop method returns the last item in the array', () => {
    expect(list.pop()).toBe(todo3);
  })

  test('isDone method returns true when all items in the list are done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  })

  test('isDone method returns false when at least one item in the list is not done', () => {
    expect(list.isDone()).toBe(false);
  })

  test('TypeError occurs in attempt to add an item to the list that is not a Todo object', () => {
    let todo = {
      title: 'Study', 
      done: false,
    }
    expect(() => list.add(todo)).toThrow(TypeError);
    expect(() => list.add('todo')).toThrow(TypeError);
  })

  test('itemAt method will throw a ReferenceError occurs if index is invalid', () => {
    expect(list.itemAt(0)).toEqual(todo1);
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  })

  test('markDoneAt method will throw a ReferenceError if index is invalid', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
  })

  test('markUndoneAt method will throw a ReferenceError if index is invalid', () => {
    list.markAllDone();
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(() => list.markUndoneAt(10).toThrow(ReferenceError));
  })

  test('markAllDone method will mark all methods as done', () => {
    list.markAllDone();
    list.forEach(todo => {
      expect(todo.isDone()).toBe(true);
    })
  })

  test('removeAt method will throw a ReferenceError if the index is invalid', () => {
    list.removeAt(2);
    expect(list.toArray()).toEqual([todo1, todo2]);
    expect(() => list.removeAt(10)).toThrow(ReferenceError);
  })

  test('toString returns string form of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  })

  test('toString returns checked items in string form of the list', () => {
    list.markDoneAt(0);

    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  })

  test('toString returns all checked items in string form of the list', () => {
    list.markAllDone();

    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);

  })

  test('forEach iterates over the elements in the list', () => {
    list.forEach(todo => todo.markDone());

    expect(list.isDone()).toBe(true);
  })

  test('filter returns a new TodoList object', () => {
    let newList = list.filter(todo => todo.getTitle()[0] === 'B');
    list.removeAt(1);
    list.removeAt(1);

    expect(newList.title).toBe(list.title);
    expect(newList).toEqual(list);

  })

});