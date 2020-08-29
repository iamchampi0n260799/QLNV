function List() {
  this.list = [];
  this.add = function (nhanVienCanAdd) {
    this.list = [...this.list, nhanVienCanAdd];
  };
  this.findIndex = function (id) {
    let deleteIndex = -1;
    this.list.map((items, index) => {
      if (items.id == id) {
        deleteIndex = index;
      }
    });
    return deleteIndex;
  };
  this.delete = function (id) {
    let index = this.findIndex(id);
    console.log(index);
    if (index > -1) {
      this.list.splice(index, 1);
    }
  };
  this.update = function (id, update) {
    let index = this.findIndex(id);
    this.list[index] = update;
  };
}

List.prototype.timKiemNhanVienTheoTen = function (hoTen) {
  var result = [];
  this.list.map((items, index) => {
    var search = hoTen.toLowerCase();
    var name = items.name.toLowerCase();
    if (name.indexOf(search) > -1) {
      result.push(items);
    }
  });
  return result;
};
