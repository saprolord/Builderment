function factorycalc(reverse) {

  'This is the main function to call out to create the recipe tree as selected in the "desired material" field at the rate defined in "desired rate"'
  'This body sets up all the first level recipes as a MatDef class (see constructor further down)'
  'MatDef class format: (name, factory:[Factory ID, production rate],recipe:[material1,material2,...],quantity: [material1 requirement, material2 requirement, ...], material ID)'
  'FactoryIDs: Extractor=0, Workshop=1, Furnace=2, Machine Shop=3, Industrial=4, Forge=5, Manufacturer=6, Earth Teleporter=7, Uranium Extractor=8, Coal Power Plant = 9, Nuclear Power Plant =10'
  'Why is this not working?'
  
  const wood_log = new MatDef("Wood Log", [0, 7.5], 0, [1], 0);
  const copper = new MatDef("Copper", [0, 7.5], 0, [1], 1);
  const iron = new MatDef("Iron", [0, 7.5], 0, [1], 2);
  const stone = new MatDef("Stone", [0, 7.5], 0, [1], 3);
  const wolfram = new MatDef("Wolframite", [0, 7.5], 0, [1], 4);
  const coal = new MatDef("Coal", [0, 7.5], 0, [1], 5);
  const wood_plank = new MatDef("Wood Plank", [1, 15], [wood_log], [1], 6);
  const wood_frame = new MatDef("Wood Frame", [1, 7.5], [wood_plank], [4], 7);
  const copper_ingot = new MatDef("Copper Ingot", [2, 30], [copper], [1], 8);
  const copper_wire = new MatDef("Copper Wire", [1, 30], [copper_ingot], [1.5], 9);
  const iron_ingot = new MatDef("Iron Ingot", [2, 30], [iron], [1], 10);
  const iron_gear = new MatDef("Iron Gear", [1, 15], [iron_ingot], [2], 11);
  const sand = new MatDef("Sand", [1, 40], [stone], [1], 12);
  const silicon = new MatDef("Silicon", [2, 20], [sand], [2], 13);
  const glass = new MatDef("Glass", [2, 10], [sand], [4], 14);
  const tungsten = new MatDef("Tungsten Ore", [2, 24], [wolfram], [5], 15);
  const graphite = new MatDef("Graphite", [5, 15], [coal, wood_log], [3, 3], 16);
  const carbide = new MatDef("Tungsten Carbide", [5, 12], [tungsten, graphite], [2, 1], 17);
  const coupler = new MatDef("Coupler", [1, 6], [carbide], [1], 18);
  const lens = new MatDef("Condenser Lens", [1, 20], [glass], [3], 19);
  const heat_sink = new MatDef("Heat Sink", [1, 10], [copper_ingot], [5], 20);
  const iron_plate = new MatDef("Iron Plating", [1, 20], [iron_ingot], [2], 21);
  const emagnet = new MatDef("Electromagnet", [3, 7.5], [iron_ingot, copper_wire], [2, 6], 22);
  const metal_frame = new MatDef("Metal Frame", [3, 5], [wood_frame, iron_plate], [1, 4], 23);
  const steel = new MatDef("Steel", [5, 7.5], [graphite, iron], [1, 6], 24);
  const steel_rod = new MatDef("Steel Rod", [1, 15], [steel], [3], 25);
  const rotor = new MatDef("Rotor", [3, 10], [steel_rod, iron_plate], [1, 2], 26);
  const concrete = new MatDef("Concrete", [5, 7.5], [sand, steel_rod], [10, 1], 27);
  const battery = new MatDef("Battery", [3, 2.5], [emagnet, graphite], [8, 8], 28);
  const motor = new MatDef("Electric Motor", [4, 3], [battery, iron_gear, rotor], [1, 4, 2], 29);
  const circuit = new MatDef("Logic Circuit", [3, 10], [copper_wire, silicon], [3, 2], 30);
  const carbfibre = new MatDef("Carbon Fibre", [1, 7.5], [graphite], [4], 31);
  const nanowire = new MatDef("Nano Wire", [3, 5], [carbfibre, glass], [2, 4], 32);
  const computer = new MatDef("Computer", [4, 7.5], [heat_sink, metal_frame, circuit], [3, 1, 3], 33);
  const ind_frame = new MatDef("Industrial Frame", [4, 3], [concrete, metal_frame, carbide], [6, 2, 8], 34);
  const gyroscope = new MatDef("Gyroscope", [3, 5], [copper_wire, rotor], [12, 2], 35);
  const stabilizer = new MatDef("Stabilizer", [4, 2.5], [computer, motor, gyroscope], [1, 1, 2], 36);
  const mag_field = new MatDef("Mag. Field Generator", [6, 1.5], [stabilizer, ind_frame, emagnet, nanowire], [1, 1, 10, 10], 37);
  const quantum = new MatDef("Quantum Entangler", [3, 1], [mag_field, stabilizer], [1, 2], 38);
  const microscope = new MatDef("Electron Microscope", [6, 2.5], [nanowire, emagnet, lens, metal_frame], [2, 8, 4, 2], 39);
  const turbocharg = new MatDef("Turbocharger", [6, 4], [iron_gear, circuit, nanowire, coupler], [8, 4, 2, 4], 40);
  const supercomp = new MatDef("Super Computer", [6, 2], [computer, heat_sink, turbocharg, coupler], [2, 8, 1, 8], 41);
  const atomic = new MatDef("Atomic Locator", [6, 2], [supercomp, microscope, concrete, copper_wire], [2, 2, 24, 50], 42);
  const energy_cube = new MatDef("Energy Cube", [3, 2], [battery, ind_frame], [2, 1], 43);
  const tank = new MatDef("Tank", [4, 6], [glass, concrete, carbide], [2, 4, 4], 44);
  const compressor = new MatDef("Matter Compressor", [6, 2], [ind_frame, turbocharg, motor, tank], [1, 2, 2, 1], 45);
  const particle = new MatDef("Particle Glue", [1, 20], [compressor], [0.1], 46);
  const duplicator = new MatDef("Matter Duplicator", [6, 2 / 3], [atomic, quantum, energy_cube, particle], [4, 2, 5, 100], 47);
  const earth_token = new MatDef("Earth Token", [7, 60 / 42], [duplicator], [1], 48);
  const uranium = new MatDef("Uranium Ore", [8, 20/3], 0, [1], 49);
  const enriched_ur = new MatDef("Enriched Uranium",[2,1],[uranium],[30],50)
  const empty_fuel = new MatDef("Empty Fuel Cell",[3,4],[carbide,glass],[3,5],51)
  const nuclear_fuel = new MatDef("Nuclear Fuel Cell",[4,2],[empty_fuel,steel_rod,enriched_ur],[1,1,1],52)


'________________________'
'GLOBAL VARIABLES'
'Material data matrix'
  materialdata = [wood_log, copper, iron, stone, wolfram, coal, wood_plank, wood_frame, copper_ingot, copper_wire, iron_ingot, iron_gear, sand, silicon, glass, tungsten, graphite, carbide, coupler, lens, heat_sink, iron_plate, emagnet, metal_frame, steel, steel_rod, rotor, concrete, battery, motor, circuit, carbfibre, nanowire, computer, ind_frame, gyroscope, stabilizer, mag_field, quantum, microscope, turbocharg, supercomp, atomic, energy_cube, tank, compressor, particle, duplicator, earth_token,uranium,enriched_ur,empty_fuel,nuclear_fuel];
'Total required for each material array initialisation'
  materialtotal = [0];
  materialtotal.length = materialdata.length;
  zero(materialtotal);
'_________________________'
'END OF GLOBAL VARIABLE'

'Get user input'
  var index = document.getElementById('material').value;
  var rate = document.getElementById('rate').value;

'Get Level of factories'
  var levelA = document.getElementById('extractor').value;
  var levelB = document.getElementById('workshop').value;
  var levelC = document.getElementById('furnace').value;
  var levelD = document.getElementById('machine').value;
  var levelE = document.getElementById('industrial').value;
  var levelF = document.getElementById('forge').value;
  var levelG = document.getElementById('manufacturer').value;
  var levelH = document.getElementById('teleporter').value;
'make an array with all the factory levels selected'
  var levelFactory = [levelA, levelB, levelC, levelD, levelE, levelF, levelG, levelH,1,1,1];
'array of the effective boost for each level (1 to 5)'
  var boostFactory = [1, 1.5, 2, 3, 4];

  'If reverse calc is required'
  if (reverse==true){
    rate=1;
  }

'Assign new rates in relation to the "tier" or "Level" assigned to each factories'
  for (i = 0; i < materialdata.length; i++) {
    materialdata[i].factory[1] = materialdata[i].factory[1] * boostFactory  [levelFactory[materialdata[i].factory[0]]];
  }

'Get the main div element where the tree will appear and clear it'
  var treeBox = document.getElementById('TreeTop');
  erase('TreeTop');
'Create the first "treeBox" div element'
  createTreeLevel('TreeTop','tree10000');

'Launch main function to calculate the required materials'
  calculate(materialdata[index], rate,'tree10000',10000);

'If reverse calc required, recalculate the output based on the limiting extractors'
  if (reverse==true){
 
    var extractorQty = [document.getElementById('wood_extractor_qty').value,
    document.getElementById('copper_extractor_qty').value,
    document.getElementById('iron_extractor_qty').value,
    document.getElementById('stone_extractor_qty').value,
    document.getElementById('wolf_extractor_qty').value,
    document.getElementById('coal_extractor_qty').value];

    'create an array of the ratio that could be produced based on each resource available (set Infinity if resource is not required)'
    var extractor_ratio=[0,0,0,0,0,0];
    for (var i = 0; i < (extractor_ratio.length); i++) {
      if (materialtotal[i]==0){
        extractor_ratio[i]=Infinity;
      } else{
        extractor_ratio[i] = (extractorQty[i] * materialdata[i].factory[1]) / materialtotal[i];
      }
    }
    'find the limiting resource rate'
    rate = Math.min.apply(null, extractor_ratio)
    'set the new rate on the lmiting resource'
    document.getElementById('rate').value = rate;

    'display the restricting resource'
    'find the restricting resource'
    var j = 0;
    for (var i = 1; i < extractor_ratio.length; i++) {
      if (extractor_ratio[i] < extractor_ratio[j]) { j = i }
    
    }

    document.getElementById("limit_resource").style.display="flex";
    document.getElementById("limit_resource").innerHTML=("You are limited by the amount of " + materialdata[j].name + " extractors");


    'recalculate with the new rate'
    factorycalc(false);

  }
  
  else{
  'if reverse calc not required, display the result'  
  'update and show the div element with the required material'
    materialOutput();
    document.getElementById("TreeTop").style.display = "flex";
    document.getElementById("box3").style.display = "flex";

  'create the tier buttons'
    createTierButton();

  'adjust the div boxes if the screen is narrow'
    if (window.matchMedia("(max-width: 800px)").matches) {
      "document.getElementById('box3').scrollIntoView()"
    }
    'END'
  }
}

