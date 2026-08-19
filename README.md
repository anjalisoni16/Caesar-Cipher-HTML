# CaesarLab — Interactive Caesar Cipher Security Lab

A professional, browser-based learning project that implements the Caesar Cipher and demonstrates why classical substitution ciphers are insecure.

## Features

- Encrypt messages with a configurable Caesar shift
- Decrypt messages with the same interface
- Live character counting
- Copy, paste, clear and input/output swap controls
- Animated, responsive security-focused interface
- Brute-force simulation across all 26 possible keys
- Local-only processing in the browser

## Security Concepts Demonstrated

### Encryption
For an alphabetic character, the cipher shifts its position by the selected key.

### Decryption
The same transformation is applied in the opposite direction.

### Brute Force
Caesar Cipher has only 26 possible shifts, so an attacker can test every key quickly.

## Run Locally

No backend is required.

1. Download or clone the repository.
2. Open `index.html` in a browser.

For a development server, VS Code Live Server can be used.

## Project Structure

```text
caesar-cipher-pro/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Security & Privacy

All transformations run locally in the browser. This project does not send messages to a server or external API.

This is an educational cryptography project and should not be used to protect sensitive information.

## Future Improvements

- Add frequency-analysis visualization
- Add Vigenère Cipher comparison
- Add animated alphabet wheel
- Add test cases and automated validation
- Add a cryptography concepts glossary
