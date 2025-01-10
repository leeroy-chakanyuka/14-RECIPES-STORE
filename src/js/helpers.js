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
    const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);

    const data = await response.json();
    if (!response.ok) {
      throw new Error('We could not find this recipe, please try another one!');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