function zero(material) {
  'Set an array to have all value as zero'
  for (var i = 0; i < (material.length); i++) {
    material[i] = 0;
  }
}

function reversefactorycalc(){
  //Function to calculate how much of the desired material can be produced
  //based on the number of extractors entered
  
  var extractorQty = [document.getElementById('wood_extractor_qty').value,
  document.getElementById('copper_extractor_qty').value,
  document.getElementById('iron_extractor_qty').value,
  document.getElementById('stone_extractor_qty').value,
  document.getElementById('wolf_extractor_qty').value,
  document.getElementById('coal_extractor_qty').value];

  var extractor_ratio = [extractorQty[0] / materialtotal[0],
  extractorQty[1] / materialtotal[1],
  extractorQty[2] / materialtotal[2],
  extractorQty[3] / materialtotal[3],
  extractorQty[4] / materialtotal[4],
  extractorQty[5] / materialtotal[5]];

  'set the new rate on the lmiting resource'
  var rate = Math.min.apply(null, extractor_ratio);

  document.getElementById('rate').value=rate;


  'display the restricting resource'
  'finc the restricting resource'
  var j = 0;
  for (var i = 1; i++; i < length(extractor_ratio)) {
    if (extractor_ratio[i] < extractor_ratio[i - 1]) { j = i }
  }

  alert("You are limited by the amount of " && materialdata[j].name && " extractors");

  'recalculate'
  factorycalc(false);

  
}

