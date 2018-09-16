"use strict"

let rules = {
    "S": [
        "NP VP",
        "NP VP",
        "NP VP",
        "Adj N V Adv or|and|so V Adv"
    ],
    "NP": [
        "N",
        "Adj N",
    ],
    "VP": [
        "V",
        "V Adv"
    ]
};
let lexicon = {
    "N": [
        "time",
        "people",
        "year",
        "way",
        "day",
        "thing",
        "man",
        "world",
        "life",
        "ocean",
        "part",
        "child",
        "tree",
        "woman",
        "place",
        "case",
        "point",
        "love",
        "happines",
        "group",
        "fact",

        // comment

        "sex",
        "drugs",
        "Rock-n-Roll",

        // comment

        "galaxy",
        "universe",

        // 
        "professor",
        "guard",
        "book",
        "process",
        "object",
        "robot",
    ],
    "Prep": [
        "I",
        "he",
        "she",
        "it",
        "we",
        "you",
        "they"
    ],
    "V": [
        "have",
        "say",
        "get",
        "make",
        "go",
        "know",
        "take",
        "see",
        "come",
        "think",
        "look",
        "want",
        "give",
        "use",
        "find",
        "tell",
        "ask",
        "feel",
        "try",
        "leave",
        "switch",
    ],
    "Adv": [
        "nice",
        "good",
        "fast",
        "just",
        "more",
        "well",
        "always",

        // comment
        "across",
        "against"
    ],
    "Adj": [
        "good",
        "new",
        "first",
        "last",
        "long",
        "great",
        "little",
        "own",
        "other",
        "old",
        "right",
        "big",
        "high",
        "different",
        "small",
        "large",
        "next",
        "early",
        "young",
        "important",
        "few",
        "public",
        "bad",
        "same",
        "able"
    ],
    "Art": [
        "a",
        "an",
        "the"
    ],
    "Pre": [
        "as",
        "but",
        "for",
        "from",
        "like",
        "than",
        "to",
        "with"

        //"across" ?
    ],
    "Conj": [
        "and",
        "but",
        "or",
        "so"
    ]
};
let punctuation = ".,?!:;()";
let exceptedPunctuation = "(";

Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
}

class Sentence {
    constructor(structure = "S") {
        this.structure = structure;
        this.prepareElements();
        this.substitude();
    }
    prepareElements() {
        this.elements = this.str2Arr(this.structure);
        while (!this.isReady()) {
            let elements = new Array();
            this.elements.forEach(element => {
                if(element.key.split('|').length > 1) {
                   this.str2Arr(element.key.split('|').getRandom()).forEach(element => {
                       elements.push(element);
                   });
                } else if(rules[element.key]) {
                    this.str2Arr(rules[element.key].getRandom()).forEach(element => {
                        elements.push(element);
                    });
                } else {
                    elements.push(element);
                }
            });
            this.elements = elements;
        }
    }
    str2Arr(structure) {
        structure = structure.trim().replace(/\s+/g, ' ');
        let elements = new Array();
        structure.split(' ').forEach(key => {
            let element = new Object();
            if(rules[key] || lexicon[key]) {
                element.key = key;
                elements.push(element);
            } else {
                for (let index = 0; index < key.length; index++) {
                    let char = key[index];
                    if(punctuation.includes(char)) {
                        if(element.key) {
                            elements.push(element);
                            element = new Object();
                        }
                        element.key = char;
                        elements.push(element);
                        element = new Object();
                    } else {
                        if(element.key)
                            element.key += char;
                        else
                            element.key = char;
                        if(index == key.length - 1)
                            elements.push(element);
                    }
                }
            }
        });
        return elements;
    }
    isReady() {
        let condition = true;
        for (let index = 0; index < this.elements.length; index++) {
            let element = this.elements[index];
            if(rules[element.key] || element.key.split('|').length > 1) {
                condition = false;
                break;
            }
        }
        return condition;
    }
    substitude() {
        this.elements.forEach(element => {
            if(lexicon[element.key]) {
                if(element.key == "V") {
                    // substitudeVerb
                    // May be to make tence per sentence and not per verb
                    element.value = lexicon[element.key].getRandom();
                    element.time =  ["past", "present", "future"].getRandom();
                    element.aspect = ["perfect", "perfect progressive", "progressive", "simple"].getRandom();
                    switch (element.time) {
                        case "past":
                            switch (element.aspect) {
                                case "perfect":
                                    element.value = "had " + element.value + "ed";
                                    break;
                                case "perfect progressive":
                                    element.value = "had been " + element.value + "ing";
                                    break;
                                case "progressive":
                                    element.value = "was " + element.value + "ing";
                                    break;
                                case "simple":
                                    element.value = element.value + "ed";
                                    break;
                            }
                            break;
                        case "present":
                            switch (element.aspect) {
                                case "perfect":
                                    element.value = "had " + element.value + "ed";
                                    break;
                                case "perfect progressive":
                                    element.value = "have been " + element.value + "ing";
                                    break;
                                case "progressive":
                                    element.value = "is " + element.value + "ing";
                                    break;
                                case "simple":
                                    break;
                            }
                            break;
                        case "future":
                            switch (element.aspect) {
                                case "perfect":
                                    element.value = "will have " + element.value + "ing";
                                    break;
                                case "perfect progressive":
                                    element.value = "will have been " + element.value + "ing";
                                    break;
                                case "progressive":
                                    element.value = "will be " + element.value + "ing";
                                    break;
                                case "simple":
                                    element.value = "will " + element.value;
                                    break;
                            }
                            break;
                    }
                } else
                    element.value = lexicon[element.key].getRandom();
            }
            else
                element.value = element.key;
        });
    }
    toString() {
        // joinElements
        let string = new String();
        for (let index = 0; index < this.elements.length; index++) {
            let element = this.elements[index];
            let secondElement = index + 1 <= this.elements.length - 1 ? this.elements[index + 1] : false;
            if(
                !secondElement ||
                exceptedPunctuation.includes(element.value) ||
                (
                    secondElement && 
                    secondElement.value.length == 1 && 
                    punctuation.includes(secondElement.value) && 
                    !exceptedPunctuation.includes(secondElement.value)
                )
            )
                string = string.concat(element.value);
            else
                string = string.concat(element.value, " ");
        }
        // beautify
        if(string[string.length - 1] !== '.')
            string = string.concat(".")
        string = string.charAt(0).toUpperCase() + string.substr(1);
        return string;
    }
}