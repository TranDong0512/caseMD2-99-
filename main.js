"use strict";
exports.__esModule = true;
var ManagerAccount_1 = require("../sevice/ManagerAccount");
var account_1 = require("../modun/account");
var Album_1 = require("../modun/Album");
var ManagerAlbum_1 = require("../sevice/ManagerAlbum");
var TheSong_1 = require("../modun/TheSong");
var ManagerAllAlbum_1 = require("../sevice/ManagerAllAlbum");
var input = require('readline-sync');
var idUser = null;
var userCheck = null;
var listAccounts = new ManagerAccount_1.ManagerAccount();
var listAllAlbum = new ManagerAllAlbum_1.ManagerAllAlbum();
function logIn() {
    var logIn = "-----LogIN-------\n 1, \u0110\u0103ng nh\u1EADp\n 2, \u0110\u0103ng k\u00FD\n 0, Tho\u00E1t";
    var choice;
    do {
        console.log(logIn);
        choice = input.question(" Nhap lua chon: ");
        switch (choice) {
            case "1":
                loginAccount();
                break;
            case "2":
                register();
                break;
            case "0":
                logOut();
                break;
            default:
                console.log(" nhap sai hãy nhập lại...");
        }
    } while (choice != "0");
}
function register() {
    console.log("-----Đăng ký-----");
    console.log();
    var flag = false;
    do {
        var idUserDone = void 0;
        var idUser_1 = input.question(" nhap id nguoi dung:");
        var idRegex = /^[0-9]+$/;
        var testUser = idRegex.test(idUser_1);
        for (var i = 0; i < listAccounts.listAccountManager.length; i++) {
            if (listAccounts.listAccountManager[i].userPass == idUser_1) {
                testUser = false;
                console.log(" tài khoản đã tồn tại...");
                break;
            }
            if (testUser == false) {
                console.log("nhap sai... ");
                break;
            }
        }
        idUserDone = idUser_1;
        var userName = input.question(" nhâp ten dang ký: ");
        var nameRegex = /^[0-9]+$/;
        var test = nameRegex.test(userName);
        for (var i = 0; i < listAccounts.listAccountManager.length; i++) {
            if (listAccounts.listAccountManager[i].userPass == userName) {
                test = false;
                console.log(" tài khoản đã tồn tại...");
            }
        }
        var userNameDone = void 0;
        var userPassDone = void 0;
        if (test == false) {
            console.log(" vui lòng nhập lại...");
        }
        else {
            userNameDone = userName;
            var flag2 = false;
            do {
                var passWord = input.question(" nhap mat khau: ");
                var passRegex = /^[0-9]+$/;
                var test_1 = passRegex.test(passWord);
                if (test_1 == false) {
                    console.log(" mật khẩu chưa đúng");
                }
                else {
                    userPassDone = passWord;
                    var account = new account_1.Account(+idUserDone, userNameDone, userPassDone);
                    listAccounts.add(account);
                    console.log("-------------");
                    console.log(listAccounts);
                    flag = true;
                    flag2 = true;
                    console.log(" Đăng ký thành công...");
                }
            } while (flag2 == false);
        }
    } while (flag == false);
}
function loginAccount() {
    console.log("-----Đăng nhập------");
    console.log();
    var name = input.question(" nhap ten dang nhap: ");
    console.log();
    var pass = input.question(" nhap mat khau: ");
    if (listAccounts.searchIndex(name, pass) == -1) {
        console.log(" Đăng nhâp thất bại");
    }
    else {
        console.log(" Đăng nhập thành công");
        userCheck = listAccounts.findName(name, pass);
        idUser = userCheck.id;
        menuAlbum();
    }
}
function logOut() {
    idUser = null;
    userCheck = null;
    logIn();
}
function menuAlbum() {
    var managerAlbumUser = null;
    if (listAllAlbum.findAlbumByUserId(idUser) == null) {
        managerAlbumUser = new ManagerAlbum_1.ManagerAlbum(userCheck);
        listAllAlbum.add(managerAlbumUser);
    }
    else {
        managerAlbumUser = listAllAlbum.findAlbumByUserId(idUser);
    }
    var menu = "------MenuAlbum-------\n 1, Tao Album\n 2, S\u1EEDa Album\n 3, Hi\u1EC3n th\u1ECB danh s\u00E1ch Album\n 4, X\u00F3a Album \n 0, Thoat";
    var choice;
    do {
        console.log(menu);
        choice = input.question(" Nhap lua chon: ");
        switch (choice) {
            case "1":
                addAlbum(managerAlbumUser);
                break;
            case "2":
                editAlbum(managerAlbumUser);
                break;
            case "3":
                console.log(" Danh sách album...");
                console.log("\n");
                showAlbum(managerAlbumUser);
                menuSong(managerAlbumUser);
                break;
            case "4":
                deleteAlbum(managerAlbumUser);
                break;
            case "0":
                break;
            default:
                console.log(" nhap sai hay nhap lai...");
                break;
        }
    } while (choice != "0");
}
function addAlbum(managerAlbumUser) {
    console.log("----Thêm Album-----");
    console.log();
    var flag = false;
    do {
        var idAlbum = input.question(" nhâp id album: ");
        var idRegex = /^[0-9]+$/;
        var testId = idRegex.test(idAlbum);
        for (var i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
            if (managerAlbumUser.listAlbumManager[i].id == idAlbum) {
                testId = false;
                console.log(" stt đã tồn tại...");
            }
        }
        var idAlbumDone = void 0;
        if (testId == false) {
            console.log(" vui lòng nhập lại...");
        }
        else {
            idAlbumDone = idAlbum;
            var nameAlbum = input.question(" nhap ten album: ");
            var testName = void 0;
            for (var i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
                if (managerAlbumUser.listAlbumManager[i].name == nameAlbum) {
                    testName = false;
                    console.log(" stt đã tồn tại...");
                }
            }
            if (testName == false) {
                console.log(" vui long nhap lai: ");
            }
            else {
                var album = new Album_1.Album(+idAlbumDone, nameAlbum);
                managerAlbumUser.add(album);
                console.log(" thêm thành công album...");
                flag = true;
                console.log(managerAlbumUser);
            }
        }
    } while (flag == false);
}
function showAlbum(managerAlbumUser) {
    console.log(managerAlbumUser.findAll());
}
function editAlbum(managerAlbumUser) {
    console.log("---- Sửa tên Album----");
    console.log();
    showAlbum(managerAlbumUser);
    var idEdit = +input.question(" nhap Stt Album muon sua: ");
    console.log();
    var newName = input.question(" nhap ten moi cho album: ");
    for (var i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        if (managerAlbumUser.listAlbumManager[i].id == idEdit) {
            managerAlbumUser.findById(idEdit);
            managerAlbumUser.listAlbumManager[i].name = newName;
            managerAlbumUser.findAll();
        }
    }
}
function deleteAlbum(managerAlbumUser) {
    console.log("-----Xóa Album-----");
    console.log();
    var idAlbumDelete = +input.question(" nhap id album can xoa: ");
    console.log();
    for (var i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        if (managerAlbumUser.listAlbumManager[i].id == idAlbumDelete) {
            // managerAlbumUser.findById(idAlbumDelete)
            managerAlbumUser.listAlbumManager.splice(idAlbumDelete - 1, 1);
            console.log(" da xoa thanh cong");
        }
    }
}
function menuSong(managerAlbumUser) {
    var menu = "1, Hien thi bai hat trong album\n 2, Them bai hat\n 3, Xoa bai hat\n 4, Tim kiem bai hat\n 0, Thoat";
    var choice;
    do {
        console.log(menu);
        choice = input.question(" Nhap lua chon: ");
        switch (choice) {
            case "1":
                showSong(managerAlbumUser);
                break;
            case "2":
                addSong(managerAlbumUser);
                break;
            case "3":
                deleteSong(managerAlbumUser);
                break;
            case "4":
                searchSong(managerAlbumUser);
                break;
            case "0":
                break;
            default:
                console.log(" nhap sai ha nhap lai...");
                break;
        }
    } while (choice != "0");
}
// function addSong(managerAlbumUser: ManagerAlbum) {
//     let stt = +input.question(" nhap album muon them bai hat: ")
//     for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
//         if (managerAlbumUser.listAlbumManager[i].id == stt) {
//             let id = +input.question(" nhap id bai hat: ")
//             let name = input.question(" nhap ten bài hat: ")
//             let composing = input.question(" sang tac: ")
//             let song: TheSong = new TheSong(id, name, composing);
//             managerAlbumUser.listAlbumManager[stt - 1].add(song)
//             console.log("thêm bài hát thành công")
//             console.log(managerAlbumUser.listAlbumManager)
//         }
//     }
// }
function addSong(managerAlbumUser) {
    console.log("----Thêm bài hát----");
    console.log();
    var stt = +input.question(" nhap album muon them bai hat: ");
    console.log();
    var id = input.question(" nhap id bai hat: ");
    var idRegex = /^[0-9]+$/;
    var checkId = idRegex.test(id);
    for (var i = 0; i < managerAlbumUser.listAlbumManager[stt - 1].listTheSong.length; i++) {
        if (managerAlbumUser.listAlbumManager[stt - 1].listTheSong[i].id == id) {
            checkId = false;
            console.log(" id bai hat đã tồn tại...");
            break;
        }
    }
    if (!checkId) {
        console.log(" vui lòng nhập lại...");
    }
    else {
        var name_1 = input.question(" nhap ten bài hat: ");
        var composing = input.question(" sang tac: ");
        managerAlbumUser.listAlbumManager[stt - 1].listTheSong.push(new TheSong_1.TheSong(+id, name_1, composing));
    }
}
function showSong(managerAlbumUser) {
    console.log("----Hiển thị bài hát----");
    console.log();
    var show = +input.question(" nhap album muon hien  ");
    for (var i = 0; i < managerAlbumUser.listAlbumManager[show - 1].listTheSong.length; i++) {
        if (managerAlbumUser.listAlbumManager[show - 1].id == show) {
            console.log(managerAlbumUser.listAlbumManager[show - 1].findAll());
        }
        break;
    }
}
function deleteSong(managerAlbumUser) {
    console.log("----Xóa bài hát----");
    console.log();
    showSong(managerAlbumUser);
    var deleteSong = +input.question(" nhap id bai hat muon xóa: ");
    for (var i = 0; i < managerAlbumUser.listAlbumManager[deleteSong - 1].listTheSong.length; i++) {
        if ((managerAlbumUser.listAlbumManager[deleteSong - 1].id == deleteSong)) {
            managerAlbumUser.listAlbumManager[deleteSong - 1].listTheSong.splice(deleteSong - 1, 1);
            console.log(" Da xoa thanh cong.....");
        }
    }
}
// function searchSong(managerAlbumUser) {
//     console.log("----Tìm kiếm----")
//     console.log()
//     showSong(managerAlbumUser)
//     let search = input.question(" nhap ten bai hat: ")
//     for (let i = 0; i < managerAlbumUser.listAlbumManager[search -1].listTheSong.length; i++) {
//         if(managerAlbumUser.listAlbumManager[search -1].name.includes(search)){
//             console.log(managerAlbumUser.listAlbumManager[search -1].listTheSong[search])
//         }
//     }
// }
function searchSong(managerAlbumUser) {
    console.log("----Tìm kiếm----");
    console.log();
    var search = input.question(" nhap ten bai hat: ");
    for (var i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        for (var j = 0; j < managerAlbumUser.listAlbumManager[i].listTheSong.length; j++) {
            if (managerAlbumUser.listAlbumManager[i].listTheSong[j].name.includes(search)) {
                console.log(managerAlbumUser.listAlbumManager[i].listTheSong[j]);
            }
        }
    }
}
function main() {
    logIn();
}
main();