function calculate(material, rate,divParentId,boxId) {
  var divParent = document.getElementById(divParentId);
  var matChildren=document.createElement('div');
  var treeLevel=document.createElement('div');
  var branchBox=document.createElement('div');
  var matBox=document.createElement('div');
  var tempParentId=0

  if (material.recipe == 0) {
    //raw material with no recipe 
    createMatDetail(material.name, rate, factoryname(material.factory[0]), Math.ceil((rate / material.factory[1])*100)/100,divParentId,'matDet'+boxId,material.ID)
    //add the material to the total required
    materialtotal[material.ID] = materialtotal[material.ID] + rate;
  } else {
    //create a Material box with the material detail
    createMatBox(material.name, rate, factoryname(material.factory[0]), Math.ceil(rate / material.factory[1]), divParentId, 'matBox' + boxId, material.ID)
    //add the material to the total required
    materialtotal[material.ID] = materialtotal[material.ID] + rate;
    //store the current Id and create a MatChildren box to contain the material(s) required in the recipe
    createMatChildren(divParentId,'child'+boxId);
    tempParentId = boxId;
    boxId=boxId+10000;
    if (material.recipe.length == 1) {
      // there is only one material required
      boxId=boxId+1
      createTreeLevel('child' + tempParentId, 'tree' + boxId);
      createBranchStraight('tree' + boxId);
      boxId=calculate(material.recipe[0], material.quantity[0] * rate, 'tree' + boxId,boxId);
    } else {
        // there is more than one material required
        for (var i = 0; i < material.recipe.length; i++) {
          boxId=boxId+1
          createTreeLevel('child' + tempParentId, 'tree' + boxId);
          if (i == 0) {
            //it is the first item in the recipe - create a branch going down'
            createBranchDown('tree' + boxId); 
          } else {
            if(i<material.recipe.length-1){
              //it is neither the first or last item in the recipe - create a fork')              
              createBranchFork('tree' + boxId);
            } else{
              //it is the last item in the recipe - create a branch end
              createBranchEnd('tree' + boxId);
            }
          }
          boxId=calculate(material.recipe[i], material.quantity[i] * rate, 'tree' + boxId, boxId);  
        }
      }
    boxId = boxId - 10000;
    }
    return boxId;
}

