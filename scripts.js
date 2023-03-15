const DOM = {
  inputs: {
    rate: document.getElementById("rate"),
    material: document.getElementById("material"),
    factoryLevels: document.querySelectorAll(".factoryLevelSelect"),
  },
  treeTop: document.getElementById("TreeTop"),
  tierBox: document.getElementById("tierButtonBox"),
  totalsBox: document.getElementById("totalsBox"),
  limitBox: document.getElementById("limit_resource"),
};

const CONSTANTS = {
  iconFolder: "/image",
  materials: null,
  baseMaterials: [0, 1, 2, 3, 4, 5],
  factories: null,
  factoryLevelModifiers: [1, 1.5, 2, 3, 4],
};

fetch("./materials.json")
  .then((res) => res.json())
  .then((data) => (CONSTANTS.materials = data));
fetch("./factories.json")
  .then((res) => res.json())
  .then((data) => (CONSTANTS.factories = data));

class Calculation {
  constructor({ rate, material, factoryModifiers }) {
    this.DOM = {
      container: DOM.treeTop,
      tierBox: DOM.tierBox,
      totalsBox: DOM.totalsBox,
      totalsList: DOM.totalsBox.querySelector("#totalsList"),
    };

    this.rate = parseInt(rate);
    this.material = parseInt(material);
    this.factoryModifiers = factoryModifiers;

    this.totals = {};
    this.tree = this.calculateTree(this.material, this.rate);

    this.branches = [];

    console.log("full tree:", this.tree);
  }

  calculateTree(materialId, rate) {
    const branch = {
      ...CONSTANTS.materials[materialId],
      rate,
    };

    branch.factoryCount = Math.ceil(
      rate / (this.factoryModifiers[branch.factory[0]] * branch.factory[1])
    );

    this.totals[materialId] =
      this.totals[materialId] === undefined
        ? rate
        : this.totals[materialId] + rate;

    if (branch.recipe[0][0] === null) {
      return branch;
    }

    branch.children = branch.recipe.map(([material, factoryCount]) =>
      this.calculateTree(material, branch.rate * factoryCount)
    );

    return branch;
  }

  buildTree() {
    this.DOM.container.innerHTML = "";

    new Branch(this.tree, this.branches, this.DOM.container);
    this.DOM.container.style.display = "flex";
  }

  buildTierButtons() {
    this.DOM.tierBox.innerHTML = "";
    this.DOM.tierBox.style.display = "flex";

    const maxLevel = Math.max(...this.branches.map(({ level }) => level));

    console.log("maxlevel: ", maxLevel);

    for (let i = 0; i < maxLevel; i++) {
      new TierButton(this.DOM.tierBox, i, this.onTierButtonClick.bind(this));
    }
  }

  buildTotalsBox() {
    this.DOM.totalsList.innerHTML = "";

    for (let materialId in this.totals) {
      const totalEntry = document
        .querySelector("#totalItemTemplate")
        .cloneNode(true);
      totalEntry.removeAttribute("id");

      totalEntry.innerText = this.totals[materialId];
      totalEntry.style.backgroundImage = `url("${CONSTANTS.iconFolder}/${CONSTANTS.materials[materialId].slug}.png")`;
      totalEntry.style.display = "flex";

      this.DOM.totalsList.append(totalEntry);
    }

    this.DOM.totalsBox.style.display = "flex";
  }

  onTierButtonClick(showLevel) {
    this.branches.forEach((branch) => {
      if (branch.level > showLevel) {
        branch.hide();
      } else {
        branch.show();
      }
    });
  }
}

class ReverseCalculation extends Calculation {
  constructor(calculationValues, userExtractors) {
    super(calculationValues);
    this.userExtractors = userExtractors;

    console.log(this.userExtractors, this.totals);

    const ratios = this.userExtractors.map((extractors, idx) => {
      if (this.totals[idx] === undefined) {
        return Infinity;
      }

      const [_factoryId, factoryRate] =
        CONSTANTS.materials[CONSTANTS.baseMaterials[0]].factory;
      return (
        (extractors * this.factoryModifiers[0] * factoryRate) / this.totals[idx]
      );
    });

    const limit = Math.min(...ratios);
    const limitingExtractor = ratios.indexOf(limit);

    this.totals = {};
    this.tree = this.calculateTree(
      this.material,
      Math.floor(limit * 100) / 100
    );

    const limitText = document.createElement("p");
    limitText.innerText = `You are limited by the amount of ${
      CONSTANTS.materials[CONSTANTS.baseMaterials[limitingExtractor]].name
    } extractors`;

    DOM.limitBox.innerHTML = "";
    DOM.limitBox.style.display = "flex";

    DOM.limitBox.append(limitText);
  }
}

