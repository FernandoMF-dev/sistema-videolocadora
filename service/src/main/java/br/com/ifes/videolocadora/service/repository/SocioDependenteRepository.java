package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.SocioDependente;
import br.com.ifes.videolocadora.service.domain.key.SocioDependentePK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SocioDependenteRepository extends JpaRepository<SocioDependente, SocioDependentePK>, JpaSpecificationExecutor<SocioDependente> {

	SocioDependente findByIdDependente(Long idDependente);

	@Query("SELECT COUNT(sd) " +
			" FROM SocioDependente sd " +
			" WHERE sd.idSocio = :idResponsavel " +
			" AND sd.idDependente <> :idDependente " +
			" AND sd.dependente.excluido = FALSE ")
	int countDependentesExcept(@Param("idResponsavel") Long idResponsavel, @Param("idDependente") Long idDependente);

}
