package com.example.case_module_4.service;

import com.example.case_module_4.model.Parent;
import com.example.case_module_4.model.Teacher;
import com.example.case_module_4.model.User;

import java.util.Optional;

public interface ITeacherService extends IGeneralService<Teacher> {
    Optional<Teacher> findByUser(User user);

}