class Branch {
  constructor(
    { children, factory, factoryCount, name, rate, slug },
    branches,
    parent,
    level = 0,
    branchType = "null"
  ) {
    this.DOM = {
      parent: parent,
      container: document.querySelector("#branchTemplate").cloneNode(true),
    };

    this.DOM.branchBox = this.DOM.container.querySelector(".branchBox");
    this.DOM.leafWrapper = this.DOM.container.querySelector(".leafWrapper");
    this.DOM.plusMinus = this.DOM.container.querySelector(".plusMinus");
    this.DOM.children = this.DOM.container.querySelector(".matChildren");

    this.DOM.container.removeAttribute("id");

    this.DOM.branchBox.classList.add(`branchType-${branchType}`);

    this.leaf = new Leaf({ name, rate, slug, factory, factoryCount });
    this.DOM.leafWrapper.append(this.leaf.DOM.container);

    this.level = level;

    if (!children) {
      this.DOM.plusMinus.style.display = "none";
      this.DOM.children.style.display = "none";
    } else {
      this.DOM.plusMinus.classList.add("icoMinus");

      this.leaf.DOM.container.addEventListener("click", this.toggle.bind(this));
      this.DOM.plusMinus.addEventListener("click", this.toggle.bind(this));

      this.children = children.map((details, idx, all) => {
        let branchType;

        if (all.length === 1) {
          // just one child
          branchType = "solo";
        } else if (idx === 0) {
          // multiple children, first child
          branchType = "start";
        } else if (idx === all.length - 1) {
          // multiple children, last child
          branchType = "end";
        } else {
          // multiple children, middle child
          branchType = "middle";
        }

        new Branch(details, branches, this.DOM.children, level + 1, branchType);
      });
    }

    branches.push(this);
    this.DOM.container.style.display = "flex";
    this.DOM.parent.append(this.DOM.container);
  }

  get expanded() {
    return this.DOM.container.getAttribute("data-expanded") === "true";
  }
  set expanded(value) {
    this.DOM.container.setAttribute("data-expanded", value);
  }

  toggle() {
    if (this.expanded) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.DOM.children.style.display = "flex";
    this.DOM.plusMinus.classList.remove("icoPlus");
    this.DOM.plusMinus.classList.add("icoMinus");
    this.expanded = true;
  }

  hide() {
    this.DOM.children.style.display = "none";
    this.DOM.plusMinus.classList.remove("icoMinus");
    this.DOM.plusMinus.classList.add("icoPlus");
    this.expanded = false;
  }
}

class Leaf {
  constructor({ name, slug, rate, factory, factoryCount }) {
    this.DOM = {
      container: document.querySelector("#leafTemplate").cloneNode(true),
    };

    this.DOM.container.removeAttribute("id");
    this.DOM.name = this.DOM.container.querySelector(".matName");
    this.DOM.icon = this.DOM.container.querySelector(".matIcon");
    this.DOM.rate = this.DOM.container.querySelector(".matRate");
    this.DOM.factoryName = this.DOM.container.querySelector(".factoryName");
    this.DOM.factoryNum = this.DOM.container.querySelector(".factoryNum");

    this.DOM.icon.setAttribute("src", `${CONSTANTS.iconFolder}/${slug}.png`);
    this.DOM.icon.setAttribute("alt", name);

    this.DOM.name.innerText = name;
    this.DOM.rate.innerText = rate;
    this.DOM.factoryName.innerText = CONSTANTS.factories[factory[0]].name;
    this.DOM.factoryNum.innerText = factoryCount;

    this.DOM.container.style.display = "flex";
  }
}

class TierButton {
  constructor(parent, level, onClick) {
    this.level = level;
    this.onClick = onClick;

    this.DOM = {
      parent,
      container: document.querySelector("#tierButtonTemplate").cloneNode(true),
    };

    this.DOM.container.removeAttribute("id");
    this.DOM.container.innerText = level + 1;
    this.DOM.container.style.display = "flex";

    this.DOM.container.addEventListener("click", () =>
      this.onClick(this.level)
    );

    this.DOM.parent.append(this.DOM.container);
  }
}

function getUserFactoryLevels() {
  return [...document.querySelectorAll(".factoryLevelSelect")].map(
    (el) => CONSTANTS.factoryLevelModifiers[parseInt(el.value)]
  );
}

function getUserExtractors() {
  return [...document.querySelectorAll(".extractorInput")].map((el) =>
    parseInt(el.value)
  );
}

function calculate() {
  const calc = new Calculation({
    rate: DOM.inputs.rate.value,
    material: DOM.inputs.material.value,
    factoryModifiers: getUserFactoryLevels(),
  });

  calc.buildTree();
  calc.buildTierButtons();
  calc.buildTotalsBox();

  console.log(calc);
}

function reverseCalculate() {
  const calc = new ReverseCalculation(
    {
      rate: 1,
      material: DOM.inputs.material.value,
      factoryModifiers: getUserFactoryLevels(),
    },
    getUserExtractors()
  );

  calc.buildTree();
  calc.buildTierButtons();
  calc.buildTotalsBox();

  console.log(calc);
}

function openTab(tabName) {
  //function to switch between tabs
  // shows "mainbox" associated with "tabName" (through the same ID number)
  // hide all other "mainbox"
  var i;
  var ID = tabName;
  ID = tabName.slice(-1);
  var tabList = document.getElementsByClassName("mainbox");
  for (i = 0; i < tabList.length; i++) {
    tabList[i].style.display = "none";
  }
  var tabs = document.getElementsByClassName("tab");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.background = "#748f7e";
    tabs[i].style.transform = "translatey(0px)";
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

  document
    .querySelectorAll(".totalsBox")
    .forEach((e) => (e.style.display = "none"));
  document.getElementById("tierButtonBox").style.display = "none";
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

  document
    .querySelectorAll(".totalsBox")
    .forEach((e) => (e.style.display = "none"));
  document.getElementById("tierButtonBox").style.display = "none";
  document.getElementById("TreeTop").style.display = "none";
  document.getElementById("limit_resource").style.display = "none";
}
