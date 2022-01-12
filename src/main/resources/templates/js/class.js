function showClasses(classes) {
    let table = document.getElementById("contentArea")
    table.innerHTML = ''
    table.innerHTML += `
<div class="page-header">
    <div class="row align-items-center">
        <div class="col">
            <h3 class="page-title">Classes</h3>
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><a >Dashboard</a></li>
                <li class="breadcrumb-item active">Classes</li>
            </ul>
        </div>
        <div class="col-auto text-end float-end ms-auto">
            <a onclick ="showInactiveClassList()" class="btn btn-outline-primary me-2"> Show inactive classes</a>
            <a onclick="showFormAddClass()" class="btn btn-primary"><i class="fas fa-plus"></i></a>
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
                            <th>Grade</th>
                            <th>Teachers</th>
                            <th>No of Students</th>
                            <th>Status</th>
                            <th class="text-end">Action</th>
                        </tr>
                        </thead>
                        <tbody id="tbody"> </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
    </div>`
    let content = document.getElementById("tbody")
    for (let i = 0; i < classes.length; i++) {
        let clazz = classes[i]
        console.log(clazz)
        let id = clazz.id;
        let name = "" + clazz.name
        let grade = clazz.grade
        let status
        if (clazz.active) {
            status = "Active"
        } else {
            status = "Inactive"
        }

        let str = `<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${grade}</td><td>`
        let teachers = clazz.teachers
        for (let i = 0; i < teachers.length; i++) {
            let teacher = teachers[i]
            str += `<a onclick ="showTeacherDetails(${teacher.id})">${teacher.user.fullName}</a><br>`
        }
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/students/classes/" + id,
            success: function (students) {
                let noOfStudents = students.length;
                str += `</td><td>${noOfStudents}</td><td>${status}</td>
                            <td class="text-end">
                                <div class="actions">
                                   
                                    <a onclick="showFormEditClass(${id})" class="btn btn-sm bg-danger-light">
                                       Edit
                                    </a> 
                                   
                                    <a onclick="showClassDetails(${id})" class="btn btn-sm bg-danger-light">
                                        Details
                                    </a>
                                    <a onclick="showStudentsByClass(${id})" class="btn btn-sm bg-danger-light">
                                        Student List
                                    </a>
                                    <a onclick="showFormAddScore(${id})" class="btn btn-sm bg-danger-light">
                                        Add Test Result
                                    </a>
                                    </div>
                            </td>
                        </tr>`
                content.innerHTML += str;

            }
        })
    }
}

function showClass(clazz) {
    let status
    if (clazz.active) {
        status = "Active"
    } else {
        status = "Inactive"
    }
    let str = `<div class="page-header">
    <div class="row">
        <div class="col-sm-12">
            <h3 class="page-title">Class ${clazz.name} 's Information </h3>
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><a onclick="showClassList()">Classes </a>
                </li>
                <li class="breadcrumb-item active">Class Details</li>
            </ul>
        </div>
    </div>
</div>
<div class="card">
    <div class="card-body">
        <div class="row">
            <div class="col-md-12">
                <div class="about-info">
                    <div class="media mt-3 d-flex">

                            <ul>
                                <li><span class="title-span">Class Id : </span>
                                    <span class="info-span">${clazz.id}</span>
                                </li>
                                <li>
                                    <span class="title-span">Class Name </span>
                                    <span class="info-span">${clazz.name}</span>
                                </li>
                                <li>
                                    <span class="title-span">Class Grade </span>
                                    <span class="info-span">${clazz.grade}</span>
                                </li>
                                <li>
                                    <span class="title-span">Teachers </span>
                                    <span class="info-span">`
    let teachers = clazz.teachers
    for (let i = 0; i < teachers.length; i++) {
        let teacher = teachers[i]
        str += `<a onclick ="showTeacherDetails(${teacher.id})">${teacher.user.fullName}</a><br>`
    }
    str += `</span>
                                </li>
                                <li>
                                    <span class="title-span">Numbers Of Students </span>
                                    <span class="info-span">`
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/classes/" + clazz.id,
        success: function (students) {
            let noOfStudents = students.length;
            str += `${noOfStudents}</span>
                                </li>
                                <li>
                                    <span class="title-span">Status </span>
                                    <span class="info-span">${status}</span>
                                </li>


                            </ul>
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


function showClassDetails(id) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes/" + id,
        success: function (clazz) {
            showClass(clazz)
        }
    })


}

function showClassList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes/",
        success: function (classes) {
            showClasses(classes)
        }
    })
}

function addClass() {
    let name = $('#name').val();
    let grade = $('#grade').val();
    let teacher0 = $('#teacher0').val();
    let teacher1 = $('#teacher1').val();
    let teacher2 = $('#teacher2').val();
    let clazz = {
        name: name,
        grade: grade,
        teachers: [
            {
                id: teacher0
            },
            {
                id: teacher1
            },
            {
                id: teacher2
            }
        ],
        active: true
    }
    console.log(clazz)

    // let form = document.getElementById("form")
    // let data = new FormData(form)
    // console.log(data);
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        // enctype: 'multipart/form-data',
        url: 'http://localhost:8080/api/classes',
        // data: data,
        data: JSON.stringify(clazz),

        // processData: false,
        // contentType: false,
        // cache: false,
        // timeout: 1000000,
        success: function (newClass) {
            showClassList();
        },

        error: function (error) {
            console.log(error)
            showClassList();
        }
    })
}

function showFormAddClass() {
    let str = `<div class="page-header">
    <div class="row align-items-center">
        <div class="col">
            <h3 class="page-title">Add Class</h3>
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><a onclick="showClassList()">Class</a></li>
                <li class="breadcrumb-item active">Add Class</li>
            </ul>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
<!--                <form enctype="multipart/form-data" id="form">-->
                    <div class="row">
                        <div class="col-12">
                            <h5 class="form-title"><span>Class Details</span></h5>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Class Name</label>
                                <input type="text" class="form-control" id="name" name="name">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Grade</label>
                                <input type="text" class="form-control" id="grade" name="grade">
                            </div>
                        </div>
                        <div class="col-12 col-sm-6">
                            <div class="form-group">
                                <label>Teachers</label>`

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/teachers/",
        success: function (teacherList) {
            console.log(teacherList)
            for (let j = 0; j < 3; j++) {
                let id = "teacher" + j
                str += `<select  class="form-control" id="${id}" name="teachers">`
                for (let i = 0; i < teacherList.length; i++) {
                    str += `<option value="${teacherList[i].id}">${teacherList[i].user.fullName}</option>`
                }
                str += `<option value=""></option>
</select>`
            }
            str += `
                            </div>
                        </div>
                        <div class="col-12">
                            <button type="button" onclick="addClass()" class="btn btn-primary">Submit</button>
                        </div>
                    </div>
<!--                </form>-->
            </div>
        </div>
    </div>
</div>`
            document.getElementById("contentArea").innerHTML = str
        }
    })


}

function showMyClass() {
    let user = JSON.parse(localStorage.getItem("user"))
    let username = user.username
    let id = user.id
    let name = user.name
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/teachers/findByUser/' + id,
        success: function (teacher) {
            let teacherId = teacher.id
            $.ajax({
                type: "GET",
                url: 'http://localhost:8080/api/classes/teachers/' + teacherId,
                success: function (classes) {
                    showClasses(classes)
                }

            })
        }
    })

}