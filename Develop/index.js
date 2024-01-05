// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const jest = require('jest');
const fs = require('fs');


const {Circle, Square, Triangle} = require("./lib/shapes");
// Defines a Svg class that has a constructor with three methods for rendering and setting the text and shape elements in the SVG string.
class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
   
}
// Defines array of 'questions' using the 'inquirer' library with the following questions.
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to (3) Characters:",
        validate: function (answer) {
            if (answer.length >= 4) {
                return console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
            }else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color keyword (OR a hexadecimal number):",
    },
    {
        type: "list",
        name: "pixel-shape",
        message: "Choose which Pixel Shape you would like?",
        choices: ["Circle", "Square", "Triangle"],
        validate: function (answer) {
            let user_shape;
	        if (user_shape_type === "Square" || user_shape_type === "square") {
		    user_shape = new Square();
		    console.log("User selected Square shape");
	        }   
	        else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		    user_shape = new Circle();
		    console.log("User selected Circle shape");
	        }
	        else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		    user_shape = new Triangle();
		    console.log("User selected Triangle shape");
	        }
	        else{
		    console.log("Invalid shape!");
	        }
          return true
        }
    },
    {
        type: "input",
        name: "shape-color",
        message: "SHAPE COLOR: Enter a color keyword (OR a hexadecimal number):",
        validate: function (answer) {
            if (answer.length < 1) {
                return console.log("A valid shape color is required.")
            }else{
                return true
            }
        }
    },
  
];

// TODO: Create a function to write data to file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
      if (err) {
        return console.log(err);
      }
      console.log("Congratulations, you have generated a logo.svg!")
        });
    }
// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt(questions)
    .then((answers) => {
        var svgString = "";
        var svg_file = "logo.svg";
    //user text
    user_text = answers["text"]

    //user font color
	user_font_color = answers["text-color"];

    //user shape type
	user_shape_type = answers["pixel-shape"];

    //user shape color
    user_shape_color = answers["shape-color"];

	// Create a new Svg instance and add the shape and text elements to it
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape_type);
	svgString = svg.render();
	
	//Print shape to log
	console.log("Displaying shape:\n\n" + svgString);
	//document.getElementById("svg_image").innerHTML = svgString;

	console.log("Shape generation complete!");
	console.log("Writing shape to file...");
	writeToFile(svg_file, svgString); 
}
)}  
  // Function call to initialize app
  init();
