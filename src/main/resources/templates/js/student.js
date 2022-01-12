function showFormAddStudent() {
    let str = '      \n' +
        '            <div class="page-header">\n' +
        '                <div class="row align-items-center">\n' +
        '                    <div class="col">\n' +
        '                        <h3 class="page-title">Add Students</h3>\n' +
        '\n' +
        '                        <ul class="breadcrumb">\n' +
        '                            <li class="breadcrumb-item"><a\n' +
        '                                    onclick="showStudentList()">Students</a>\n' +
        '                            </li>\n' +
        '                            <li class="breadcrumb-item active">Add Students</li>\n' +
        '                        </ul>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>' +
        ' <div class="row">\n' +
        '                <div class="col-sm-12">\n' +
        '                    <div class="card">\n' +
        '                        <div class="card-body">\n' +
        '<form enctype="multipart/form-data" id="form">' +
        '                                <div class="row">\n' +

        '                                    <div class="col-12">\n' +
        '                                        <h5 class="form-title"><span>Student Information</span></h5>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-12 col-sm-6">\n' +
        '                                        <div class="form-group">\n' +
        '                                            <label>Student\'s Name</label>\n' +
        '                                            <input type="text" class="form-control" name="stName">\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-12 col-sm-6">\n' +
        '                                        <div class="form-group">\n' +
        '                                            <label>Date of Birth</label>\n' +
        '                                            <div>\n' +
        '                                                <input type="date" class="form-control" name="stBirthday">\n' +
        '                                            </div>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-12 col-sm-6">\n' +
        '                                        <div class="form-group">\n' +
        '                                            <label>Class</label>\n' +
        '                                            <select class="form-control" name="clazzId">'
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes/",
        success: function (classList) {
            console.log(classList)
            for (let i = 0; i < classList.length; i++) {
                str += `<option value="${classList[i].id}">${classList[i].name}</option>`
            }
            str += ' </select>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="col-12 col-sm-6">\n' +
                '                                        <div class="form-group">\n' +
                '                                            <label>Parent\'s Name</label>\n' +
                '                                            <input type="text" class="form-control" name="prName">\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <div class="col-12 col-sm-6">\n' +
                '                                        <div class="form-group">\n' +
                '                                            <label>Parent\'s Mobile</label>\n' +
                '                                            <input type="text" class="form-control" name="prPhoneNo">\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +

                '                                    <div class="col-12">\n' +
                '                                        <button type="button"  class="btn btn-primary" onclick="addStAndPr()">Add student</button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '</form >\n' +
                '                        </div>' +
                '                </div>\n' +
                '            </div>';
            document.getElementById("contentArea").innerHTML = str;
        }
    })

}

function addStAndPr() {
    let form = document.getElementById("form")
    let data = new FormData(form)
    console.log(data);
    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: 'http://localhost:8080/api/auth/generateUsers',
        data: data,

        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function (newStudent) {
            console.log(newStudent)
            showStudent(newStudent);
        },

        error: function (error) {
            console.log(error)
        }
    })
}

function showStudentsByClass(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/classes/" + id,
        success: function (students) {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/classes/" + id,
                success: function (clazz) {
                    let listName = "Students of Class " + clazz.name
                    showStudents(listName, students);
                }
            })
        }
    })
}

function showStudentDetails(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/" + id,
        success: function (student) {
            showStudent(student)
        }
    })

}

