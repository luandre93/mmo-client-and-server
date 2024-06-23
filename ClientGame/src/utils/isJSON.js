export function isJSON(str) {
  try {
    const parsedObj = JSON.parse(str);
    return typeof parsedObj === "object";
  } catch (error) {
    console.log(error);
    return false;
  }
}
