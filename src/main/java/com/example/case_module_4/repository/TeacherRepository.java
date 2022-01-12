package com.example.case_module_4.repository;

import com.example.case_module_4.model.Parent;
import com.example.case_module_4.model.Teacher;
import com.example.case_module_4.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    //    Iterable<Teacher> orderById();
    Optional<Teacher> findByUser(User user);
}
