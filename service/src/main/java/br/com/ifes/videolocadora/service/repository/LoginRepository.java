package br.com.ifes.videolocadora.service.repository;

import br.com.ifes.videolocadora.service.domain.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

	boolean existsByUsername(String username);

	boolean existsByUsernameAndPassword(String username, String password);

}
