package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.Diretor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DiretorRepositorio extends JpaRepository<Diretor, Long>, JpaSpecificationExecutor<Diretor> {
}
