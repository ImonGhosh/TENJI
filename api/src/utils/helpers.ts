// Utility function to normalize the case number format
export const normalizeCaseNumber = (caseNumber: string): string => {
  // Regular expression to detect if "BVerfGE" is present at the end or beginning
  if (/^\D+\d+,\d+$/.test(caseNumber)) {
    return caseNumber; // Return as is if already formatted
  }

  // Attempt to extract components and normalize
  const match = caseNumber.match(
    /\b(?:BVerfGE\s*(\d+)\s*,?\s*(\d+)|(\d+)\s*,?\s*(\d+)\s*BVerfGE)\b/i,
  );
  if (match) {
    const [, num1After, num2After, num1Before, num2Before] = match;
    const number1 = num1After || num1Before;
    const number2 = num2After || num2Before;
    return `BVerfGE${number1},${number2}`;
  }
  console.log(`case number: ${caseNumber}`);

  // If no match, return the input unchanged
  return caseNumber;
};

const isLongestTerm = (term: string) => term.split(/\s+/).length > 4;

export const getSearchTerms = (searchTerm: string) => {
  const regex =
    /BVerfGE\s?\d+(,?\s?\d+)?|Art\.?\s?\d+(?:\s?[IVXLCDM]+)?\s?(GG|Grundgesetz)?/i;
  const germanArticles = [
    'der',
    'die',
    'das',
    'den',
    'dem',
    'des',
    'ein',
    'eine',
    'einen',
    'einem',
    'eines',
    'bei',
    'und',
    'auf',
  ]; // Add more as needed
  const match = searchTerm.match(regex);

  let originalRomanArt = null; // To capture the original "Art. <number> V GG"
  const originalInput = searchTerm.trim(); // Store the original input as is

  if (match && !isLongestTerm(originalInput)) {
    const mainPart = match[0].replace(/\s+/g, ' ').trim(); // Normalize spaces in the matched part

    let variations: string[] = [];
    if (/^BVerfGE/i.test(mainPart)) {
      // Handle BVerfGE variations
      const caseParts = mainPart.split(/\s+/); // Split by spaces
      const caseNumber = caseParts[1]; // First number
      const additionalNumber = caseParts[2] || ''; // Second number, if present

      variations = [
        `${caseParts[0]} ${caseNumber} ${additionalNumber}`.trim(), // "BVerfGE 18 85"
        `${caseParts[0]}${caseNumber}, ${additionalNumber}`.trim(), // "BVerfGE18, 85"
        `${caseParts[0]} ${caseNumber}, ${additionalNumber}`.trim(), // "BVerfGE 18, 85"
      ];
    } else if (/^Art/i.test(mainPart)) {
      // Normalize "Art." to ensure consistent formatting
      const normalizedMainPart = mainPart
        .replace(/^Art\.?\s?/, 'Art. ') // Normalize to "Art."
        .trim();

      const artParts = normalizedMainPart.split(/\s+/); // Split by spaces
      const articleNumber = artParts[1]; // Article number
      const legalCode = artParts[artParts.length - 1]; // "GG" or "Grundgesetz"

      // Reconstruct without the Roman numeral (if present)
      variations = [`Art. ${articleNumber} ${legalCode}`.trim()];

      // Preserve the original "Art. 3 V GG" for later
      if (normalizedMainPart.match(/\s[IVXLCDM]+\sGG/i)) {
        originalRomanArt = normalizedMainPart;
      }
    }

    // Remove the matched part from the searchTerm
    const remainingPart = searchTerm.replace(match[0], '').trim();
    const remainingWords = remainingPart
      ? remainingPart
          .split(/\s+/)
          .filter((word) => !germanArticles.includes(word.toLowerCase())) // Remove German articles
      : []; // Split remaining words by spaces and exclude German articles

    // Combine results
    const result = [...variations];

    // Append original input
    result.push(originalInput);

    // Append original Roman numeral form if present
    if (originalRomanArt) {
      result.push(originalRomanArt);
    }

    // Append remaining tokens
    return [...result, ...remainingWords];
  }

  // Fallback: if no pattern is found, split the entire search term
  return [
    originalInput,
    // ...searchTerm
    //   .split(/\s+/)
    //   .filter((word) => !germanArticles.includes(word.toLowerCase())),
  ];
};
