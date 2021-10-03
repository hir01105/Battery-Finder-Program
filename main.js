const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

const brandNames = ["Cakon", "Go MN", "VANY"];

//Initial setting
battery.sort(function(a, b){
    if(a.batteryName < b.batteryName) return -1;
    if(a.batteryName > b.batteryName) return 1;
    return 0;
})

const brandSelection = document.getElementById("brandSelection");
const modelSelection = document.getElementById("modelSelection");
const accessoryW = document.getElementById("accessoryW");
const batteryContainer = document.getElementById("availableBattery");

let brandOpt = document.createElement("option");
brandOpt.value = "NA";
brandOpt.innerHTML = "Brand Name";
brandOpt.selected = true;
brandSelection.append(brandOpt);

for(let i=0;i < brandNames.length;i++) {
    brandOpt = document.createElement("option");
    brandOpt.value = brandNames[i];
    brandOpt.innerHTML = brandNames[i];
    brandSelection.append(brandOpt);
}

brandSelection.addEventListener("change", (event) => {
    changeModelList(event.target.value);
    displayBattery(getSelectedModel());
})

modelSelection.disabled = true;
const modelOpt = document.createElement("option");
modelOpt.innerHTML = "Model";
modelOpt.value = "NA";
modelSelection.append(modelOpt);

accessoryW.disabled = true;

modelSelection.addEventListener("change", (ele) => {
    displayBattery(camera[ele.target.value]["model"]);
})

accessoryW.addEventListener("change", function(){
    displayBattery(getSelectedModel());
})

//fuctions
function changeModelList(cameraBrand){
    modelSelection.innerHTML = "";
    if (cameraBrand == "NA") {
        modelSelection.disabled = true;
        accessoryW.disabled = true;
        modelSelection.append(modelOpt);
        return;
    }

    modelSelection.disabled = false;
    accessoryW.disabled = false;
    for(let i=0;i < camera.length;i++){
        if (camera[i]["brand"] == cameraBrand){
            let modelOpt = document.createElement("option");
            modelOpt.value = i.toString();
            modelOpt.innerHTML = camera[i]["model"];
            modelSelection.append(modelOpt);
        }
    }
}

function displayBattery(modelName) {
    batteryContainer.innerHTML = "";
    if(modelName == "NA") {
        return;
    }
    let powerConsumption = 0.0;
    for (let i=0;i < camera.length;i++) {
        if (camera[i]["model"] == modelName) {
            powerConsumption += camera[i]["powerConsumptionWh"];
            break;
        }
    }
    let accessoryConsumption = getAccessoryPowerConsumption();
    
    if (accessoryConsumption == NaN) {
        return;
    }
    powerConsumption += accessoryConsumption;
    for (let j=0;j < battery.length;j++) {
        let targetBattery = battery[j];
        let maxEndPower = targetBattery["endVoltage"] * targetBattery["maxDraw"];
        if (maxEndPower > powerConsumption) {
            let batteryBox = document.createElement("div");
            batteryBox.classList.add("battery-box", "d-flex", "justify-content-between", "align-items-center");
            let batteryName = document.createElement("p");
            let hours = document.createElement("p");
            batteryName.classList.add("pl-2", "py-2", "m-0");
            hours.classList.add("pr-2", "py-2", "m-0");
            batteryName.innerHTML = `<strong>${targetBattery["batteryName"]}</strong>`;
            let maxPower = targetBattery["voltage"] * targetBattery["capacityAh"];
            let num = (Math.round((maxPower / powerConsumption) * 10) / 10).toFixed(1);
            hours.innerHTML = "Estimate " + num.toString() + " hours";
            batteryBox.append(batteryName, hours);
            batteryContainer.append(batteryBox); 
        }
    }
}

function getAccessoryPowerConsumption() {
    return parseFloat(accessoryW.value);
}

function getSelectedModel() {
    let elements = modelSelection.options;
    if(elements[0].value == "NA") {
        return "NA";
    }
    for(let i=0;i < elements.length;i++) {
        if(elements[i].selected) {
            return camera[parseInt(elements[i].value)]["model"];
        }
    }
}