"use strict"

// Listeners
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
    // Doesn't work
    blockquote.focus();
});

// Functions
function remove(what, group, id) {
    // Better to render only specific group
    if(what == "lexicon") {
        lexicon[group].splice(id, 1);
        render(lexicon);
    } else {
        rules[group].splice(id, 1);
        render(rules);
    }
}
function push() {
    alert('push')
}
function render(object) {
    let objectName = object == lexicon ? "lexicon" : "rules";

    document.getElementById(objectName + '-list').innerHTML = "";
    
    Object.keys(object).forEach(function(key) {
        let container = document.createElement("div");
        // add indication for renderGroup

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
        button.innerHTML = "Append";
        button.id = objectName + "-" + key + "-button";
        button.onclick = function() {
            alert('Yo ho ho!');
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
            x.href = "javascript:remove('" + objectName + "', '" + key + "', '" + index + "')";
            x.innerHTML = "<sup>×</sup> "; // Here is whitespace now
            container.appendChild(x);
        });
        
        //container.innerHTML += "<br /><br />";
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));

	    document.getElementById(objectName + '-list').appendChild(container);
    });
}

// Init
render(lexicon);
render(rules);

