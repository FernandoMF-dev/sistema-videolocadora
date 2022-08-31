package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.Classe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepositorio extends JpaRepository<Classe, Long>, JpaSpecificationExecutor<Classe> {
}
