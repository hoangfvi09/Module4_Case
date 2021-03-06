package com.example.case_module_4.repository;

import com.example.case_module_4.model.Clazz;
import com.example.case_module_4.model.Parent;
import com.example.case_module_4.model.Student;
import com.example.case_module_4.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    Iterable<Student> findAllByParent(Parent parent);
    Iterable<Student> findAllByActive(Boolean active);
    Iterable<Student> findAllByClazzAndActive(Clazz clazz, boolean active);
    Iterable<Student> findAllByClazzOrderByActive(Clazz clazz);
    Optional<Student> findByUser(User user);


//    Iterable<Student> orderByActive();


}
