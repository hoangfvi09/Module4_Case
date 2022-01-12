package com.example.case_module_4.controller;

import com.example.case_module_4.model.Parent;
import com.example.case_module_4.model.Role;
import com.example.case_module_4.model.Student;
import com.example.case_module_4.model.User;
import com.example.case_module_4.service.IParentService;
import com.example.case_module_4.service.IRoleService;
import com.example.case_module_4.service.IStudentService;
import com.example.case_module_4.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/students")
public class StudentController {
    @Autowired
    private IStudentService studentService;
    @Autowired
    private IParentService iParentService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IRoleService roleService;

    @GetMapping("")
    public ResponseEntity<Iterable<Student>> findAll() {
        if (studentService.findAll() == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(studentService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/inactive")
    public ResponseEntity<Iterable<Student>> findAllInactive() {
        if (studentService.findAllByActive(false) == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(studentService.findAllByActive(false), HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<Iterable<Student>> findAllActive() {
        if (studentService.findAllByActive(true) == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(studentService.findAllByActive(true), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Student> add(@RequestBody Student student) {

        return new ResponseEntity<>(studentService.save(student), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Long id, @RequestBody Student student) {
        student.setId(id);
        return new ResponseEntity<>(studentService.save(student), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Student>> findOne(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/parents/{id}")
    public ResponseEntity<Iterable<Student>> findAllStudentByParent(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.findAllByParent(iParentService.findById(id).get()), HttpStatus.OK);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<Iterable<Student>> findAllStudentByClass(@PathVariable Long id) {
        return new ResponseEntity<>(studentService.findAllByClazzId(id), HttpStatus.OK);
    }

    @PostMapping("/inactivate/{id}")
    public ResponseEntity<Student> inactivateStudent(@PathVariable Long id) {
        Student student = studentService.findById(id).get();
        student.setActive(false);
        return new ResponseEntity<>(studentService.save(student), HttpStatus.OK);
    }

    @PostMapping("/activate/{id}")
    public ResponseEntity<Student> activateStudent(@PathVariable Long id) {
        Student student = studentService.findById(id).get();
        student.setActive(true);
        return new ResponseEntity<>(studentService.save(student), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Iterable<Student>> search(@RequestParam String q) {
//        Role role = roleService.findByName("ROLE_STUDENT");
        Iterable<User> users = userService.findAllByFullNameContaining(q);

        ArrayList<Student> students = new ArrayList<>();
        for (User user : users) {
            if (studentService.findByUser(user).isPresent()) {
                Student student = studentService.findByUser(user).get();
                students.add(student);
            }
        }
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Student> findByUsername(@PathVariable String username){
        Optional<User> userOptional = userService.findByUsername(username);
        if(!userOptional.isPresent()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }
        Optional<Student> studentOptional = studentService.findByUser(userOptional.get());
        return studentOptional.map(student -> new ResponseEntity<>(student, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));

    }


//    @PostMapping ("/addStAndPr")
//    public ResponseEntity<Iterable<User>> createStAndPrUsers(@RequestParam String studentName, String parentPhoneNo){
//        studentName = studentName.toLowerCase();
//        String stUsername = "";
////        for(int i=0;i<studentName.length();i++){
////            if(!studentName.charAt(i).equals(" ")){
////
////            }
////
////        }
//
//
//


}
