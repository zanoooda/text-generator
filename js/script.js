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

        // container.addEventListener("click", function() {
        //     alert(objectName + ", " + key);
        // });
        container.onclick = function() {
            alert(objectName + ", " + key);
        }

        container.id = objectName + "-" + key + "-container";

        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = key;
        input.id = objectName + "-" + key + "-input";

        container.appendChild(input);

        container.innerHTML += " ";

        // let button = document.createElement("input");
        // button.type = "button";
        // button.value = "Append";
        // button.id = objectName + "-" + key + "-button";

        let button = document.createElement("button");
        //button.type = "button";
        //button.type = ""
        button.innerHTML = "Append";
        button.id = objectName + "-" + key + "-button";

        //button.onclick = "push()"; // Doesn't work
        //button.addEventListener("click", push, false);
        // button.addEventListener("click", function() {
        //     alert('yo yo Yooo');
        // });
        // button.onclick = function() {
        //     alert('Yo ho ho!');
        // }
        button.onmouseout = function() {
            alert('onmouseout');
        }
        

        container.appendChild(button);

        container.innerHTML += "<br />";

        object[key].forEach((element, index)=> {
            let span = document.createElement("span");
            span.contentEditable = "true";
            span.innerHTML = element;

            // span.onclick = function() {
            //     alert('io')
            // }
            span.addEventListener("click", function() {
                alert('ioio')
            });

            container.appendChild(span);
            
            let x = document.createElement("a");
            x.className = "x";
            x.href = "javascript:remove('" + objectName + "', '" + key + "', '" + index + "')";
            x.innerHTML = "<sup>×</sup>";
            container.appendChild(x);
            
            container.innerHTML += " ";
        });
        
        container.innerHTML += "<br /><br />";

	    document.getElementById(objectName + '-list').appendChild(container);
    });
}

// Init
render(lexicon);
render(rules);

// let collection = document.getElementsByTagName("button");
// for (let index = 0; index < collection.length; index++) {
//     let element = collection[index];
//     element.addEventListener("click", function() {
//         alert("Noo");
//     });
// }

let button = document.createElement("button");
button.innerHTML = "button";
button.onclick = function() {
    alert("button");
}
document.getElementsByTagName("body")[0].appendChild(button);
