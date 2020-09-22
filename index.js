console.log('Skill progress tracker ahoy!!');

window.onload = () => {

    // BASIC VARIABLES
    const skillSets = [];
    const skills = [];
    const typesOfFlowers = ["sunflower"];

    const inventory = {
        purse: 150,
        flowerSeeds: [],
        backgroundSkins: [],
    };

    const shop = {
        itemsAvailable: [],
    };

    // CLASSES
    class SkillSet {
        constructor(skillSetName, nameOfSkillOne) {
            this.setName = skillSetName;
            this.skills = [nameOfSkillOne];
        }
    }

    class Flower {
        constructor() {
            this.stage = 1;
            this.sellValue = 0;
            this.buyValue = 0;
            this.flowerDiv;
        }

        createFlowerEl() {
            let flowerEl = document.createElement("div");
            flowerEl.setAttribute("class", "flower");
            return flowerEl;
        }

        grow() {
            this.stage ++;
        }

        sell() {
            // remove flower element from pot & flower array

            // add this.sellValue to inventory.purse
        }

        plantIn(parentId, flowerName) {
            let flower = this.createFlowerEl();
            this.flowerDiv = flower;
            flower.setAttribute("name", flowerName);
            let parent = document.getElementById(parentId);
            let image = document.createElement("img");

            console.log("parent: ", parent, "image: ", image, "stage: ", this.stage);

            if(this.stage === 1) {
                image.setAttribute("src", this.stage1ImgSrc);
            } else if (this.stage === 2) {
                image.setAttribute("src", this.stage2ImgSrc);
            } else {
                image.setAttribute("src", this.stage3ImgSrc);
            }
            console.log("image new: ", image);
            flower.append(image);
            parent.append(flower);
        }
    }

    class Sunflower extends Flower {
        constructor() {
            super();
            this.name = "sunflower";
            this.stage1ImgSrc = "img/plant-yellow-stage1.png";
            this.stage2ImgSrc = "img/plant-yellow-stage2.png";
            this.stage3ImgSrc = "img/plant-yellow-stage3.png";
        }
    }




    // fLOWERS, SEEDS ETC => TBD
    


    // TOGGLING WHETHER AN ELEMENT IS HIDDEN OR NOT

    // function that toggles whether an element is hidden
    function hideElement(elementID) {
        let element = document.getElementById(elementID);
        element.classList.toggle("hidden");
    }

    // click event for making shop element appear/disappear

    let shopButton = document.getElementById("shop-button");
    shopButton.addEventListener('click', () => {
        hideElement("shop");
    });

    // click event for making inventory element appear/disappear

    let inventoryButton = document.getElementById("inventory-button");
    inventoryButton.addEventListener('click', () => {
        hideElement("inventory");
    });


    // SKILLS ETC

    let taskList = document.getElementById("task-list");
    let confirmButton = document.getElementById("confirm-new-skill-input");
    console.log('list: ', taskList, 'button: ', confirmButton);

    // function that creates new skill
    function addNewSkillToSkillset(nameOfNewSkill) {
        skills.push(nameOfNewSkill);

        let skillElDiv = document.createElement("li");
        skillElDiv.setAttribute("class", "skill-name");
        skillElDiv.setAttribute("name", nameOfNewSkill);
        skillElDiv.append(nameOfNewSkill);
        return skillElDiv;
    }
    
    // function that creates new skillset and first skill if skillset does not exist
    function createSkillsetElement(skillSetName, nameOfSkillOne) {
        
        // create new skillset object and skillset element
        let skillSet = new SkillSet(skillSetName, nameOfSkillOne);
            //push to skillSets array
        skillSets.push(skillSet);
        let skillSetEl = document.createElement("ul");
        skillSetEl.setAttribute("name", skillSetName);
        skillSetEl.setAttribute("class", "skillset-list");
        
        //create new skill element using new skill function
        let skillEl = addNewSkillToSkillset(nameOfSkillOne);
        
        //create skillset header
        let header = document.createElement("h4");
        header.setAttribute("class", "header");
        header.append(skillSetName);

        //create checkbox
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");

        //create outer div for skill
        let skillBox = document.createElement("div");
        skillBox.setAttribute("class", "skill-box");
    

        //append all elements
        skillSetEl.appendChild(header);
        skillSetEl.appendChild(skillBox);
        skillBox.appendChild(checkbox);
        skillBox.appendChild(skillEl);
        
        taskList.appendChild(skillSetEl);

        return skillSet;
    };
    
    // the complete addSkill function:
    
    function addSkill(skillSetName, skillName) {
        let skillSetIsNew = true;
        let skillsetObject;

        //check if skillset already exists
        for(let element of skillSets) {
            console.log(element.setName);
            if (element.setName === skillSetName) {
                skillSetIsNew = false
                skillsetObject = element;
                console.log('element: ', skillsetObject);
            };
        }

        //if skillset exists, add new skill to existing skillset
        if (!skillSetIsNew) {
            console.log('This skillset already exists');
            skillsetObject.skills.push(skillName);

            let skillset = document.getElementsByName(skillSetName)[0];
            console.log('skill set: ', skillset);

            //create new skill element using new skill functions
            let skillEl = addNewSkillToSkillset(skillName);

            //create outer div for skill
            let skillBox = document.createElement("div");
            skillBox.setAttribute("class", "skill-box");

            //create checkbox
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");

            //append all elements
            skillset.appendChild(skillBox);
            skillBox.appendChild(checkbox);
            skillBox.appendChild(skillEl);
        
            taskList.appendChild(skillset);
        }

        //if skillset doesn't exist, create new skillset & add skill
        else if (skillSetIsNew) {
            console.log('new skillset!');
            skillsetObject = createSkillsetElement(skillSetName, skillName);
        }

        return skillsetObject;
    };

    // on click of confirm button, create a new skillset(if it doesn't exist already) 
    // and a new skill are created

    confirmButton.addEventListener("click", () => {
        let skillSetName = document.getElementById("skill-group-input").value;
        let skillName = document.getElementById("skill-name-input").value;

        addSkill(skillSetName, skillName);
    });
        
        
    // Example setup for code chrysalis precourse and bootcamp skills:
    let javascriptTest1 = addSkill("JavaScript Skills", "Recursion");
    let javascriptTest2 = addSkill("JavaScript Skills", "Closures");
    let javascriptTest3 = addSkill("JavaScript Skills", "Higher Order Functions");
    let javascriptTest4 = addSkill("JavaScript Skills", "Functional vs. Object-oriented");
    let javascriptTest5 = addSkill("JavaScript Skills", "Prototype chain & classes");
    let javascriptTest6 = addSkill("JavaScript Skills", "Promises & Async/Await");
    let javascriptTest7 = addSkill("JavaScript Skills", "DOM Manipulation");

    let frameworksTest1 = addSkill("Frameworks and Libraries", "Basic React.js");
    let frameworksTest2 = addSkill("Frameworks and Libraries", "Basic Vue.js");
    let frameworksTest3 = addSkill("Frameworks and Libraries", "Basic Angular.js");
    let frameworksTest4 = addSkill("Frameworks and Libraries", "Lodash & Underscore");

    let testingTest1 = addSkill("Testing and Debugging", "Test-driven development");
    let testingTest2 = addSkill("Testing and Debugging", "Testing with Jasmine");
    let testingTest3 = addSkill("Testing and Debugging", "Testing with Chai");
    let testingTest4 = addSkill("Testing and Debugging", "Debugging in Chrome");
    let testingTest5 = addSkill("Testing and Debugging", "Performance check with Lighthouse");

    let cssTest1 = addSkill("CSS Skills", "Flexbox");
    let cssTest2 = addSkill("CSS Skills", "CSS grid");
    let cssTest3 = addSkill("CSS Skills", "Animations & Transitions");
    let cssTest4 = addSkill("CSS Skills", "@mediaqueries");
    
    let generalTest1 = addSkill("General skills", "Data Structures");
    let generalTest2 = addSkill("General skills", "Working with Node.js");
    let generalTest3 = addSkill("General skills", "Working with GitHub");
    let generalTest4 = addSkill("General skills", "Using Webpack");
    let generalTest5 = addSkill("General skills", "Bootstrap");
    let generalTest6 = addSkill("General skills", "CI/CD & Framework Architecture");
    let generalTest7 = addSkill("General skills", "Product Management for Engineers");

    let backendTest1 = addSkill("Backend skills", "Express");
    let backendTest2 = addSkill("Backend skills", "REST APIs");
    let backendTest3 = addSkill("Backend skills", "GraphQL");
    let backendTest4 = addSkill("Backend skills", "SQL Databases & Schema Creation");
  
    let languagesTest1 = addSkill("Other Languages", "Python basics");
    let languagesTest2 = addSkill("Other Languages", "Kotlin basics");
    let languagesTest3 = addSkill("Other Languages", "Java basics");
    let languagesTest4 = addSkill("Other Languages", "PHP basics");

    let interviewskillsTest1 = addSkill("Job search skills", "Basic algorithm questions");
    let interviewskillsTest2 = addSkill("Job search skills", "Updated resume");
    let interviewskillsTest3 = addSkill("Job search skills", "Portfolio polishing");
    let interviewskillsTest4 = addSkill("Job search skills", "Job research & application");
    let interviewskillsTest5 = addSkill("Job search skills", "Interview preparation");
    let interviewskillsTest6 = addSkill("Job search skills", "Professional self-introduction");
    
    
    // TESTING for flowers!!!!!
    let sunflower = new Sunflower();
    console.log(sunflower);
    sunflower.plantIn("plant-2", "sunflower");


};




















// code used for plantyourcode!!
function grid(seeds, rows, cols) {
    let grid = [];
    let seedsUsed = 0;
    
    //no. of rows: no. of array elements of grid
    //no. of columns: no. elements in each sub-array
    
    for(let i=0; i<rows && seedsUsed < seeds.length; i++) {
            grid[i] = [];
        for(let v=0; v<cols && seedsUsed < seeds.length; v++) {
            grid[i].push(seeds[seedsUsed]);
            seedsUsed++;
        }
    }
    
    return grid;
}