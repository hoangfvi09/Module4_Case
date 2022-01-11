package com.example.case_module_4.controller;


import com.example.case_module_4.model.*;
import com.example.case_module_4.service.*;
import com.example.case_module_4.service.impl.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Date;
import java.util.*;

@Controller
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IParentService parentService;

    @Autowired
    private IStudentService studentService;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private IClazzService clazzService;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ITeacherService teacherService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtService.generateTokenLogin(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userService.findByUsername(username).get();
        return ResponseEntity.ok(new JwtResponse(jwt, currentUser.getId(), userDetails.getUsername(), currentUser.getFullName(), userDetails.getAuthorities(), currentUser.getAvatar()));
    }

    @PostMapping("/register")
    public ResponseEntity<User> create(@RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasFieldErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Iterable<User> users = userService.findAll();
        for (User currentUser : users) {
            if (currentUser.getUsername().equals(user.getUsername())) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
//        if (user.getRoles() != null) {
//            Role role = roleService.findByName("ROLE_ADMIN");
//            Set<Role> roles = new HashSet<>();
//            roles.add(role);
//            user.setRoles(roles);}
////        } else {
////            System.out.println("set role");
////            Role role1 = roleService.findByName("ROLE_USER");
////            Set<Role> roles1 = new HashSet<>();
////            roles1.add(role1);
////            user.setRoles(roles1);
////        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/generateUsers")
    public ResponseEntity<Student> generateUsers(@RequestParam String stName, Date stBirthday, Long clazzId, String prName, String prPhoneNo) {
        String[] stNameArray = stName.toLowerCase().split("");
        String stUserName = "";
        for (int i = 0; i < stNameArray.length; i++) {
            if (!stNameArray[i].equals(" ")) {
                stUserName += stNameArray[i];
            }
            System.out.println("username"+ stUserName);
        }
        User prUser;
        Parent parent;

        if (!userService.findByUsername(prPhoneNo).isPresent()) {
            Role role = roleService.findByName("ROLE_PARENT");
            Set<Role> rolesPr = new HashSet<>();
            rolesPr.add(role);
            prUser = new User(prPhoneNo, passwordEncoder.encode("123"), prName, rolesPr, "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png", Provider.LOCAL, true);
            parent = new Parent(prUser);
            userService.save(prUser);
            parentService.save(parent);
        }
        prUser = userService.findByUsername(prPhoneNo).get();
        parent = parentService.findByUser(prUser).get();
        while (userService.findByUsername(stUserName).isPresent()) {
            int number = (int) Math.round(Math.random() * 1000);
            stUserName += number;
        }
        Role role = roleService.findByName("ROLE_STUDENT");
        Set<Role> rolesSt = new HashSet<>();
        rolesSt.add(role);
        User stUser = new User(stUserName, passwordEncoder.encode("123"), stName, rolesSt, "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png", Provider.LOCAL, true);
        Clazz clazz;
        if (clazzService.findById(clazzId).isPresent()) {
            clazz = clazzService.findById(clazzId).get();
        } else {
            clazz = null;
        }
        Student student = new Student(stBirthday, clazz, parent, stUser, true);
        userService.save(prUser);
        parentService.save(parent);
        studentService.save(student);
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }

    @PostMapping("/generateTeacherUser")
    public ResponseEntity<Teacher> generateTeacherUsers(@RequestParam String name, String phone){
        Role role = roleService.findByName("ROLE_TEACHER");
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        User user = new User(phone,passwordEncoder.encode("123"),name,roles,"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",Provider.LOCAL,true);
        Teacher teacher = new Teacher(user,true);
        System.out.println(name +"abc"+ phone);
        System.out.println(teacher);
        System.out.println(user);
        teacherService.save(teacher);
        userService.save(user);
        return new ResponseEntity<>(teacher, HttpStatus.CREATED);
    }

    @PutMapping("/updatePw/{id}")
    public ResponseEntity<User> updatePw(@PathVariable Long id, @RequestParam String newPw){

        User user = userService.findById(id).get();
        user.setPassword(passwordEncoder.encode(newPw));
        return new ResponseEntity<>(user, HttpStatus.OK);

    }
}
