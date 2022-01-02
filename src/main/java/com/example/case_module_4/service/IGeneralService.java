package com.example.case_module_4.service.General;

import java.util.Optional;

public interface IGeneralService <T> {
    Iterable<T> findAll();
    Optional<T> findById(Long id);
    void save(T t);
    void remove(Long id);
}
