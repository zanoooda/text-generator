"use strict"

// Listeners
document.getElementById("generate-text-button").addEventListener("click", function(){
    document.getElementById("blockquote").style.display = "block";

    let quantity = document.getElementById("sentences-quantity").value;
    if(quantity) {
        let text = new String();
        for (let index = 0; index < quantity; index++) {
            text += " " + new Sentence();
        }
        document.getElementById("blockquote").innerHTML = text;
    } else {
        document.getElementById("blockquote").innerHTML = new Sentence();
    }
});

// Functions
function remove(id) {
    alert(id);

    let one = new String();
    let two = new String();
    let three = new String();

    id.split("-").forEach((part, index) => {
        if(index == 0) {
            one = part;
        } else if(index == 1) {
            two = part;
        } else if(index == 2) {
            three = part;
        }
    });

    if(one == "l") {
        lexicon[two] = lexicon[two].splice(three, 1);
    } else if (one == "r") {
        rules[two] = rules[two].splice(three, 1);
    }
    redraw();
} 

// Init

function redraw() {
    document.getElementById('rules-list').innerHTML = "";
    document.getElementById('lexicon-list').innerHTML = "";

    Object.keys(lexicon).forEach(function(key) {
        let container = document.createElement("div");
        
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = key;
        container.appendChild(input);
        
        container.innerHTML += " ";
        
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Append";
        container.appendChild(button);
        
        container.appendChild(document.createElement("br"));
        
        lexicon[key].forEach((word, index)=> {
            let span = document.createElement("span");
            
            span.contentEditable = "true";
            
            span.innerHTML = word;
            container.appendChild(span);
            
            let d = document.createElement("a");
            d.className = "x"
            d.href = "javascript:remove(" + "\"l-" + key + "-" + index + "\")";
            d.innerHTML = "<sup>×</sup>";
            container.appendChild(d);
            
            container.innerHTML += " ";
        });
        
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));

        document.getElementById('lexicon-list').appendChild(container);
    });

    Object.keys(rules).forEach(function(definition) {
        let container = document.createElement("div");
        
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = definition;
        container.appendChild(input);
        
        container.innerHTML += " ";
        
        let button = document.createElement("input");
        button.type = "button";
        button.value = "Add";
        container.appendChild(button);
        
        container.appendChild(document.createElement("br"));
        
        rules[definition].forEach((rule, index) => {
            let span = document.createElement("span");
            span.contentEditable = "true";
            span.innerHTML = rule;
            container.appendChild(span);
            
            let d = document.createElement("a");
            d.className = "x"
            d.href = "javascript:remove(" + "\"r-" + definition + "-" + index + "\")";
            d.innerHTML = "<sup>×</sup>";
            container.appendChild(d);
            
            container.innerHTML += " ";
        });
        
        container.appendChild(document.createElement("br"));
        container.appendChild(document.createElement("br"));
        
        document.getElementById('rules-list').appendChild(container);
    });  

}

redraw()
