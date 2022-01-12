package com.example.case_module_4.service.impl;

import com.example.case_module_4.model.Teacher;
import com.example.case_module_4.model.User;
import com.example.case_module_4.repository.TeacherRepository;
import com.example.case_module_4.service.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class TeacherService implements ITeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Override
    public Iterable<Teacher> findAll() {
        return teacherRepository.findAll();
    }

    @Override
    public Optional<Teacher> findById(Long id) {
        return teacherRepository.findById(id);
    }

    @Override
    public Teacher save(Teacher teacher) {
        return teacherRepository.save(teacher);
    }


    @Override
    public void remove(Long id) {
teacherRepository.deleteById(id);
    }

    @Override
    public Optional<Teacher> findByUser(User user) {
        return teacherRepository.findByUser(user);
    }
}