function createTreeLevel(divParentId, boxId) {
  //create a TreeLevel div with the id 'boxId' and append it to divParentId
  var treeLevel = document.createElement('div');
  var divParent = document.getElementById(divParentId);
  treeLevel.setAttribute('class', 'treeLevel');
  treeLevel.id = boxId;
  divParent.appendChild(treeLevel);
}

function factoryname(id) {
  'Retrun the string of the name of the factory associated with the index "id" '
  'FactoryIDs: Extractor=0, Workshop=1, Furnace=2, Machine Shop=3, Industrial=4, Forge=5, Manufacturer=6, Earth Teleporter=7, Uranium Extractor=8, Coal Power Plant = 9, Nuclear Power Plant =10'
  if (id == 0) { return "Extractor" };
  if (id == 1) { return "Workshop" };
  if (id == 2) { return "Furnace" };
  if (id == 3) { return "Machine Shop" };
  if (id == 4) { return "Industrial Factory" };
  if (id == 5) { return "Forge" };
  if (id == 6) { return "Manufacturer" };
  if (id == 7) { return "Earth Teleporter" };
  if (id == 8) { return "Uranium Extractor" };
  if (id == 9) { return "Coal Power Plant" };
  if (id == 10) { return "Nuclear Power Plant" };
}

function erase(divId) {
  // Clear the div space (divId space as input)
  document.getElementById(divId).innerHTML="";
}