function showStudent(newStudent) {
    let stUser = newStudent.user;
    let stName = stUser.fullName;
    let stBirthday = newStudent.birthday.slice(0, 10);
    let stUsername = stUser.username;
    let stAvatar = stUser.avatar;
    let stEnabled
    if (stUser.enabled) {
        stEnabled = "enabled";
    } else {
        stEnabled = "disabled";
    }
    let stActive;
    if (newStudent.active) {
        stActive = "active";
    } else {
        stActive = "inactive";
    }


    let stClass = newStudent.clazz;

    let prUser = newStudent.parent.user;
    let prName = prUser.fullName;
    let prUsername = prUser.username;
    let prEnabled;
    if (prUser.enabled) {
        prEnabled = "enabled";
    } else {
        prEnabled = "disabled";
    }

    let str = `
        <div class="page-header">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="page-title">Student Details</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item">
                            <a onclick="showStudentList()">Student</a>
                        </li>
                        <li class="breadcrumb-item active">Student Details</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <div class="about-info">
                            <h4>Student's Information</h4>
                            <div class="media mt-3 d-flex">
                                <img src="${stAvatar}" class="me-3 flex-shrink-0" alt="...">
                                <div class="media-body flex-grow-1">
                                    <ul>
                                        <li>
                                            <span class="title-span">Id: </span>
                                            <span class="info-span">${newStudent.id}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Full Name : </span>
                                            <span class="info-span">${stName}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Class : </span>
                                            <span class="info-span">${stClass.name}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Birthday : </span>
                                            <span class="info-span">${stBirthday}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Status : </span>
                                            <span class="info-span">${stActive}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Username : </span>
                                            <span class="info-span">${stUsername}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Account is : </span>
                                            <span class="info-span">${stEnabled}</span>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                            <div class="row mt-3">
                               
                            </div>
                             
                             <div class="row mt-2">
                                    <div class="col-md-12">
                                        <h5>Score List</h5>
                                        <ul>
                                        `
    $.ajax({

        type: "GET",
        url: "http://localhost:8080/api/scores/students/" + newStudent.id,
        success: function (scores) {

            for (let i = 0; i < scores.length; i++) {
                let score = scores[i]
                str += `<li>
                                            <span class="title-span">${score.name}: </span>
                                            <span class="info-span">${score.score}</span>
                                        </li>`
            }
            str += `</ul>
                                    </div>
                             </div>
                             <div class="row mt-2">
                                    <div class="col-md-12">
                                        <h5>Unpaid Tuition Fees</h5>
                                        <ul>`
            $.ajax({

                type: "GET",
                url: "http://localhost:8080/api/tuitionFees/unpaid/" + newStudent.id,
                success: function (tuitionFees) {
                    for (let i = 0; i < tuitionFees.length; i++) {
                        let tuitionFee = tuitionFees[i]
                        console.log(tuitionFee)
                        str += `<li>
                                            <span class="title-span">${tuitionFee.name} : </span>
                                            <span class="info-span">${tuitionFee.fee}$</span>
                                        </li>`
                    }
                    str += `</ul>
                                    </div>
                             </div><div class="row mt-2">
                                    <div class="col-md-12">
                                        <h5>Parent's Information</h5>
                                        <ul>
                                        <li>
                                            <span class="title-span">Name : </span>
                                            <span class="info-span">${prName}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Phone Number : </span>
                                            <span class="info-span">${prUsername}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Username : </span>
                                            <span class="info-span">${prUsername}</span>
                                        </li>
                                        <li>
                                            <span class="title-span">Account is : </span>
                                            <span class="info-span">${prEnabled}</span>
                                        </li>
                                        
                                    </ul>
                                    </div>
                             </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>`
                    document.getElementById("contentArea").innerHTML = str;

                }
            })


        }

    })


}

function showStudentList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/active",
        success: function (students) {
            showStudents("Active Student List", students)
            console.log(students);
        }
    })
}

function showInactiveStudentList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/inactive",
        success: function (students) {
            showStudents("Inactive Student List", students)
            console.log(students);
        }
    })
}

