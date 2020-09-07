function convert(text) {
  if (typeof text === "string") {
    let arr = [];
    for (let i = 0; i < text.length; i++) {
      arr[i] = text.charCodeAt(i) - 65;
    }
    return arr;
  } else if (typeof text === "object") {
    let str = "";
    for (i of text) {
      str += String.fromCharCode(i + 65);
    }
    return str;
  }
}

function vigenereCipher(text, key) {
  // Drop all except letters
  let clearText = text.toUpperCase().replace(/[^A-Z]/gi, "");
  let clearKey = key.toUpperCase().replace(/[^A-Z]/gi, "");
  let codeLen = clearText.length;

  // Make coding string from key
  let encodingString = clearKey.repeat(((codeLen / clearKey.length) >> 0) + 1);
  encodingString = encodingString.slice(0, codeLen);

  // Convert text to array
  let textCodes = convert(clearText);
  let keyCodes = convert(encodingString);

  // Make cypher array
  let cipherCodes = [];
  for (let i = 0; i < codeLen; i++) {
    cipherCodes[i] = (textCodes[i] + keyCodes[i]) % 26;
  }

  // Return encoded string
  return {
    key: clearKey,
    message: clearText,
    encoded_message: convert(cipherCodes)
  }
}

function vigenereDecipher(cipher, key) {
  // Drop all except letters
  let clearCipher = cipher.toUpperCase().replace(/[^A-Z]/gi, "");
  let clearKey = key.toUpperCase().replace(/[^A-Z]/gi, "");
  let codeLen = clearCipher.length;

  // Make coding string from key
  let decodingString = clearKey.repeat(((codeLen / clearKey.length) >> 0) + 1);
  decodingString = decodingString.slice(0, codeLen);

  // Convert text to array
  let cipherCodes = convert(clearCipher);
  let keyCodes = convert(decodingString);

  // Make cypher array
  let textCodes = [];
  for (let i = 0; i < codeLen; i++) {
    textCodes[i] = (cipherCodes[i] - keyCodes[i] + 26) % 26;
  }

  // Return encoded string
  return {
    key: clearKey,
    message: convert(textCodes),
    encoded_message: clearCipher
  }
}