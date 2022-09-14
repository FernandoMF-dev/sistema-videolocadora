package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.SocioDependente;
import br.com.ifes.videolocadora.service.dominio.key.SocioDependentePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SocioDependenteRepositorio extends JpaRepository<SocioDependente, SocioDependentePK>, JpaSpecificationExecutor<SocioDependente> {
}
