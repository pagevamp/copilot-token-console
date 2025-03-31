export function camelCaseToWords(camelCaseStr: string): string {
  // Split the camelCase word using regex to match uppercase letters
  const words = camelCaseStr.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

  // Capitalize the first letter of each word and return the result
  return words.charAt(0).toUpperCase() + words.slice(1);
}
