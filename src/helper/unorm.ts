import unorm from "unorm";

const specialCharactersRegex = /[^\u0000-\u007F]/g;
const invalidCharactersRegex = /[`@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;

export function removeAccents(inputString: string) {
  return unorm.nfd(inputString).replace(/[\u0300-\u036f]/g, "");
}

export function containsSpecialCharacters(inputString: string) {
  const normalizedStr = removeAccents(inputString);
  return (
    specialCharactersRegex.test(normalizedStr) ||
    invalidCharactersRegex.test(normalizedStr)
  );
}

export function getSpecialCharacters(inputString: string) {
  const normalizedStr = removeAccents(inputString);

  const matches = new Set([
    ...(normalizedStr.match(specialCharactersRegex) || []),
    ...(normalizedStr.match(invalidCharactersRegex) || []),
  ]);

  return "[" + Array.from(matches).join("], [") + "]";
}
