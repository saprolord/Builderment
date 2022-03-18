function DrawMatBox(material, rate, workshop, qty, x, y){
  const svg = document.querySelector('svg');
  const rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const rect4 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const text1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const text2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const text3 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  const text4 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  
  rect1.setAttribute('x', x);
  rect1.setAttribute('y', y);
  rect1.setAttribute('width', '150');
  rect1.setAttribute('height', '35');
  rect1.setAttribute('fill', '#B2D3C2');
  rect1.setAttribute('stroke', '#000000');
  rect1.setAttribute('stroke-width', '1');
  svg.appendChild(rect1);
  
  rect2.setAttribute('x', x);
  rect2.setAttribute('y', y+35);
  rect2.setAttribute('width', '150');
  rect2.setAttribute('height', '35');
  rect2.setAttribute('fill', '#E6DBAC');
  rect2.setAttribute('stroke', '#000000');
  rect2.setAttribute('stroke-width', '1');
  svg.appendChild(rect2);

  rect3.setAttribute('x', x+150);
  rect3.setAttribute('y', y);
  rect3.setAttribute('width', '35');
  rect3.setAttribute('height', '35');
  rect3.setAttribute('fill', '#FFFFFF');
  rect3.setAttribute('stroke', '#000000');
  rect3.setAttribute('stroke-width', '1');
  svg.appendChild(rect3);

  rect4.setAttribute('x', x+150);
  rect4.setAttribute('y', y+35);
  rect4.setAttribute('width', '35');
  rect4.setAttribute('height', '35');
  rect4.setAttribute('fill', '#FFFFFF');
  rect4.setAttribute('stroke', '#000000');
  rect4.setAttribute('stroke-width', '1');
  svg.appendChild(rect4);


	text1.setAttributeNS(null,"x",x+10);
	text1.setAttributeNS(null,"y",y+20);
	text1.appendChild(document.createTextNode(material));
	svg.appendChild(text1);

	text2.setAttributeNS(null,"x",x+10);
	text2.setAttributeNS(null,"y",y+55);
	text2.appendChild(document.createTextNode(workshop));
	svg.appendChild(text2);

	text3.setAttributeNS(null,"x",x+160);
	text3.setAttributeNS(null,"y",y+20);
	text3.appendChild(document.createTextNode(rate));
	svg.appendChild(text3);

	text4.setAttributeNS(null,"x",x+160);
	text4.setAttributeNS(null,"y",y+55);
	text4.appendChild(document.createTextNode(qty));
	svg.appendChild(text4);

}

