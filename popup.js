document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const encodingType = document.getElementById("encodingType");
    const encodeButton = document.getElementById("encodeButton");
    const decodeButton = document.getElementById("decodeButton");
    const copyOutput = document.getElementById("copyOutput");

    function encode(text, type) {
        try {
            switch (type) {
                case "url":
                    return encodeURIComponent(text);
                case "base64":
                    return btoa(unescape(encodeURIComponent(text)));
                case "html":
                    return text.replace(/[\u00A0-\u9999<>&]/gim, c => `&#${c.charCodeAt(0)};`);
                case "unicode":
                    return text.split('').map(c =>
                        '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')
                    ).join('');
                case "hex":
                    return text.split('').map(c =>
                        c.charCodeAt(0).toString(16).padStart(2, '0')
                    ).join('');
                case "rot13":
                    return text.replace(/[a-zA-Z]/g, c => {
                        const base = c <= 'Z' ? 65 : 97;
                        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
                    });
                default:
                    return "Encoding not supported.";
            }
        } catch (e) {
            return "Encoding error.";
        }
    }

    function decode(text, type) {
        try {
            switch (type) {
                case "url":
                    return decodeURIComponent(text);
                case "base64":
                    return decodeURIComponent(escape(atob(text)));
                case "html":
                    return text.replace(/&#(\d+);/g, (_, code) =>
                        String.fromCharCode(code)
                    );
                case "unicode":
                    return text.replace(/\\u([\dA-Fa-f]{4})/g, (_, code) =>
                        String.fromCharCode(parseInt(code, 16))
                    );
                case "hex":
                    return text.match(/.{1,2}/g).map(byte =>
                        String.fromCharCode(parseInt(byte, 16))
                    ).join('');
                case "rot13":
                    return text.replace(/[a-zA-Z]/g, c => {
                        const base = c <= 'Z' ? 65 : 97;
                        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
                    });
                default:
                    return "Decoding not supported.";
            }
        } catch (e) {
            return "Decoding error.";
        }
    }

    encodeButton.addEventListener("click", () => {
        const result = encode(inputText.value, encodingType.value);
        outputText.value = result;
    });

    decodeButton.addEventListener("click", () => {
        const result = decode(inputText.value, encodingType.value);
        outputText.value = result;
    });

    copyOutput.addEventListener("click", () => {
        navigator.clipboard.writeText(outputText.value).catch(err => {
            console.error("Copy failed:", err);
        });
    });
});
