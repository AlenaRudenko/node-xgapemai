import { deepClone } from "./object-practice.js";
import cloneDeep from "lodash";

const users = [
  {
    id: 1,
    active: true,
    name: "Филипп",
    age: 25,
    workflow: ["java", "ruby"],
  },
  {
    id: 2,,
    active: false,
    name: "Лариса",
    age: 20,
    workflow: ["react", "nextjs", "ruby"],
  },
  {
    id: 3,
    active: true,
    name: "Кирилл",
    age: 10,
    workflow: ["react", "ruby"],
  },
];

/**задачи на деструктуризацию **/
const [firstUser, , thirdUser] = users;
console.log("destruct users", firstUser, thirdUser);
// nested
const [{ name }] = users;
console.log("nested first", name);
//rest
const [firstElement, ...rest] = users;
console.log("firstElement", firstElement, "other", rest);

/** SPLICE **/

const students = ["Anna", "Lisa", "Pit", "Lola"];
//push
students.splice(0, 0, "Igor");
//revert
students.splice(2, 1, "Kate");
//delete
students.splice(3);
students.splice(2, 1);
console.log("spliced students", students);

/** SLICE **/

const employees = ["Anna", "Lisa", "Pit", "Lola"];

const newGroup = employees.slice(1);
console.log("grouped", newGroup, "Employees", employees);

/** CONCAT **/

const newConcatedUsers = new Array().concat(employees, students);
console.log("newConcatedUsers", newConcatedUsers);

/** FOREACH **/

//пасевдо мап
const numbers = [1, 2, 3, 4, 5, 6];
numbers.forEach((item, i) => (numbers[i] = item * 2));
console.log("fake map", numbers);

/** FIND **/

const larisaUser = users.find((user) => user.name === "Лариса");
console.log("larisaUser", larisaUser);

/** REVERSE **/

const revertedUsers = users.reverse();
console.log("revertedUsers", revertedUsers);

/** FILTER **/

//только совершеннолетние
const adults = users.filter((user) => user.age >= 18).map((user) => user.name);
console.log("Взрослые", ...adults);

//только активные пользователи
const activeUsers = users.filter((u) => !!u.active);
console.log("activeUsers", activeUsers);

/** MAP **/

//массив имен
const nameUsers = users.map((u) => u.name);
console.log("nameUsers", nameUsers);

/** REDUCE **/

//самый взрослый
const oldestUser = activeUsers.reduce(
  (oldest, user) => (oldest.age < user.age ? user : oldest),
  activeUsers[0] || null
);
console.log("oldestUser", oldestUser);

//отсортированный объект до и старше 30
const groupedUsers = users.reduce((acc, user) => {
  const key = user.age < 30 ? "<30" : ">=30";
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(user);
  return acc;
}, {});
console.log("groupedUsers", groupedUsers);

//статистика по юзерам
const stats = users.reduce(
  (acc, user, i) => {
    acc.total++;
    acc.averageAge += user.age;
    acc.oldest = acc.oldest.age < user.age ? user : acc.oldest;
    acc.youngest = acc.youngest.age > user.age ? user : acc.youngest;

    return acc;
  },
  {
    total: 0,
    averageAge: 0,
    oldest: {
      age: -Infinity,
    },
    youngest: {
      age: Infinity,
    },
  }
);
console.log("stats", stats);

/** SOME **/

//есть ли старше 30
const isAdult = users.some((u) => u.age > 30);
console.log("isAdult", isAdult);

/** EVERY **/

//каждый владеет ruby
const isEveryRuby = users.every((user) => user.workflow.includes("ruby"));
console.log("isEveryRuby", isEveryRuby);

/** NEW SET + SORT **/

//только уникальный массив workflow + ACD
const uniqueSortTags = [
  ...new Set(users.flatMap((user) => user.workflow).sort((a, b) => a.localeCompare(b))),
];
console.log("uniqueSortTags", uniqueSortTags);

//тоже самое но редьюс
const reduceTags = users.reduce((acc, user) => {
  for (const tag of user.workflow) {
    if (!acc.includes(tag)) {
      acc.push(tag);
    }
  }
  return acc;
}, []);
console.log("reduceTags", reduceTags);

const products = [
  {
    name: "Laptop",
    category: "Electronics",
    price: 1000,
  },
  {
    name: "Phone",
    category: "Electronics",
    price: 500,
  },
  {
    name: "Chair",
    category: "Furniture",
    price: 150,
  },
];

//гриппировка по категориям
const groupOfCategories = products.reduce((acc, product) => {
  (acc[product.category] = acc[product.category] || []).push(product);
  return acc;
}, {});

console.log("groupOfCategories", groupOfCategories);

//поиск одинаковых примитивов в двух массивах
const intersection = (arr1, arr2) => {
  return [...new Set(arr1.filter((item) => arr2.includes(item)))];
};

console.log("intersection", intersection([1, 2, 3], [2, 3, 4]));

/** FLAT **/

//убрать 1 вложенность
const nested = [
  "первый уровень",
  "первый уровень",
  ["второй уровень", "второй уровень", ["третий уровень", "третий уровень"]],
];
const oneLevelFlattedArray = nested.flat();
const flattedArray = nested.flat(Infinity);

console.log("oneLevelFlattedArray", oneLevelFlattedArray, "flattedArray", flattedArray);

//работа глубокого копирования
const original = {
  a: 1,
  b: {
    c: 2,
    d: [
      3,
      {
        e: 4,
      },
    ],
  },
};

const copy = deepClone(original);
const lodashCopy = cloneDeep(original);
copy.b.d[1].e = 222;

console.log("Глубокое копирование", original);
console.log("Глубокое копирование lodash", lodashCopy.value());
