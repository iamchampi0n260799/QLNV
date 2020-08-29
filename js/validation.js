function Validation() {
  this.isEmpty = function (inputValue, message, span) {
    // Sai dữ liệu
    if (inputValue == "") {
      document.getElementById(span).innerHTML = message;
      document.getElementById(span).style.display = "block";
      return false;
    }
    // Đúng
    document.getElementById(span).innerHTML = "";
    document.getElementById(span).style.display = "none";
    return true;
  };
  this.isExist = function (inputValue, message, span, list) {
    let isExist = list.some((items) => {
      return items.id == inputValue;
    });
    // Sai dữ liệu
    if (isExist) {
      document.getElementById(span).innerHTML = message;
      document.getElementById(span).style.display = "block";
      return false;
    }
    // Đúng
    document.getElementById(span).innerHTML = "";
    document.getElementById(span).style.display = "none";
    return true;
  };
  this.nameChecking = function (inputValue, message, span) {
    // Cách 1 dùng Reg Exp kiểu đối tượng
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );
    // Kiểm tra tên hợp lệ (không có số thì là hợp lệ)
    if (pattern.test(inputValue)) {
      // Đúng
      document.getElementById(span).innerHTML = "";
      document.getElementById(span).style.display = "none";
      return true;
    }
    document.getElementById(span).innerHTML = message;
    document.getElementById(span).style.display = "block";
    return false;
  };
  this.emailCheck = function (inputValue, message, span) {
    // Cách 2 kiểu chuỗi
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputValue.match(pattern)) {
      // Đúng
      document.getElementById(span).innerHTML = "";
      document.getElementById(span).style.display = "none";
      return true;
    }
    document.getElementById(span).innerHTML = message;
    document.getElementById(span).style.display = "block";
    return false;
  };
  this.lengthPasswordCheck = function (inputValue, message, span, min, max) {
    if (inputValue.length >= min && inputValue.length <= max) {
      // Đúng
      document.getElementById(span).innerHTML = "";
      document.getElementById(span).style.display = "none";
      return true;
    }
    document.getElementById(span).innerHTML = message;
    document.getElementById(span).style.display = "block";
    return false;
  };
  this.roleCheck = function (selectedId, message, span) {
    let index = document.getElementById(selectedId).selectedIndex;
    if (index != 0) {
      // Đúng
      document.getElementById(span).innerHTML = "";
      document.getElementById(span).style.display = "none";
      return true;
    }
    document.getElementById(span).innerHTML = message;
    document.getElementById(span).style.display = "block";
    return false;
  };
}