function materialOutput() {

  var total = "";
  var matId = "";

  for (var i = 0; i < materialtotal.length; i++) {
    total = materialtotal[i]
    if (i < 10) {
      matId = ("mat0" + i);
      document.getElementById(matId).innerHTML = Math.round(total * 1000) / 1000;
      if (document.getElementById(matId).innerHTML==0){
        document.getElementById("matDiv0" + i).style.display= "none";
      } else{
        document.getElementById("matDiv0" + i).style.display = "flex";
      }
    } else {
      matId = ("mat" + i);
      document.getElementById(matId).innerHTML = Math.round(total * 1000) / 1000;
      if (document.getElementById(matId).innerHTML == 0) {
        document.getElementById("matDiv" + i).style.display = "none";
      } else {
        document.getElementById("matDiv" + i).style.display = "flex";
      }
    }
  }
}

class MatDef {
  'MatDef class is the definition of the material recipes as:'
  'name: name of the material as string'
  'factory: [factory name required, maximum rate of production]'
  'recipe: [list of material required]'
  'quantity: [list of quantity required for each material in the order defined in [recipe]]'
  constructor(nameStr, factoryArr, recipeArr, quantityArr, matId) {
    this.name = nameStr;
    this.factory = factoryArr;
    this.recipe = recipeArr;
    this.quantity = quantityArr;
    this.ID = matId;
  }
}

function createBranchStraight(divParentId){
  //create a simple horizontal branch "-"
  //appends to divParentId
  var branchBox = document.createElement('div');
  var branchSimple= document.createElement('div');
  var parentDiv =document.getElementById(divParentId);

  branchBox.setAttribute('class','branchBox');
  branchSimple.setAttribute('class','branchSimple');

  branchBox.appendChild(branchSimple);
  parentDiv.appendChild(branchBox);

}

function createBranchDown(divParentId) {
  //create a straight down "¦" branch to be continued downward
  //appends to divParentId
  var branchBox = document.createElement('div');
  var branchSimple = document.createElement('div');
  var branchDown = document.createElement('div');
  var parentDiv = document.getElementById(divParentId);

  branchBox.setAttribute('class', 'branchBox');
  branchSimple.setAttribute('class', 'branchSimple');
  branchDown.setAttribute('class', 'branchDown');

  branchBox.appendChild(branchSimple);
  branchBox.appendChild(branchDown);
  parentDiv.appendChild(branchBox);
}

function createBranchEnd(divParentId) {
  //create a "L" end of branch
  //appends to divParentId
  var branchBox = document.createElement('div');
  var branchEnd = document.createElement('div');
  var parentDiv = document.getElementById(divParentId);

  branchBox.setAttribute('class', 'branchBox');
  branchEnd.setAttribute('class', 'branchEnd');

  branchBox.appendChild(branchEnd);
  parentDiv.appendChild(branchBox);
}

function createBranchFork(divParentId) {
  //create a fork in the branch
  //appends to divParentId
  var branchBox = document.createElement('div');
  var branchEnd = document.createElement('div');
  var branchDown = document.createElement('div');
  var parentDiv = document.getElementById(divParentId);

  branchBox.setAttribute('class', 'branchBox');
  branchEnd.setAttribute('class', 'branchEnd');
  branchDown.setAttribute('class', 'branchDown');

  branchBox.appendChild(branchEnd);
  branchBox.appendChild(branchDown);
  parentDiv.appendChild(branchBox);
}

