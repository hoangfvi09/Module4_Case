package com.example.case_module_4.repository;

import com.example.case_module_4.model.Parent;
import com.example.case_module_4.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent,Long> {

    Optional<Parent> findByUser(User user);

}
