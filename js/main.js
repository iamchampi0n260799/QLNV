const nhanVien = new List();
const validation = new Validation();

function resetToDefault() {
  element("msnv").removeAttribute("disabled");
}

function element(id) {
  return document.getElementById(id);
}

function SetLocalStorage() {
  localStorage.setItem("data-nhanVien", JSON.stringify(nhanVien.list));
}

function GetLocalStorage() {
  if (localStorage.getItem("data-nhanVien") == null) return;

  nhanVien.list = JSON.parse(localStorage.getItem("data-nhanVien"));
  DisplayInformation(nhanVien.list);
}
GetLocalStorage();

function Information() {
  const msnv = element("msnv").value;
  const name = element("name").value;
  const email = element("email").value;
  const password = element("password").value;
  const date = element("datepicker").value;
  const role = element("chucvu").value;

  let isValid = true;
  // validate mã nv(không trống , đã tồn tại)
  isValid &=
    validation.isEmpty(msnv, "Mã nhân viên không được trống!", "tbMaNV") &&
    validation.isExist(
      msnv,
      "Mã nhân viên này đã trùng",
      "tbMaNV",
      nhanVien.list
    );
  // validate tên(không trống , không có số)
  isValid &=
    validation.isEmpty(name, "Tên nhân viên không được trống!", "tbTen") &&
    validation.nameChecking(name, "Tên nhân viên không hợp lệ!", "tbTen");
  // validate email
  isValid &=
    validation.isEmpty(email, "Email nhân viên không được trống!", "tbEmail") &&
    validation.emailCheck(email, "Email nhân viên không hợp lệ!", "tbEmail");
  isValid &=
    validation.isEmpty(
      password,
      "Password nhân viên không được trống!",
      "tbMatKhau"
    ) &&
    validation.lengthPasswordCheck(
      password,
      "Password phải từ 6 - 18 từ!",
      "tbMatKhau",
      6,
      18
    );
  isValid &= validation.roleCheck(
    "chucvu",
    "Chức vụ không hợp lệ!",
    "tbChucVu"
  );
  if (isValid) {
    const instanceNhanVien = new NhanVien(
      msnv,
      name,
      email,
      password,
      date,
      role
    );
    Add(instanceNhanVien);
    DisplayInformation(nhanVien.list);
    SetLocalStorage();
  }
}
function DisplayInformation(nhanVien) {
  const tbody = element("tableDanhSach");
  let content = "";
  nhanVien.map((items) => {
    content += `
            <tr>
                <td>${items.id}</td>
                <td>${items.name}</td>
                <td>${items.email}</td>
                <td>${items.date}</td>
                <td>${items.role}</td>
                <td>
                <button onclick="Delete('${items.id}')" type="button" class="btn btn-success">Delete</button>
                <button onclick="FormInputBeforeUpdate('${items.id}')" type="button" class="btn btn-warning" data-toggle="modal"
                data-target="#myModal">Update</button>
                </td>
                
            </tr>
        `;
  });
  tbody.innerHTML = content;
}
function FormInputBeforeUpdate(id) {
  let index = nhanVien.findIndex(id);
  element("msnv").setAttribute("disabled", true);

  element("msnv").value = nhanVien.list[index].id;
  element("name").value = nhanVien.list[index].name;
  element("email").value = nhanVien.list[index].email;
  element("datepicker").value = nhanVien.list[index].date;
  element("chucvu").value = nhanVien.list[index].role;

  element("btnCapNhat").setAttribute("data-id", nhanVien.list[index].id);
}
function Update(event) {
  let getIdFromEvent = event.target.getAttribute("data-id");

  let index = nhanVien.findIndex(getIdFromEvent);

  const msnv = element("msnv").value;
  const name = element("name").value;
  const email = element("email").value;
  const password = element("password").value;
  const date = element("datepicker").value;
  const role = element("chucvu").value;

  const newUpdate = new NhanVien(msnv, name, email, password, date, role);
  nhanVien.update(getIdFromEvent, newUpdate);

  DisplayInformation(nhanVien.list);
}
function Delete(id) {
  nhanVien.delete(id);
  DisplayInformation(nhanVien.list);
}
function Add(nhanVienCanAdd) {
  nhanVien.add(nhanVienCanAdd);
}
function FindIndex(id) {
  nhanVien.findIndex(id);
}

element("searchName").addEventListener("keyup", function () {
  let searchValue = element("searchName").value.trim();
  var result = nhanVien.timKiemNhanVienTheoTen(searchValue);
  if (result.length > 0) {
    DisplayInformation(result);
  }
});