function createMatBox(material, rate, factory, qty, divParentId, boxId, matId){
  //create a material box, consisting of a material detail box (material, rate, factory, qty)
  //and a "-" sign 
  //appends to divParentId (meant to go in a TreeLevel div)
  var matBox = document.createElement('div');
  var sign = document.createElement('div');
  var parentDiv = document.getElementById(divParentId);
  var tempId = "";
  
  matBox.setAttribute('class','matBox');
  matBox.id = boxId;
  sign.innerHTML = '<img src="https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Minus_Sign.png" style="width:15px;height:15px;" alt="-">'
  sign.setAttribute('class','plusMinus');
  
  parentDiv.appendChild(matBox);
  createMatDetail(material, rate, factory, qty, matBox.id, boxId, matId);
  matBox.appendChild(sign);
  tempId=divParentId.substring(4);
  matBox.setAttribute("onClick", "collapse("+tempId+")");

}

function createMatDetail(material, rate, factory, qty, divParentId, boxId, matId){
  //create a material detail box with its picture (matId), material name, 
  //calculated rate,factory required and qty of factories required
  //appends to divParentId (meant to go in a matBox div)
  var matDetail = document.createElement('div');
  var matName = document.createElement('div');
  var matRate =  document.createElement('div');
  var factoryName = document.createElement('div');
  var factoryNum = document.createElement('div');
  var spacer = document.createElement('div');
  var icon = document.createElement('img');
  var parentDiv = document.getElementById(divParentId);

  matDetail.id = boxId
  matDetail.setAttribute('class','matDetail');

  icon.setAttribute('class','ico');
  icon.src=findIcon(matId);
  icon.setAttribute('width', '20px');
  icon.setAttribute('height', '20px');
  icon.setAttribute('alt', 'iron');

  matName.setAttribute('class', 'matName');
  matName.innerHTML = material;
  matName.prepend(icon);
  matRate.setAttribute('class', 'matRate');
  matRate.innerHTML = Math.round(rate * 100) / 100;
  factoryName.setAttribute('class', 'factoryName');
  factoryName.innerHTML=factory;
  factoryNum.setAttribute('class', 'factoryNum');
  factoryNum.innerHTML=qty;
  spacer.setAttribute('class','spacer');

  matDetail.appendChild(matName);
  matDetail.appendChild(matRate);
  matDetail.appendChild(factoryName);
  matDetail.appendChild(factoryNum);
  matDetail.appendChild(spacer);

  parentDiv.appendChild(matDetail);
}

function createMatChildren(divParentId, boxId) {
  //create a matChildren div with the id 'boxId' and append it to divParentId
  var matChildren = document.createElement('div');
  var divParent = document.getElementById(divParentId);
  matChildren.setAttribute('class', 'matChildren');
  matChildren.id = boxId;
  divParent.appendChild(matChildren);
}

function collapse(childId){
  
  //hide the div chilID if visible, unhide it if hidden.
  if (document.getElementById('child'+childId).style.display == 'none') {showChild(childId)}
  else { hideChild(childId)}
}

function collapseRank(rank){
  const allChild = document.getElementsByClassName('matChildren');
  var size = allChild.length;
  var tempStr ="";
  for (i=0; i<size; i++){
    tempStr=allChild[i].id;
    if ((tempStr.substring(5,6))>rank){
      hideChild(allChild[i].id.substring(5));
    } else {
      showChild(allChild[i].id.substring(5));
    }
  }
}

function hideChild(childId){
  var sign = document.createElement('div');
  sign.setAttribute('class', 'plusMinus');
  document.getElementById('child' + childId).style.display = 'none'
  document.getElementById('matBox' + childId).lastElementChild.innerHTML = innerHTML = '<img src="https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Plus_Sign.png" style="width:15px;height:15px;" alt="-">';
}

