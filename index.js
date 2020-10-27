console.log('Skill progress tracker ahoy!!');

window.onload = () => {

    // BASIC VARIABLES
    const skillSets = [];
    const skills = [];
    const skillsLearned = [];
    const typesOfFlowers = ["sunflower", "violet", "daisy"];

    const inventory = {
        purse: 150,
        flowerSeeds: [],
        backgroundSkins: [],
    };

    const shop = {
        stock: ["sunflower", "daisy", "violet"]
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

        buy() {
            // add flower to inventory

            // reduce amount of money in purse
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
            this.buyValue = 20;
            this.sellValue =  50;
        }
    }

    class Violet extends Flower {
        constructor() {
            super();
            this.name = "violet";
            this.stage1ImgSrc = "img\violet-stage1.png"
            this.stage2ImgSrc = "img\violet-stage2.png"
            this.stage3ImgSrc = "img\violet-stage3.png"
            this.buyValue = 50;
            this.sellValue =  150;
        }
    }

    class Daisy extends Flower {
        constructor() {
            super();
            this.name = "daisy";
            this.stage1ImgSrc = "img\daisy-stage1.png"
            this.stage2ImgSrc = "img\daisy-stage2.png"
            this.stage3ImgSrc = "img\daisy-stage3.png"
            this.buyValue = 30;
            this.sellValue =  70;
        }
    }




    // fLOWERS, SEEDS ETC => TBD
    
    // BUY: buying flower seeds when shop is open
    // event listener:



    // SELL: selling stage 3 flowers by clicking on them
    // event listener:



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
        checkbox.setAttribute("class", "unchecked");
        checkbox.onclick = function() {
            skillWasLearned(checkbox, nameOfSkillOne);
        };

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
            checkbox.setAttribute("class", "unchecked");
            console.log("the following checkbox was created: ", checkbox);
            checkbox.onclick = function() {
                skillWasLearned(checkbox, skillName);
            };

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

    // click event for checkbox: 
    function skillWasLearned(checkboxEl, skillName) {
        console.log("checkbox checked and onclick activated! class: ", checkboxEl.getAttribute("class"));
        let progressBar = document.getElementById("myprogressBar");
            
        // 1. if clicked for the first time:
        if(checkboxEl.getAttribute("class") === "unchecked") {
            // if checked for the first time, add "learned" and "checked" class to checkbox element
            checkboxEl.setAttribute("class", "learned checked");
            // add skill to skills learned
            skillsLearned.push(skillName);
            // reward: create flower seed in user inventory!
            // TODO: flower seed element
            // update progress bar
            let progress = skillsLearned.length/skills.length;
            let progressPercentage = (progress*100).toString() + "%";
            progressBar.style.setProperty("width", progressPercentage); 
            console.log('progressbar updated to : ', progressPercentage);
            
            
        // 2. if clicked when skill is already learned once and checkbox checked: 
        // remove skill from progressbar, uncheck and return
        } else if(checkboxEl.getAttribute("class") === "learned checked") {
            console.log('was unchecked!!!!!');
            let index = skillsLearned.indexOf(skillName);
            console.log('index: ', index, 'skill name: ', skillName, 'at index: ', skillsLearned[index]);
            skillsLearned.splice(index, 1);
            let progress = skillsLearned.length/skills.length;
            let progressPercentage = (progress*100).toString() + "%";
            progressBar.style.setProperty("width", progressPercentage);
            checkboxEl.setAttribute("class", "learned unchecked"); 
            console.log("skill unchecked! and removed from skilllist");
            return;
        // 3. if clicked when skill is already learned once and checkbox unchecked: 
        // add skill to progressbar, check and return
        } else if(checkboxEl.getAttribute("class") === "learned unchecked") {
            skillsLearned.push(skillName);
            let progress = skillsLearned.length/skills.length;
            let progressPercentage = (progress*100).toString() + "%";
            progressBar.style.setProperty("width", progressPercentage); 
            checkboxEl.setAttribute("class", "learned checked");
            return;
        } else {
            console.log('Something is wrong here...');
        }
        
    };
        
        
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
    
    let generalTest1 = addSkill("General Skills", "Data Structures");
    let generalTest2 = addSkill("General Skills", "Working with Node.js");
    let generalTest3 = addSkill("General Skills", "Working with GitHub");
    let generalTest4 = addSkill("General Skills", "Using Webpack");
    let generalTest5 = addSkill("General Skills", "Bootstrap");
    let generalTest6 = addSkill("General Skills", "CI/CD & Framework Architecture");
    let generalTest7 = addSkill("General Skills", "Product Management for Engineers");

    let backendTest1 = addSkill("Backend Skills", "Express");
    let backendTest2 = addSkill("Backend Skills", "REST APIs");
    let backendTest3 = addSkill("Backend Skills", "GraphQL");
    let backendTest4 = addSkill("Backend Skills", "SQL Databases & Schema Creation");
  
    let languagesTest1 = addSkill("Other Languages", "Python basics");
    let languagesTest2 = addSkill("Other Languages", "Kotlin basics");
    let languagesTest3 = addSkill("Other Languages", "Java basics");
    let languagesTest4 = addSkill("Other Languages", "PHP basics");

    let interviewskillsTest1 = addSkill("Job search Skills", "Basic algorithm questions");
    let interviewskillsTest2 = addSkill("Job search Skills", "Updated resume");
    let interviewskillsTest3 = addSkill("Job search Skills", "Portfolio polishing");
    let interviewskillsTest4 = addSkill("Job search Skills", "Job research & application");
    let interviewskillsTest5 = addSkill("Job search Skills", "Interview preparation");
    let interviewskillsTest6 = addSkill("Job search Skills", "Professional self-introduction");
    
    // TESTING for skills!!!!!
    console.log("Skillsets updated: ", skillSets, "Skills updated: ", skills);
    
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