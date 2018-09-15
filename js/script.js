"use strict"

// Listeners
document.getElementById("generate-text-button").addEventListener("click", function(){
    document.getElementById("blockquote").style.display = "inline-block";

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

// Init
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
	
	lexicon[key].forEach(word => {
		let span = document.createElement("span");
		
		span.contentEditable = "true";
		
		span.innerHTML = word;
		container.appendChild(span);
		
		let d = document.createElement("a");
		d.className = "x"
		d.href = "javascript:close()";
		d.innerHTML = "<sup>×</sup>";
        container.appendChild(d);
        
		container.innerHTML += " ";
	});
	
	container.appendChild(document.createElement("br"));
	container.appendChild(document.createElement("br"));

	document.getElementById('lexicon').appendChild(container);
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
	
	rules[definition].forEach(rule => {
		let span = document.createElement("span");
		span.contentEditable = "true";
		span.innerHTML = rule;
		span.className = "rule";
		container.appendChild(span);
		
		let d = document.createElement("a");
		d.className = "x"
		d.href = "javascript:close()";
		d.innerHTML = "<sup>×</sup>";
		container.appendChild(d);
		
		container.innerHTML += " ";
	});
	
	container.appendChild(document.createElement("br"));
	container.appendChild(document.createElement("br"));
	
	document.getElementById('rules').appendChild(container);
});

function close() {
	alert('yo')
}   
