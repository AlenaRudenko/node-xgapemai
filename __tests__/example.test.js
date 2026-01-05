import { strict as assert } from 'node:assert';
try {
  assert.strictEqual(true, true, "true должно быть true");
  console.log("Test approved")
} catch(error) {
  console.error("Test failed",error);
  process.exit(1);
}
console.log('Все тесты завершены.');