function showChild(childId){
  var sign = document.createElement('div');
  sign.setAttribute('class', 'plusMinus');
  document.getElementById('child' + childId).style.display = 'flex'
  document.getElementById('matBox' + childId).lastElementChild.innerHTML = innerHTML = '<img src="https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Minus_Sign.png" style="width:15px;height:15px;" alt="-">';
}

function createTierButton(){
  var buttonBox = document.getElementById("buttonBox");
  const allChild = document.getElementsByClassName('matChildren');
  var size = allChild.length;
  var tempStr = "";
  var rank =0
  
  erase("buttonBox");
  for (i = 0; i < size; i++) {
    tempStr=allChild[i].id;
    if ((tempStr.substring(5, 6)) > rank) { rank = allChild[i].id.substring(5,6)};
  }
  if(i>1){
    for (i=1;i<=rank;i++){
      tempDiv = document.createElement('Div');
      tempDiv.id = "rank"+i;
      if (i==1) { tempDiv.setAttribute("class","buttonStart")}
      else{
        if (i == rank) { tempDiv.setAttribute("class", "buttonEnd")}
        else { tempDiv.setAttribute("class", "buttonMid")}
      }
      tempDiv.innerHTML = i;
      tempDiv.setAttribute("onclick","collapseRank("+i+")")
      buttonBox.appendChild(tempDiv);  
    }
    buttonBox.style.display="flex";
  }
}

function maxFactory(){
  document.getElementById("extractor").selectedIndex = "4";
  document.getElementById("workshop").selectedIndex = "3";
  document.getElementById("furnace").selectedIndex = "3";
  document.getElementById("machine").selectedIndex = "3";
  document.getElementById("industrial").selectedIndex = "3";
  document.getElementById("forge").selectedIndex = "3";
  document.getElementById("manufacturer").selectedIndex = "3";
}

function findIcon(id){
  //returns the url to the picture of the material identified by "id"
  if (id == 0) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Wood_Log.png" };
  if (id == 1) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Copper_ore.png" };
  if (id == 2) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Iron_Ore.png" };
  if (id == 3) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Stone.png" };
  if (id == 4) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Wolframite.png" };
  if (id == 5) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Coal.png" };
  if (id == 6) { return "https://github.com/saprolord/saprolord.github.io/blob/main/image/Wood_Plank.png?raw=true" };
  if (id == 7) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Wooden_Frame.png" };
  if (id == 8) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Copper_Ingot.png" };
  if (id == 9) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Copper_Wire.png" };
  if (id == 10) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Iron_Ingot.png" };
  if (id == 11) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Iron_Gear.png" };
  if (id == 12) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Sand.png" };
  if (id == 13) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Silicon.png" };
  if (id == 14) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Glass.png" };
  if (id == 15) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Tungsten_Ore.png" };
  if (id == 16) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Graphite.png" };
  if (id == 17) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Tungsten_Carbide.png" };
  if (id == 18) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Coupler.png" };
  if (id == 19) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Condenser_Lens.png" };
  if (id == 20) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Heat_Sink.png" };
  if (id == 21) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Iron_Plate.png" };
  if (id == 22) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Electromagnet.png" };
  if (id == 23) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Metal_Frame.png" };
  if (id == 24) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Steel.png" };
  if (id == 25) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Steel_Rod.png" };
  if (id == 26) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Rotor.png" };
  if (id == 27) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Concrete.png" };
  if (id == 28) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Battery.png" };
  if (id == 29) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Electric_Motor.png" };
  if (id == 30) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Logic_Circuit.png" };
  if (id == 31) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Carbon_Fibre.png" };
  if (id == 32) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Nanowire.png" };
  if (id == 33) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Computer.png" };
  if (id == 34) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Industrial_Frame.png" };
  if (id == 35) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Gyroscope.png" };
  if (id == 36) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Stabiliser.png" };
  if (id == 37) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Mag_Field_Gen.png" };
  if (id == 38) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Quantum_Entangler.png" };
  if (id == 39) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Electron_Microscope.png" };
  if (id == 40) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/TurboCharger.png" };
  if (id == 41) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/SuperComputer.png" };
  if (id == 42) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Atomic_Locator.png" };
  if (id == 43) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Energy_Cube.png" };
  if (id == 44) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Tank.png" };
  if (id == 45) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Matter_Compressor.png" };
  if (id == 46) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Particle_Glue.png" };
  if (id == 47) { return "https://raw.githubusercontent.com/saprolord/saprolord.github.io/main/image/Matter_Duplicator.png" };
  if (id == 48) { return "https://raw.githubusercontent.com/saprolord/Builderment/main/image/Earth_Token.png" };
  if (id == 49) { return "https://raw.githubusercontent.com/saprolord/Builderment/main/image/Uranium.png" };
  if (id == 50) { return "https://raw.githubusercontent.com/saprolord/Builderment/main/image/Enriched_Uranium.png" };
  if (id == 51) { return "https://raw.githubusercontent.com/saprolord/Builderment/main/image/Empty_Fuel_Cell.png" };
  if (id == 52) { return "https://raw.githubusercontent.com/saprolord/Builderment/main/image/Nuclear_Fuel_Cell.png" };    
}

