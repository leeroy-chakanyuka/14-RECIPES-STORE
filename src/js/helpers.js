import { TIMEOUT } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url) {
  try {
    console.log(TIMEOUT);
    const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);
    console.log(response);
    const data = await response.json();
    if (!response.ok) {
      alert(
        `please try a new ID, this one does not exist! Code : ${response.status}`
      );
      throw new Error('This ID does not exist!');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
