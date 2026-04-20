//Fonction slugify
const slugify = (title) => {
    const slug = title.toString().toLowerCase()
        .replace(/\s+/g, '-')          
        .replace(/[^a-z0-9-]/g, '')     
        .replace(/--+/g, '-')            
        .replace(/^-+|-+$/g, '');  
    return slug;      
};

//Fonction truncate
const truncate = (text, length) => {
    if (text.length <= length) {
        return text;
    }
    return text.slice(0, length) + '...';
};

//Fonction countWords
const countWords = (text) => {
    let counter = 0;
    const words=text.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words[i].trim() !== "") {
            counter++;
        }
    }
    return counter;
};


//Fonction escapeHTML
const escapeHTML = (text) => {
   const letters = text.split("");
   let escapedText = "";
   for (let i = 0; i < letters.length; i++) {
       switch (letters[i]) {
           case '&':
               escapedText += '&amp;';
               break;
           case '<':
               escapedText += '&lt;';
               break;
           case '>':
               escapedText += '&gt;';
               break;
           case '"':
               escapedText += '&quot;';
               break;
           case "'":
               escapedText += '&#39;';
               break;
           default:
               escapedText += letters[i];
       }
   }
   return escapedText;
};

export { slugify, truncate, countWords, escapeHTML };