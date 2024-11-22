document.addEventListener("DOMContentLoaded", () => {
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const encodingType = document.getElementById("encodingType");
    const encodeButton = document.getElementById("encodeButton");
    const decodeButton = document.getElementById("decodeButton");

    function encode(text, type) {
        switch (type) {
            case "url": return encodeURIComponent(text);
            case "base64": return btoa(text);
            case "html": return text.replace(/[\u00A0-\u9999<>&]/gim, c => `&#${c.charCodeAt(0)};`);
            case "unicode": return text.split('').map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');
            case "hex": return text.split('').map(c => c.charCodeAt(0).toString(16)).join('');
            case "rot13": return text.replace(/[a-zA-Z]/g, c => String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26));
            default: return "Encoding not supported yet!";
        }
    }

    function decode(text, type) {
        switch (type) {
            case "url": return decodeURIComponent(text);
            case "base64": return atob(text);
            case "html": return text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code));
            case "unicode": return text.replace(/\\u[\dA-F]{4}/gi, c => String.fromCharCode(parseInt(c.replace(/\\u/g, ''), 16)));
            default: return "Decoding not supported yet!";
        }
    }

    encodeButton.addEventListener("click", () => {
        outputText.value = encode(inputText.value, encodingType.value);
    });

    decodeButton.addEventListener("click", () => {
        outputText.value = decode(inputText.value, encodingType.value);
    });
});
