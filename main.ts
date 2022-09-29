import {ManagerAccount} from "../sevice/ManagerAccount";
import {Account} from "../modun/account";
import {Album} from "../modun/Album";
import {ManagerAlbum} from "../sevice/ManagerAlbum";
import {TheSong} from "../modun/TheSong";
import {ManagerAllAlbum} from "../sevice/ManagerAllAlbum";

let input = require('readline-sync')
let idUser: number = null;
let usercheck: Account = null
let listAccouts: ManagerAccount = new ManagerAccount()
let listAllAlbum: ManagerAllAlbum = new ManagerAllAlbum()


function logIn() {
    let logIn = `-----LogIN-------
    1, Đăng nhập\n 2, Đăng ký\n 0, Thoát`
    let choice;
    do {
        console.log(logIn)
        choice = +input.question(" Nhap lua chon: ")
        switch (choice) {
            case 1:
                logInAccount()
                break;
            case 2:
                register()
                break
            case 0:
                logOut()
                break;
            default:
                console.log(" nhap sai hãy nhập lại...")
        }
    } while (choice != 0)
}

function register() {
    let flag = false;
    do {
        let idUserDone;
        let idUser = input.question(" nhap id nguoi dung:")
        let idRegex = /^[0-9]+$/
        let testUser = idRegex.test(idUser)
        for (let i = 0; i < listAccouts.listAccountManager.length; i++) {
            if (listAccouts.listAccountManager[i].userPass == idUser) {
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
        for (let i = 0; i < listAccouts.listAccountManager.length; i++) {
            if (listAccouts.listAccountManager[i].userPass == userName) {
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
                    let account = new Account(idUserDone, userNameDone, userPassDone)
                    listAccouts.add(account)
                    console.log("-------------")
                    console.log(listAccouts)
                    flag = true;
                    flag2 = true;
                    console.log(" Đăng ký thành công...")
                }
            } while (flag2 == false)
        }
    }
    while (flag == false)
}

function logInAccount() {
    let name = input.question(" nhap ten dang nhap: ")
    let pass = input.question(" nhap mat khau: ")
    if (listAccouts.seachIndex(name, pass) == -1) {
        console.log(" Đăng nhâp thất bại")
    } else {
        console.log("Đăng nhập thành công")
        usercheck = listAccouts.findName(name, pass)
        idUser = usercheck.id
        menuAlbum()
    }
}

function logOut() {
    idUser = null;
    usercheck = null;
    logIn()
}

function menuAlbum() {
    let managerAlbumUser = null;
    if (listAllAlbum.findAlbumByUserId(idUser) == null) {
        managerAlbumUser = new ManagerAlbum();
        listAllAlbum.add(managerAlbumUser);
    } else {
        managerAlbumUser = listAllAlbum.findAlbumByUserId(idUser);
    }

    let menu = `------MenuAlbum-------\n 1, Tao Anbum\n 2, Sửa album\n 3, Hiển thị danh sách album\n 4, Xóa Album \n 0, Thoat`
    let choice;
    do {
        console.log(menu)
        choice = +input.question(" Nhap lua chon: ")
        switch (choice) {
            case 1:
                addAlbum(managerAlbumUser)

                break;
            case 2:
                editAlbum(managerAlbumUser)

                break;
            case 3:
                console.log("Danh sách album...")
                showAlbum(managerAlbumUser)
                menuSong(managerAlbumUser)

                break;
            case 4:
                deleteAlbum(managerAlbumUser)
                break;
            case 0:

                break;
            default:
                console.log("nhap sai hay nhap lai...")
                break
        }
    } while (choice != 0)
}

function addAlbum(managerAlbumUser: ManagerAlbum) {
    let flag = false;
    do {
        let idAlbum = input.question(" nhâp stt album: ")
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
                console.log("thêm thành công album...")
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
    showAlbum(managerAlbumUser)
    let idedit = +input.question(" nhap Stt Album muon sua: ")
    let newName = input.question(" nhap ten moi cho album: ")
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        if (managerAlbumUser.listAlbumManager[i].id == idedit) {
            managerAlbumUser.findById(idedit)
            managerAlbumUser.listAlbumManager[i].name = newName
            managerAlbumUser.findAll()
        }
    }
}

function deleteAlbum(managerAlbumUser: ManagerAlbum){
    let idAlbumDelete = +input.question(" nhap id album can xoa: ")
    for (let i =0; i < managerAlbumUser.listAlbumManager.length; i++){
        if(managerAlbumUser.listAlbumManager[i].id == idAlbumDelete){
            // managerAlbumUser.findById(idAlbumDelete)
            managerAlbumUser.listAlbumManager.splice(idAlbumDelete -1,1)
            console.log(" dã xóa thanh cong")
        }
    }
}

function menuSong(managerAlbumUser) {
    let menu = `1, Hien thi bai hat trong album\n 2, Them bai hat\n 3, Xoa bai hat\n 4, Tim kiem bai hat\n 0, Thoat`
    let choice;
    do {
        console.log(menu)
        choice = +input.question(" Nhap lua chon: ")
        switch (choice) {
            case 1:
                showSong(managerAlbumUser)
                break;
            case 2:
                addSong(managerAlbumUser)
                break;
            case 3:
                deleteSong(managerAlbumUser)
                break;
            case 4:
                searchSong(managerAlbumUser)
                break
            case 0:

                break
            default:
                console.log("nhap sai ha nhap lai...")
                break
        }
    } while (choice != 0)

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
    let stt = +input.question(" nhap album muon them bai hat: ")
    let id = input.question(" nhap id bai hat: ")
    let idRegex = /^[0-9]+$/
    let checkid = idRegex.test(id)
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        for (let j =0; j< managerAlbumUser.listAlbumManager[i].listTheSong.length;j++)
        if (managerAlbumUser.listAlbumManager[i].listTheSong[j].id == id) {
            checkid = false;
            console.log(" id bai hat đã tồn tại...")
            break;
        }
    }

    let idSongDone;
    if (checkid == false) {
        console.log(" vui lòng nhập lại...")
    } else {
        idSongDone = id
        let name = input.question(" nhap ten bài hat: ")
        let composing = input.question(" sang tac: ")
        for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
            if (managerAlbumUser.listAlbumManager[i].id == stt) {
                let song: TheSong = new TheSong(+idSongDone, name, composing);
                managerAlbumUser.listAlbumManager[i].add(song)
                console.log("thêm bài hát thành công")
                console.log(managerAlbumUser.listAlbumManager)
            }
        }
    }
}

function showSong(managerAlbumUser: ManagerAlbum) {
    let show = +input.question(" nhap album muon hien  ")
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        if (managerAlbumUser.listAlbumManager[i].id == show) {
            managerAlbumUser.listAlbumManager[i].findAll()
        }
    }
}

function deleteSong(managerAlbumUser) {
    showSong(managerAlbumUser)
    let deleteSong = +input.question(" nhap stt bai hat muon xóa: ")
    for (let i = 0; i < managerAlbumUser.listAlbumManager.length; i++) {
        for (let j = 0; j < managerAlbumUser.listAlbumManager[i].listTheSong.length; j++) {
            if (managerAlbumUser.listAlbumManager[i].listTheSong[j].id == deleteSong) {
                managerAlbumUser.listAlbumManager[i].listTheSong.splice(j - 1, 1)
                console.log("đã xóa thanh công")
                break;
            } else {
                console.log(" khoong co bai hat nay...")
            }
        }
    }
}

function searchSong(managerAlbumUser) {
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