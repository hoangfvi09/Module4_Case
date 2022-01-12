function showUserHomePage(){
    let currentUser = JSON.parse( localStorage.getItem("user"))
    console.log(currentUser)
    let role = currentUser.roles[0].authority
    let avatar = currentUser.avatar
    let name = currentUser.name
    let username = currentUser.username
    console.log(role);
    let str
    if(role == "ROLE_ADMIN"){
        str =`    <div class="header">

        <div class="header-left">
            <a class="logo">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo">
            </a>
            <a class="logo logo-small">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo" width="30" height="30">
            </a>
        </div>

        <a href="javascript:void(1);" id="toggle_btn">
            <i class="bi bi-list-task"></i>
        </a>

        <div class="top-nav-search">
            <form>
                <input type="text" id ="q" class="form-control" placeholder="Search here" oninput="search()">
                <button class="btn" type="submit" onclick="search()"><i class="bi bi-search"></i></button>
            </form>
        </div>


        <a class="mobile_btn" id="mobile_btn">
            <i class="fas fa-bars"></i>
        </a>


        <ul class="nav user-menu">



            <li class="nav-item dropdown has-arrow">
                <a 
                   class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                    <span class="user-img"><img class="rounded-circle" src="${avatar}" width="31"
                                                alt="${name}"></span>
                </a>
                <div class="dropdown-menu">
                    <div class="user-header">
                        <div class="avatar avatar-sm">
                            <img src="${avatar}" alt="User Image" class="avatar-img rounded-circle">
                        </div>
                        <div class="user-text">
                            <h6>${name}</h6>
                            <p class="text-muted mb-0">Administrator</p>
                        </div>
                    </div>
                    <a class="dropdown-item"
                       onclick="showMyAccount()">My Profile</a>
                    
                    <a class="dropdown-item"
                       onclick="logOut()">Logout</a>
                </div>
            </li>

        </ul>

    </div>


    <div class="sidebar" id="sidebar">
        <div>
            <div>
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">
                            <span></span>
                        </li>
                        
                        <li class="submenu">
                            <a class="active subdrop"><i class="fas fa-user-graduate"></i> <span> Students</span>
                                <span class="menu-arrow"><i class="bi bi-chevron-right"></i></span></a>
                            <ul style="display: block;">
                                <li><a onclick="showStudentList()">Student
                                    List</a></li>
                                <li>
                                    <a onclick="showFormAddStudent()"
                                       >Student Add</a></li>
                                <li>
                                    <a onclick="showInactiveStudentList()"
                                       >Inactive Student List</a></li>
                            </ul>
                        </li>
                        <li class="submenu">
                            <a  class="subdrop" onclick="showTeacherList()"><i
                                    class="fas fa-chalkboard-teacher"></i> <span> Teachers</span><span
                                    class="menu-arrow"><i class="bi bi-chevron-right"></i></span></a>
                            <ul>
                                <li><a onclick="showTeacherList()">Teacher
                                    List</a></li>
                                <li>
                                    <a onclick="showFormAddTeacher()">Teacher
                                        Add</a></li>
                            </ul>
                        </li>
                        <li class="submenu">
                            <a onclick="showClassList()" class="subdrop"><i
                                    class="fas fa-building"></i> <span> Classes</span> <span class="menu-arrow"><i
                                    class="bi bi-chevron-right"></i></span></a>
                            <ul >
                                <li>
                                    <a onclick="showClassList()">Class
                                        List</a></li>
                                <li>
                                    <a onclick="showFormAddClass()">Class
                                        Add</a></li>
                            </ul>
                        </li>
                        <li class="submenu">
                            <a class="subdrop" onclick="showUnpaidFees()"><i
                                    class="fas fa-book-reader"></i> <span> Tuition Fees</span> <span class="menu-arrow"><i
                                    class="bi bi-chevron-right"></i></span></a>
                            <ul>
                                <li><a onclick="showUnpaidFees()">Unpaid Tuition Fees
                                </a></li>
                                <li>
                                    <a onclick="showFormAddFee() ">Add Tuition Fee </a></li>
                                <li>
                                    <a onclick="showFormUpdateFee()">Update Tuition Fee
                                    </a></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="slimScrollBar"></div>
            <div class="slimScrollRail"></div>
        </div>
    </div>

    <!--CONTENT-->
    <!--                        CONTENT TITLE-->
    <div class="page-wrapper" style="min-height: 468px;">
        <div class="content container-fluid">

            <!--            CONTENT -->


            <div class="row" id="contentArea"></div>

            <!--            END CONTENT -->
        </div>
    </div>`

    }else if(role == "ROLE_STUDENT"){
        str =`    <div class="header">

        <div class="header-left">
            <a class="logo">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo">
            </a>
            <a class="logo logo-small">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo" width="30" height="30">
            </a>
        </div>

        <a href="javascript:void(1);" id="toggle_btn">
            <i class="bi bi-list-task"></i>
        </a>

        


        <a class="mobile_btn" id="mobile_btn">
            <i class="fas fa-bars"></i>
        </a>


        <ul class="nav user-menu">



            <li class="nav-item dropdown has-arrow">
                <a 
                   class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                    <span class="user-img"><img class="rounded-circle" src="${avatar}" width="31"
                                                alt="${name}"></span>
                </a>
                <div class="dropdown-menu">
                    <div class="user-header">
                        <div class="avatar avatar-sm">
                            <img src="${avatar}" alt="User Image" class="avatar-img rounded-circle">
                        </div>
                        <div class="user-text">
                            <h6>${name}</h6>
                            <p class="text-muted mb-0">Student</p>
                        </div>
                    </div>
                    <a class="dropdown-item"
                       onclick="showMyAccount()">My Profile</a>
                    
                    <a class="dropdown-item"
                       onclick="logOut()">Logout</a>
                </div>
            </li>

        </ul>

    </div>


    <div class="sidebar" id="sidebar">
        <div>
            <div>
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">
                            <span></span>
                        </li>
                        
                        <li class="submenu">
                            <a class="active subdrop" onclick="showStudentByUsername()"><i class="fas fa-user-graduate"></i> <span> My information</span>
                                <span class="menu-arrow"></span></a>
                            
                        </li>
                        

                    </ul>
                </div>
            </div>
            <div class="slimScrollBar"></div>
            <div class="slimScrollRail"></div>
        </div>
    </div>

    <!--CONTENT-->
    <!--                        CONTENT TITLE-->
    <div class="page-wrapper" style="min-height: 468px;">
        <div class="content container-fluid">

            <!--            CONTENT -->


            <div class="row" id="contentArea"></div>

            <!--            END CONTENT -->
        </div>
    </div>`
    }else if(role == "ROLE_PARENT"){
        str =`    <div class="header">

        <div class="header-left">
            <a class="logo">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo">
            </a>
            <a class="logo logo-small">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo" width="30" height="30">
            </a>
        </div>

        <a href="javascript:void(1);" id="toggle_btn">
            <i class="bi bi-list-task"></i>
        </a>

        


        <a class="mobile_btn" id="mobile_btn">
            <i class="fas fa-bars"></i>
        </a>


        <ul class="nav user-menu">



            <li class="nav-item dropdown has-arrow">
                <a 
                   class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                    <span class="user-img"><img class="rounded-circle" src="${avatar}" width="31"
                                                alt="${name}"></span>
                </a>
                <div class="dropdown-menu">
                    <div class="user-header">
                        <div class="avatar avatar-sm">
                            <img src="${avatar}" alt="User Image" class="avatar-img rounded-circle">
                        </div>
                        <div class="user-text">
                            <h6>${name}</h6>
                            <p class="text-muted mb-0">Parent</p>
                        </div>
                    </div>
                    <a class="dropdown-item"
                       onclick="showMyAccount()">My Profile</a>
                    
                    <a class="dropdown-item"
                       onclick="logOut()">Logout</a>
                </div>
            </li>

        </ul>

    </div>


    <div class="sidebar" id="sidebar">
        <div>
            <div>
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">
                            <span></span>
                        </li>
                        
                        <li class="submenu">
                            <a class="active subdrop" onclick="showMyChildren()"><i class="fas fa-user-graduate"></i> <span> My children</span>
                                <span class="menu-arrow"></span></a>
                            
                        </li>
                        

                    </ul>
                </div>
            </div>
            <div class="slimScrollBar"></div>
            <div class="slimScrollRail"></div>
        </div>
    </div>

    <!--CONTENT-->
    <!--                        CONTENT TITLE-->
    <div class="page-wrapper" style="min-height: 468px;">
        <div class="content container-fluid">

            <!--            CONTENT -->


            <div class="row" id="contentArea"></div>

            <!--            END CONTENT -->
        </div>
    </div>`
    }else if(role == "ROLE_TEACHER"){
        str =`    <div class="header">

        <div class="header-left">
            <a class="logo">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo">
            </a>
            <a class="logo logo-small">
                <img src="https://png.pngtree.com/png-clipart/20201208/ourlarge/pngtree-school-building-cartoon-school-school-building-png-image_2472278.jpg"
                     alt="Logo" width="30" height="30">
            </a>
        </div>

        <a href="javascript:void(1);" id="toggle_btn">
            <i class="bi bi-list-task"></i>
        </a>

        


        <a class="mobile_btn" id="mobile_btn">
            <i class="fas fa-bars"></i>
        </a>


        <ul class="nav user-menu">



            <li class="nav-item dropdown has-arrow">
                <a 
                   class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                    <span class="user-img"><img class="rounded-circle" src="${avatar}" width="31"
                                                alt="${name}"></span>
                </a>
                <div class="dropdown-menu">
                    <div class="user-header">
                        <div class="avatar avatar-sm">
                            <img src="${avatar}" alt="User Image" class="avatar-img rounded-circle">
                        </div>
                        <div class="user-text">
                            <h6>${name}</h6>
                            <p class="text-muted mb-0">Teacher</p>
                        </div>
                    </div>
                    <a class="dropdown-item"
                       onclick="showMyAccount()">My Profile</a>
                    
                    <a class="dropdown-item"
                       onclick="logOut()">Logout</a>
                </div>
            </li>

        </ul>

    </div>


    <div class="sidebar" id="sidebar">
        <div>
            <div>
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">
                            <span></span>
                        </li>
                        
                        <li class="submenu">
                            <a class="active subdrop" onclick="showMyClass()"><i class="fas fa-user-graduate"></i> <span> My class</span>
                                <span class="menu-arrow"></span></a>
                            
                        </li>
                        

                    </ul>
                </div>
            </div>
            <div class="slimScrollBar"></div>
            <div class="slimScrollRail"></div>
        </div>
    </div>

    <!--CONTENT-->
    <!--                        CONTENT TITLE-->
    <div class="page-wrapper" style="min-height: 468px;">
        <div class="content container-fluid">

            <!--            CONTENT -->


            <div class="row" id="contentArea"></div>

            <!--            END CONTENT -->
        </div>
    </div>`
    }


    document.getElementById("window").innerHTML = str;
}

function showHomePage(){
    // let str = JSON.stringify({
    //     id: 13,
    //     username: "admin",
    //     name: "TRINH LAN HUONG",
    //     avatar: "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    //     roles: [
    //         {
    //             "authority": "ROLE_ADMIN"
    //         }
    //     ],
    //     accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0MTc4NDkwMiwiZXhwIjo4ODA0MTc4NDkwMn0.WU3sxr1W3KKQj6NlNsTz_ZBWbdu26svL6A5fRegxJ4zzcxsbmRaJdcfoqJnozB1ZZISyuSEakaKEGDoMjGnt3w",
    //     tokenType: "Bearer"
    // })
    // localStorage.setItem("user",str)

    let user = localStorage.getItem("user")
    if(user == null){
        showLoginForm()
    }else{
        showUserHomePage()
    }
}