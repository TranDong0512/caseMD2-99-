import {ManagerAccount} from "../sevice/ManagerAccount";
import {Account} from "../modun/account";
import {Album} from "../modun/Album";
import {ManagerAlbum} from "../sevice/ManagerAlbum";
import {TheSong} from "../modun/TheSong";
import {ManagerAllAlbum} from "../sevice/ManagerAllAlbum";

let input = require('readline-sync')
let idUser: number = null;
let userCheck: Account = null
let listAccounts: ManagerAccount = new ManagerAccount()
let listAllAlbum: ManagerAllAlbum = new ManagerAllAlbum()


function logIn() {
    let logIn = `-----LogIN-------\n 1, Đăng nhập\n 2, Đăng ký\n 0, Thoát`
    let choice;
    do {
        console.log(logIn)
        choice = input.question(" Nhap lua chon: ")
        switch (choice) {
            case "1":
                loginAccount()
                break;
            case "2":
                register()
                break
            case "0":
                logOut()
                break;
            default:
                console.log(" nhap sai hãy nhập lại...")
        }
    } while (choice != "0")
}

function register() {
    console.log("-----Đăng ký-----")
    console.log()
    let flag = false;
    do {
        let idUserDone;
        let idUser = input.question(" nhap id nguoi dung:")
        let idRegex = /^[0-9]+$/
        let testUser = idRegex.test(idUser)
        for (let i = 0; i < listAccounts.listAccountManager.length; i++) {
            if (listAccounts.listAccountManager[i].userPass == idUser) {
                testUser = false;
                console.log(" tài khoản đã tồn tại...")
                break;
            }
            if (testUser == false) {
                console.log("nhap sai... ")
                break;
            }

        }
        idUserDone = idUser
        let userName = input.question(" nhâp ten dang ký: ")
        let nameRegex = /^[0-9]+$/
        let test = nameRegex.test(userName)
        for (let i = 0; i < listAccounts.listAccountManager.length; i++) {
            if (listAccounts.listAccountManager[i].userPass == userName) {
                test = false;
                console.log(" tài khoản đã tồn tại...")
            }
        }
        let userNameDone;
        let userPassDone;
        if (test == false) {
            console.log(" vui lòng nhập lại...")
        } else {
            userNameDone = userName
            let flag2: boolean = false;
            do {
                let passWord = input.question(" nhap mat khau: ")
                let passRegex = /^[0-9]+$/
                let test = passRegex.test(passWord)
                if (test == false) {
                    console.log(" mật khẩu chưa đúng")
                } else {
                    userPassDone = passWord;
                    let account = new Account(+idUserDone, userNameDone, userPassDone)
                    listAccounts.add(account)
                    console.log("-------------")
                    console.log(listAccounts)
                    flag = true;
                    flag2 = true;
                    console.log(" Đăng ký thành công...")
                }
            } while (flag2 == false)
        }
    }
    while (flag == false)
}

function loginAccount() {
    console.log("-----Đăng nhập------")
    console.log()
    let name = input.question(" nhap ten dang nhap: ")
    console.log()
    let pass = input.question(" nhap mat khau: ")
    if (listAccounts.searchIndex(name, pass) == -1) {
        console.log(" Đăng nhâp thất bại")
    } else {
        console.log(" Đăng nhập thành công")
        userCheck = listAccounts.findName(name, pass)
        idUser = userCheck.id
        menuAlbum()
    }
}

function logOut() {
    idUser = null;
    userCheck = null;
    logIn()
}

function menuAlbum() {
    let managerAlbumUser = null;
    if (listAllAlbum.findAlbumByUserId(idUser) == null) {
        managerAlbumUser = new ManagerAlbum(userCheck);
        listAllAlbum.add(managerAlbumUser);
    } else {
        managerAlbumUser = listAllAlbum.findAlbumByUserId(idUser);
    }

    let menu = `------MenuAlbum-------\n 1, Tao Album\n 2, Sửa Album\n 3, Hiển thị danh sách Album\n 4, Xóa Album \n 0, Thoat`
    let choice;
    do {
        console.log(menu)
        choice = input.question(" Nhap lua chon: ")
        switch (choice) {
            case "1":
                addAlbum(managerAlbumUser)

                break;
            case "2":
                editAlbum(managerAlbumUser)

                break;
            case "3":
                console.log(" Danh sách album...")
                console.log("\n")
                showAlbum(managerAlbumUser)
                menuSong(managerAlbumUser)

                break;
            case "4":
                deleteAlbum(managerAlbumUser)
                break;
            case "0":

                break;
            default:
                console.log(" nhap sai hay nhap lai...")
                break
        }
    } while (choice != "0")
}

