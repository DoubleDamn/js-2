//Константы размеров и начинок для гамбургера
Hamburger.SIZE_SMALL = { name: "small hamburger", price: 50, calories: 20 };
Hamburger.SIZE_LARGE = { name: "big hamburger", price: 100, calories: 40 };
Hamburger.STUFFING_CHEESE = { name: "cheese", price: 10, calories: 20 };
Hamburger.STUFFING_SALAD = { name: "salad", price: 20, calories: 5 };
Hamburger.STUFFING_POTATO = { name: "potato", price: 15, calories: 10 };

//Константы салата
Salad.CAESAR = { name: "caesar", price: 100, calories: 20 };
Salad.OLIVIE = { name: "olivie", price: 50, calories: 80 };

//Константы напитков
Drink.COLA = { name: "cola", price: 50, calories: 40 };
Drink.COFFEE = { name: "coffee", price: 80, calories: 20 };

function menuItem(type, price, calories) {
  this.price = price;
  this.calories = calories;
  this.type = name;
}

menuItem.prototype.calculatePrice = function() {
  return this.price;
};

menuItem.prototype.calculateCalories = function() {
  return this.calories;
};
menuItem.prototype.whatName = function() {
  return this.type;
};

function Hamburger(size, stuffing) {
  this.size = size.name;
  this.stuffing = stuffing.name;
  this.price = size.price + stuffing.price;
  this.calories = size.calories + stuffing.calories;
}

Hamburger.prototype = Object.create(menuItem.prototype);

Hamburger.prototype.getStuffing = function() {
  return this.stuffing;
};

Hamburger.prototype.getSize = function() {
  return this.size;
};

function Salad(type, size) {
  this.type = type.name;
  size = 0.01 * size || 1; //взависимости от введенного веса или 100г по умолчанию
  this.price = type.price * size;
  this.calories = type.calories * size;
}

Salad.prototype = Object.create(menuItem.prototype);

function Drink(type) {
  this.type = type.name;
  this.price = type.price;
  this.calories = type.calories;
}

Drink.prototype = Object.create(menuItem.prototype);

function Order() {
  this.args = [].slice.call(arguments);
  var pay = false;
}

Order.prototype.getItems = function(item) {
  if (!this.pay) {
    this.args.push(item);
  } else {
    console.log("This is order alredy paid! Make a new one please");
  }
};

Order.prototype.deleteItems = function(item) {
  if (!this.pay) {
    if (this.args.indexOf(item) >= 0) {
      this.args.splice(this.args.indexOf(item), 1);
    } else {
      console.log("This item dont exist in order");
    }
  } else {
    console.log("This is order alredy paid! Make a new one please");
  }
};

Order.prototype.Paid = function() {
  this.pay = true;
};

Order.prototype.TotalCalculatePrice = function() {
  var result = this.args.reduce(function(sum, current) {
    return (sum += current.calculatePrice());
  }, 0);
  return result;
};

Order.prototype.TotalCalculateCalories = function() {
  var result = this.args.reduce(function(sum, current) {
    return (sum += current.calculateCalories());
  }, 0);
  return result;
};

var cola = new Drink(Drink.COLA);
var salad = new Salad(Salad.CAESAR);
var smallHamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
var bigHamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE);
var order = new Order(smallHamburger, bigHamburger, cola, salad);

order.deleteItems(salad);
order.getItems(salad);

order.TotalCalculatePrice();
order.TotalCalculateCalories();

cola.calculatePrice();

salad.whatName();
salad.calculatePrice();
salad.calculateCalories();

bigHamburger.calculatePrice();
bigHamburger.calculateCalories();
bigHamburger.getStuffing();
bigHamburger.getSize();