function showStudents(listName, studentList) {
    let list = listName
    let str = `<div class="page-header">
    <div class="row align-items-center">
        <div class="col">
            <h3 class="page-title">${list}</h3>
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Students</li>
            </ul>
        </div>
        <div class="col-auto text-end float-end ms-auto">`
        if (listName == "Inactive Student List"){
            str+=`<a onclick="showInactiveStudentList()" class="btn btn-outline-primary me-2">Show Active Students</a>`
        }
        if (listName == "Active Student List"){
            str+=`<a onclick="showStudentList()" class="btn btn-outline-primary me-2"> Show Inactive Students</a>`
        }

            str+=`
            
            <a onclick="showFormAddStudent()" class="btn btn-primary"><i class="fas fa-plus"></i></a>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="card card-table">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover table-center mb-0 datatable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Status</th>
                            <th>DOB</th>
                            <th>Username</th>
                            <th>Parent's Name</th>
                            <th>Parent's Phone Number</th>

                            <th class="text-end">Action</th>
                        </tr>
                        </thead>
                        <tbody>`;
    for (let i = 0; i < studentList.length; i++) {
        let st = studentList[i];
        let pr = st.parent;
        let stUser = st.user;
        let prUser = pr.user;
        let stActive;
        if (st.active) {
            stActive = "active";
        } else {
            stActive = "inactive";
        }

        let stName = stUser.fullName;
        let stId = st.id;
        let stBirthday = st.birthday.slice(0, 10);
        let stUsername = stUser.username;
        let prName = prUser.fullName;
        let prPhoneNo = prUser.username;
        let stClass = st.clazz.name;
        let stAvatar = stUser.avatar;
        str += ` <tr>
                            <td>${stId}</td>
                            <td>
                                <h2 class="table-avatar">
                                    <a onclick="showStudentDetails(${stId})" class="avatar avatar-sm me-2"><img class="avatar-img rounded-circle" src="${stAvatar}" alt="User Image"></a>
                                    <a onclick="showStudentDetails(${stId})">${stName}</a>
                                </h2>
                            </td>
                            <td>${stClass}</td>
                            <td>${stActive}</td>
                            <td>${stBirthday}</td>
                            <td>${stUsername}</td>
                            <td>${prName}</td>
                            <td>${prPhoneNo}</td>`
        if (st.active) {
            str += `<td class="text-end">
                    <div class="actions">
                        <a onclick="showFormEditStudent(${stId})" class="btn btn-sm bg-success-light me-2">
                            <i class="fas fa-pen"></i> Edit
                        </a>
                        <a onclick="inactivateStudent(${stId})" class="btn btn-sm bg-danger-light">
                            <i class="fas fa-trash"></i> Inactivate
                        </a>
                    </div>
                </td>
            </tr>`
        } else {
            str += `<td class="text-end">
                    <div class="actions">
                        <a onclick="showFormEditStudent(${stId})" class="btn btn-sm bg-success-light me-2">
                            <i class="fas fa-pen"></i> Edit
                        </a>
                        <a onclick="activateStudent(${stId})" class="btn btn-sm bg-danger-light">
                             Activate
                        </a>
                    </div>
                </td>
            </tr>`
        }
    }
    document.getElementById("contentArea").innerHTML = str;
}

function activateStudent(id) {
    // console.log(studentList)
    // for (let i = 0; i < studentList.length; i++) {
    //     if (studentList[i].id == id) {
    //         studentList.splice(i, 1);
    //     }
    // }
    // showStudents("Active Student List", studentList);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/students/activate/" + id,
        success: function (student) {
            showInactiveStudentList()
        }
    })
}

function inactivateStudent(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/students/inactivate/" + id,
        success: function (student) {
            showStudentList()
        }

    })
}

function search() {
    let q = document.getElementById('q').value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/students/search?q=${q}`,

        success: function (data) {
            console.log(data);
            showStudents("Students with name "+ q, data)
        }
    })
}

function showStudentByUsername(){
   let user = JSON.parse( localStorage.getItem("user"))
    let username = user.username
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/students/username/'+username,

        success: function (data) {
            showStudentDetails(data.id)

        }
    })

}

function showMyChildren() {
    let user = JSON.parse(localStorage.getItem("user"))
    let username = user.username
    let id = user.id
    let name = user.name
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/parents/findByUser/' + id,

        success: function (parent) {
            let parentId = parent.id

            $.ajax({
                type: "GET",
                url: 'http://localhost:8080/api/students/parents/' + parentId,

                success: function (students) {
                    showStudents(name + "'s children",students)


                }
            })
        }
    })
}