function openTab(tabName) {
  //function to switch between tabs
  // shows "mainbox" associated with "tabName" (through the same ID number)
  // hide all other "mainbox"
  var i;
  var ID = tabName;
  ID=tabName.slice(-1);
  var tabList = document.getElementsByClassName("mainbox");
  for (i = 0; i < tabList.length; i++) {
    tabList[i].style.display = "none";
  }
  var tabs = document.getElementsByClassName("tab");
  for(i=0;i<tabs.length;i++){
    tabs[i].style.background = "#748f7e";
    tabs[i].style.transform ="translatey(0px)";
  }
  document.getElementById("tab" + ID).style.background = "#10a049";
  document.getElementById("tab" + ID).style.transform = "translatey(+1px)";
  document.getElementById(tabName).style.display = "flex";
}

function openTab1() {

  //specifically show all blcoks relevant to Tab1 (as it is share with tab2 (probably time to learn Jquery!))
  document.getElementById("tab1").style.background = "#10a049";
  document.getElementById("tab1").style.transform = "translatey(0px)";
  document.getElementById("inputRate").style.display = "flex";
  document.getElementById("calculate1").style.display = "inline";

  document.getElementById("tab2").style.background = "#748f7e";
  document.getElementById("tab2").style.transform = "translatey(+1px)";
  document.getElementById("extractor_qty").style.display = "none";
  document.getElementById("calculate2").style.display = "none";

  document.getElementById("box3").style.display = "none";
  document.getElementById("buttonBox").style.display = "none";
  document.getElementById("TreeTop").style.display = "none";
  document.getElementById("limit_resource").style.display = "none";
}

function openTab2() {
  //specifically show all blooks relevant to Tabw (as it is share with tab1 (probably time to learn Jquery!))
  document.getElementById("tab1").style.background = "#748f7e";
  document.getElementById("tab1").style.transform = "translatey(+1px)";
  document.getElementById("inputRate").style.display = "none";
  document.getElementById("calculate1").style.display = "none";

  document.getElementById("tab2").style.background = "#10a049";
  document.getElementById("tab2").style.transform = "translatey(0px)";
  document.getElementById("extractor_qty").style.display = "flex";
  document.getElementById("calculate2").style.display = "inline";

  document.getElementById("box3").style.display = "none";
  document.getElementById("buttonBox").style.display = "none";
  document.getElementById("TreeTop").style.display = "none";
  document.getElementById("limit_resource").style.display = "none";

}
