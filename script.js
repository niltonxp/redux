function somar(a, b, c) {
  return a + b + c;
}

console.log("Normal -> ", somar(2, 5, 10));

//Currying
function somar_(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}
// ou const somar_ = a => b => c => a + b + c;
console.log("Currying ->", somar_(2)(5)(10));

const getElementAttr = (attr) => (element) => element.getAttribute(attr);
const getAttrDataSlide = getElementAttr("data-slide");
const getAttrId = getElementAttr("id");

const li = Array.from(document.querySelectorAll("li"));

const dataSlideList = li.map(getAttrDataSlide); // ['1', '2', '3', '4'];
const idList = li.map(getAttrId); // ['item1', 'item2', 'item3', 'item4'];