function addAlbum(managerAlbumUser: ManagerAlbum) {
    console.log("----Thêm Album-----")
    console.log()
    let flag = false;
    do {
        let idAlbum = input.question(" nhâp id album: ")
        let idRegex = /^[0-9]+$/
        let testid = idRegex.test(idAlbum)
        for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
            if (managerAlbumUser.listAlbumManager[i].id == idAlbum) {
                testid = false;
                console.log(" stt đã tồn tại...")
            }
        }
        let idAlbumDone;
        if (testid == false) {
            console.log(" vui lòng nhập lại...")
        } else {
            idAlbumDone = idAlbum
            let nameAlbum = input.question(" nhap ten album: ")
            let testName: boolean;
            for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
                if (managerAlbumUser.listAlbumManager[i].name == nameAlbum) {
                    testName = false;
                    console.log(" stt đã tồn tại...")
                }
            }
            if (testName == false) {
                console.log(" vui long nhap lai: ")
            } else {
                let album = new Album(+idAlbumDone, nameAlbum)
                managerAlbumUser.add(album)
                console.log(" thêm thành công album...")
                flag = true
                console.log(managerAlbumUser)
            }
        }
    } while (flag == false)
}

function showAlbum(managerAlbumUser: ManagerAlbum) {
    console.log(managerAlbumUser.findAll())

}

function editAlbum(managerAlbumUser: ManagerAlbum) {
    console.log("---- Sửa tên Album----")
    console.log()
    showAlbum(managerAlbumUser)
    let idEdit = +input.question(" nhap Stt Album muon sua: ")
    console.log()
    let newName = input.question(" nhap ten moi cho album: ")
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        if (managerAlbumUser.listAlbumManager[i].id == idEdit) {
            managerAlbumUser.findById(idEdit)
            managerAlbumUser.listAlbumManager[i].name = newName
            managerAlbumUser.findAll()
        }
    }
}


function deleteAlbum(managerAlbumUser: ManagerAlbum){
    console.log("-----Xóa Album-----")
    console.log()
    let idAlbumDelete = +input.question(" nhap id album can xoa: ")
    console.log()
    for (let i =0; i < managerAlbumUser.listAlbumManager.length; i++){
        if(managerAlbumUser.listAlbumManager[i].id == idAlbumDelete){
            // managerAlbumUser.findById(idAlbumDelete)
            managerAlbumUser.listAlbumManager.splice(idAlbumDelete -1,1)
            console.log(" da xoa thanh cong")
        }
    }
}

function menuSong(managerAlbumUser) {
    let menu = `1, Hien thi bai hat trong album\n 2, Them bai hat\n 3, Xoa bai hat\n 4, Tim kiem bai hat\n 0, Thoat`
    let choice;
    do {
        console.log(menu)
        choice = input.question(" Nhap lua chon: ")
        switch (choice) {
            case "1":
                showSong(managerAlbumUser)
                break;
            case "2":
                addSong(managerAlbumUser)
                break;
            case "3":
                deleteSong(managerAlbumUser)
                break;
            case "4":
                searchSong(managerAlbumUser)
                break
            case "0":

                break
            default:
                console.log(" nhap sai ha nhap lai...")
                break
        }
    } while (choice != "0")

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
function addSong(managerAlbumUser: ManagerAlbum) {
    console.log("----Thêm bài hát----")
    console.log()
    let stt = +input.question(" nhap album muon them bai hat: ")
    console.log()
    let id = input.question(" nhap id bai hat: ")
    let idRegex = /^[0-9]+$/
    let checkId = idRegex.test(id)
    for (let i = 0; i < managerAlbumUser.listAlbumManager[stt-1].listTheSong.length; i++) {
        if (managerAlbumUser.listAlbumManager[stt-1].listTheSong[i].id == id) {
            checkId = false;
            console.log(" id bai hat đã tồn tại...");
                break;
        }
     }

    if (!checkId) {
        console.log(" vui lòng nhập lại...")
    } else {
        let name = input.question(" nhap ten bài hat: ")
        let composing = input.question(" sang tac: ")
        managerAlbumUser.listAlbumManager[stt-1].listTheSong.push(new TheSong(+id, name, composing));
    }
}

function showSong(managerAlbumUser: ManagerAlbum) {
    console.log("----Hiển thị bài hát----")
    console.log()
    let show = +input.question(" nhap album muon hien  ")

    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        if (managerAlbumUser.listAlbumManager[i].id == show) {
            console.log( managerAlbumUser.listAlbumManager[i].findAll())
        }
        break;
    }
}

function deleteSong(managerAlbumUser) {
    console.log("----Xóa bài hát----")
    console.log()
    showSong(managerAlbumUser)
    let deleteSong = +input.question(" nhap id bai hat muon xóa: ")
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        for (let j = 0; j < managerAlbumUser.listAlbumManager[i].listTheSong.length; j++) {
            if (managerAlbumUser.listAlbumManager[i].listTheSong[j].id == deleteSong) {
                managerAlbumUser.listAlbumManager[i].listTheSong.splice(j , 1)
                console.log(" đã xóa thanh công")
                break;
            }
        }
    }
}

function searchSong(managerAlbumUser) {
    console.log("----Tìm kiếm----")
    console.log()
    let search = input.question(" nhap ten bai hat: ")
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        for (let j = 0; j < managerAlbumUser.listAlbumManager[i].listTheSong.length; j++) {
            if (managerAlbumUser.listAlbumManager[i].listTheSong[j].name.includes(search)) {
                console.log(managerAlbumUser.listAlbumManager[i].listTheSong[j])
            }
        }

    }
}

function main() {
    logIn()
}

main()