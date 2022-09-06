class My_array {
  constructor(length) {
    this.items = Array(length);
    this.currentIndex = null;
  }

  print() {
    console.log(this.items.toString());
  }

  insert(item) {
    if (this.currentIndex == null) {
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
    }
    console.log("current index", this.currentIndex);
    console.log("length", this.items.length);
    if (this.currentIndex == this.items.length) {
      this.items.push(item);
    } else {
      this.items[this.currentIndex] = item;
    }
  }

  removeAt(index) {
    this.items.splice(index, 1);
    if (index <= this.currentIndex) {
      this.currentIndex -= 1;
    }
  }
  indexOf(check_value) {
    return this.items.findIndex((value) => value == check_value);
  }

}
const cats = new My_array(3);
cats.insert(1);
cats.insert(2);
cats.insert(3);
cats.insert(4);
cats.removeAt(2);
console.log(cats.indexOf(4));
cats.print();
