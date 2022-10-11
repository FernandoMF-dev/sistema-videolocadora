package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.SocioDependente;
import br.com.ifes.videolocadora.service.domain.key.SocioDependentePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SocioDependenteRepository extends JpaRepository<SocioDependente, SocioDependentePK>, JpaSpecificationExecutor<SocioDependente> {
}
