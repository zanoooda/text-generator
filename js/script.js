"use strict"

// Listeners
document.getElementById("rules-create-group-button").addEventListener("click", function() {
    rules[document.getElementById("rules-create-group-input").value] = new Array();
    render(rules);
});
document.getElementById("lexicon-create-group-button").addEventListener("click", function() {
    lexicon[document.getElementById("lexicon-create-group-input").value] = new Array();
    render(lexicon);
});
document.getElementById("generate-text-button").addEventListener("click", function(){
    let blockquote = document.getElementById("blockquote");
    let quantity = document.getElementById("sentences-quantity").value;

    if(quantity) {
        let text = new String();
        for (let index = 0; index < quantity; index++) {
            text += " " + new Sentence();
        }
        blockquote.innerHTML = text;
    } else {
        blockquote.innerHTML = new Sentence();
    }

    blockquote.style.display = "block";
    blockquote.focus(); // Doesn't work
});

// Functions
function add(object, key, element) {
    object[key].push(element);
    render(object); // Better to render only specific group or here just add another element
}
function remove(object, key, id) {
    object[key].splice(id, 1);
    render(object); // Better to render only specific group
}
function render(object) {
    let objectName = object == lexicon ? "lexicon" : "rules";
    // Clean container
    document.getElementById(objectName + '-list').innerHTML = "";
    
    Object.keys(object).forEach(function(key) {
        let container = document.createElement("div");
        container.id = objectName + "-" + key + "-container";

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = key;
        input.id = objectName + "-" + key + "-input";

        container.appendChild(input);

        // find better solution
        let whitespace = document.createElement("span");
        whitespace.innerHTML = " ";
        container.appendChild(whitespace);

        let button = document.createElement("button");
        button.innerHTML = "Push";
        button.id = objectName + "-" + key + "-button";
        button.onclick = function() {
            add(object, key, document.getElementById(objectName + "-" + key + "-input").value);
        }
        
        container.appendChild(button);

        //container.innerHTML += "<br />";
        container.appendChild(document.createElement("br"));

        object[key].forEach((element, index)=> {
            let span = document.createElement("span");
            span.contentEditable = "true";
            span.innerHTML = element;

            container.appendChild(span);
            
            let x = document.createElement("a");
            x.className = "x";
            x.href = "javascript:remove(" + objectName + ", '" + key + "', '" + index + "')";
            x.innerHTML = "<sup>×</sup> "; // Here is whitespace now
            container.appendChild(x);
        });

	    document.getElementById(objectName + '-list').appendChild(container);
    });
}

// Init
render(lexicon);
render(rules);

