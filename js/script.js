function generateLorem(n = 1) {
    let result = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    for (let index = 0; index < n; index++) {
        result = result + " " + result;
    }
    return result;
}

document.getElementById("text").innerHTML = generateLorem();
document.getElementById("rules").innerHTML = generateLorem();
document.getElementById("lexicon").innerHTML = generateLorem(3);

