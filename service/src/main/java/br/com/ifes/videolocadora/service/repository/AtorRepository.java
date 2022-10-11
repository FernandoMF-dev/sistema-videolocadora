package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Ator;
import br.com.ifes.videolocadora.service.service.dto.AtorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AtorRepository extends JpaRepository<Ator, Long>, JpaSpecificationExecutor<Ator> {

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.AtorDTO" +
			"(a.id,a.nome,a.excluido) " +
			" FROM Ator a " +
			" WHERE a.excluido = FALSE")
	Page<AtorDTO> findAllList(Pageable page);

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.AtorDTO" +
			"(a.id,a.nome,a.excluido) " +
			" FROM Ator a " +
			" WHERE (a.excluido = FALSE) " +
			" AND (LOWER(a.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) ")
	Page<AtorDTO> filtrar(@Param("filter") AtorDTO filter, Pageable pageable);

}
