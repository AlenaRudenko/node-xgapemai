const user = {
  name: "Alice",
  age: 25,
  city: "Minsk",
  profile: {
    weight: 70,
    height: 160,
  },
};
/** задачи на деструктуризацию **/

//извлечь свойство
const { name, age } = user;
console.log("descruct", name, age);
const { name: fName, age: fAge } = user;
console.log("descruct rename", fName, fAge);
// nested width
const {
  profile: { weight },
} = user;
console.log("nested weight", weight);

/** создание свойства **/

user["fname"] = "Pitt";
user.fullName = "Alice Pitt";

/** удаление свойства и получение нового объекта но с ссылкой на внутренние свойства ссылочного типа **/

delete user.fname;
const { fullName, ...newUser } = user;
console.log("newUser", newUser);

/** прямая мутация **/

user.age = 26;
user["age"] = 27;

/** изменение имени свойства **/
const { name: userName } = user;
console.log("userName", userName);

/** проверка наличия свойства **/

console.log("key in object", "fullName" in user);
console.log("hasOwnProperty", user.hasOwnProperty("fullName"));
console.log("hasOwn", Object.hasOwn(user, "fullName"));
/** поверхностное копирование **/

const simpleObject = {
  value: 1,
};
const newestSimpleObject = {
  ...simpleObject,
};

console.log("check simple copy", simpleObject === newestSimpleObject);

/** глубокое копирование **/

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  const cloned = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
};

/** ключи, значения, пары ключ-значения и обратно **/

console.log("Object keys", Object.keys(user));

console.log("Object values", Object.values(user));

const entries = Object.entries(user);
console.log("Object entries", entries);

const restored = Object.fromEntries(entries);
console.log("Restored object", restored);

/** иммутабельная копия **/

const imutableUser = {
  ...user,
  profile: {
    ...user.profile,
    height: 176,
  },
};
console.log("user", user, "imutableUser", imutableUser);

/** DESCRIPTORS **/

const config = {
  apiUrl: "url",
  timeout: 30,
  debug: false,
};

Object.defineProperty(config, "debug", {
  value: true,
  writable: true,
  enumerable: true,
});

//поменяв writable:false = будет ошибка чтения
config.debug = "bug edit";
console.log("safety field", config);