function factorycalc() {
 
  'Recipes: Create the arrays and initalise the value'
  'Array format: [[Factory ID, production rate],[material1,material2,...],[material1 requirement, material2 requirement, ...]]'
  'FactoryIDs: Extractor=0, Workshop=1, Furnace=2, Machine Shop=3, Industrial=4, Forge=5, Manufacturer=6, Earth Teleporter=7'
  var wood_log =  ["Wood Log",[0,7.5],0,[1]];
  var copper =    ["Copper",[0,7.5],0,[1]];
  var iron =      ["Iron",[0,7.5],0,[1]];
  var stone =     ["Stone",[0,7.5],0,[1]];
  var wolfram =   ["Wolframite",[0,7.5],0,[1]];
  var coal =      ["Coal",[0,7.5],0,[1]];
  var wood_plank= ["Wood Plank",[1,15],[wood_log],[1]];
  var wood_frame= ["Wood Frame",[1,7.5],[wood_plank],[4]];
  var copper_ingot=["Copper Ingot",[2,30],[copper],[1]];
  var copper_wire=["Copper Wire",[1,30],[copper_ingot],[1.5]];
  var iron_ingot =["Iron Ingot",[2,30],[iron],[1]];
  var iron_gear=  ["Iron Gear",[1,15],[iron_ingot],[2]];
  var sand =      ["Sand",[1,40],[stone],[1]];
  var silicon =   ["Silicon",[2,20],[sand],[2]];
  var glass =     ["Glass",[2,10],[sand],[4]];
  var tungsten =  ["Tungsten Ore",[2,24],[wolfram],[5]];
  var graphite =  ["Graphite",[5,15],[coal, wood_log],[3,3]];
  var carbide =   ["Tungsten Carbide",[5,12],[tungsten,graphite],[2,1]];
  var coupler =   ["Coupler",[1,6],[carbide],[1]];
  var lens =      ["Condenser Lens",[1,20],[glass],[3]];
  var heat_sink=  ["Heat Sink",[1,10],[copper_ingot],[5]];
  var iron_plate= ["Iron Plating",[1,20],[iron_ingot],[2]];
  var emagnet=    ["Electromagnet",[3,7.5],[iron_ingot,copper_wire],[6,2]];
  var metal_frame=["Metal Frame",[3,5],[wood_frame,iron_plate],[1,4]];
  var steel =     ["Steel",[5,7.5],[graphite,iron],[1,6]];
  var steel_rod = ["Steel Rod",[1,15],[steel],[3]];
  var rotor =     ["Rotor",[3,10],[steel_rod,iron_plate],[1,2]];
  var concrete =  ["Concrete",[5,7.5],[sand,steel_rod],[10,1]];
  var battery =   ["Battery",[1,2.5],[emagnet,graphite],[8,8]];
  var motor =     ["Electric Motor",[5,3],[battery,iron_gear,rotor],[1,4,2]];
  var circuit =   ["Logic Circuit",[3,10],[copper_wire,silicon],[3,2]];
  var carbfibre = ["Carbon Fibre",[1,7.5],[graphite],[4]];
  var nanowire =  ["Nano Wire",[3,5],[carbfibre,glass],[2,4]];
  var computer =  ["Computer",[4,7.5],[heat_sink,metal_frame,circuit],[3,1,2]];
  var ind_frame = ["Industrial Frame",[4,3],[concrete,metal_frame,carbide],[6,2,8]];
  var gyroscope = ["Gyroscope",[3,5],[copper_wire,rotor],[12,2]];
  var stabilizer= ["Stabilizer",[4,2.5],[computer,motor,gyroscope],[1,1,2]];
  var mag_field = ["Magnetic Field Generator",[7,1.5],[stabilizer,ind_frame,emagnet,nanowire],[1,1,10,10]];
  var quantum =   ["Quantum Entangler",[3,1],[mag_field,stabilizer],[1,2]];
  var microscope= ["Electron Microscope",[4,2.5],[nanowire,emagnet,lens,metal_frame],[2,8,4,2]];
  var turbocharg= ["Turbocharger",[6,4],[iron_gear,circuit,nanowire,coupler],[8,4,2,4]];
  var supercomp = ["Super Computer",[6,2],[computer,heat_sink,turbocharg,coupler],[2,8,1,8]];
  var atomic =    ["Atomic Locator",[6,2],[supercomp,microscope,concrete,copper_wire],[2,2,24,50]];
  var energy_cube=["Energy Cube",[3,2],[battery,ind_frame],[2,1]];
  var tank =      ["Tank",[4,6],[glass,concrete,carbide],[2,4,4]];
  var compressor= ["Matter Compressor",[6,2],[ind_frame,turbocharg,motor,tank],[1,2,2,1]];
  var particle =  ["Particle Glue",[1,20],[compressor],[0.1]];
  var duplicator= ["Matter Duplicator",[6,2/3],[atomic,quantum,energy_cube,particle],[4,2,5,100]];
  var earth_token=["Earth Token",[7,60/42],[duplicator],[1]];


  '________________________'
  'GLOBAL VARIABLES'
  'Material data matrix'
  materialdata = [wood_log, copper, iron, stone, wolfram, coal, wood_plank,wood_frame,copper_ingot,copper_wire,iron_ingot,iron_gear,sand, silicon, glass, tungsten, graphite, carbide, coupler, lens, heat_sink, iron_plate, emagnet, metal_frame,steel, steel_rod, rotor, concrete, battery, motor, circuit, carbfibre,nanowire, computer, ind_frame,gyroscope,stabilizer,mag_field,quantum,microscope,turbocharg,supercomp,atomic,energy_cube,tank,compressor,particle,duplicator,earth_token,];


  'Global column and line tracker'
  column = 5
  line = 4

  'Assign spreadsheet'
  'buildcalc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BuildCalc");'
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

  var levelFactory = [levelA, levelB, levelC, levelD, levelE, levelF, levelG, levelH];
  var boostFactory = [1,1.5,2,3,4];

  'Assign new rates in relation to the "tier" or "Level" assigned to each factories'
  for (i=0;i<materialdata.length;i++){
    materialdata[i][1][1] = materialdata[i][1][1]*boostFactory[levelFactory[materialdata[i][1][0]]];
  }

  
  'Launch main function to calculate the required elementary'
  calculate(materialdata[index],rate);

  'END'
}

