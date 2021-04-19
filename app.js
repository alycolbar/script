const fetch = require("node-fetch");
const fs = require('fs');

/*get json*/
var obj;

fetch('https://www.contrataciones.gov.py/datos/api/v3/doc/tender/351947')
  .then(res => res.json())
  .then(data => obj = data)
  .then(() => console.log(obj))

/*esperar seg para procesar el json*/
function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
}

async function myAsyncFunction() {
  //Do what you want here 
  console.log("antes del json");

  await delay(6);

  console.log(obj);
  

  console.log("id: "+obj.tender.id);
  console.log("value.amount: "+obj.tender.value.amount);
  console.log(["lote:",obj.tender.lots.map( a => a.title)]);
  console.log(["lots.value.amount:",obj.tender.lots.map( a => a.value.amount)]);
  console.log(["items.unit.name:",obj.tender.items.map( a => a.unit.name)]);
  console.log(["items.unit.value.amount:",obj.tender.items.map( a => a.unit.value.amount)]);
  console.log(["items.quantity:",obj.tender.items.map( a => a.quantity)]);
  console.log(["items.description:",obj.tender.items.map( a => a.description)]);
  console.log(["items.classification.description:",obj.tender.items.map( a => a.classification.description)]);
  console.log(["items.classification.description.id:",obj.tender.items.map( a => a.classification.id )]);
  console.log(["tenderers.name:",obj.tender.tenderers.map(a => a.name)]);
  console.log(["tenderers.id:",obj.tender.tenderers.map(a => a.id)]);

  let myJson = {
    id: obj.tender.id,
    cantidadTotal: obj.tender.value.amount,
    lote: obj.tender.lots.map( a => a.title),
    loteMonto: obj.tender.lots.map( a => a.value.amount),
    itemPorUnidadNombre: obj.tender.items.map( a => a.unit.name),
    itemPorUnidadMonto: obj.tender.items.map( a => a.unit.value.amount),
    itemCantidad: obj.tender.items.map( a => a.quantity),
    itemDescripcion: obj.tender.items.map( a => a.description),
    itemDescripcionId: obj.tender.items.map( a => a.classification.id ),
    tenderNombre: obj.tender.tenderers.map(a => a.name),
    tenderId: obj.tender.tenderers.map(a => a.id)
  };
console.log("************************my Json***************************");
console.log(myJson);

fs.writeFile('archivo.json', JSON.stringify(myJson),'utf8', (err) => { 
  if (err) throw err; 
  console.log('The file has been saved!'); 
}); 

}

myAsyncFunction();