function zero (material) {
  'Set an array to have all value as zero'
  for (var i=0; i<(material.length-1); i++) {
    material[i]=0;
  }
}

function tier1(chkarr){
  'Check if a material is composed of only base materials'
   var isTier1=false;
   if (chkarr[2]==0) {
    isTier1=true;
  }
  return isTier1 ;
}

function calculate (material,rate){
  var start = line;

  'If the material is a Tier 1, write the input materials required in a column, then go back to the previous column'
  if (tier1(material)){
    buildcalc.getRange(line,column).setValue(material[0]);
    buildcalc.getRange(line,column+1).setValue(material[3][0]*rate);
    buildcalc.getRange(line+1,column).setValue(factoryname(material[1][0]));
    buildcalc.getRange(line+1,column+1).setValue(Math.ceil(rate/material[1][1]));
    buildcalc.getRange(line,column,2,2).setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
    buildcalc.getRange(line,column).setBackground('#ffe599');
    line=line+3;
  }else
  {
    buildcalc.getRange(line,column).setValue(material[0]);
    buildcalc.getRange(line,column+1).setValue(rate);
    buildcalc.getRange(line+1,column).setValue(factoryname(material[1][0]));
    buildcalc.getRange(line+1,column+1).setValue(Math.ceil(rate/material[1][1]));
    buildcalc.getRange(line,column,2,2).setBorder(true, true, true, true, true, true, '#000000', SpreadsheetApp.BorderStyle.SOLID);
    buildcalc.getRange(line,column).setBackground('#ffe599');
    
    if (material[2].length==1){
      buildcalc.getRange(line+1,column+2,1,2).setBorder(true,null,null,null,null,null,'#000000', SpreadsheetApp.BorderStyle.SOLID);
      column=column+4;
      calculate(material[2][0],material[3][0]*rate);
      column=column-4;     
    }else{
      
      for(var i=0; i<material[2].length; i++){
        buildcalc.getRange(line+1,column+2,1,2).setBorder(true,null,null,null,null,null,'#000000', SpreadsheetApp.BorderStyle.SOLID);
        Logger.log("Length %s, iterat %s, start %s, line %s, column %s", material[2].length, i, start, line, column);
        if (i==material[2].length-1 && material[2].length>1){
          buildcalc.getRange(start+1,column+2,line-start,1).setBorder(null,null,false,true,null,false,'#000000', SpreadsheetApp.BorderStyle.SOLID);
        }
        column=column+4;
        calculate(material[2][i],material[3][i]*rate);
        column=column-4;

      }
    }
  } 

}


function factoryname(id){
  'Retrun the string of the name of the factory associated with the index "id" '
  'FactoryIDs: Extractor=0, Workshop=1, Furnace=2, Machine Shop=3, Industrial=4, Forge=5, Manufacturer=6, Earth Teleporter=7'
  if (id==0){return "Extractor"};
  if (id==1){return "Workshop"};
  if (id==2){return "Furnace"};
  if (id==3){return "Machine Shop"};
  if (id==4){return "Industrial Factory"};
  if (id==5){return "Forge"};
  if (id==6){return "Manufacturer"};
  if (id==7){return "Earth Teleporter"};  

}
