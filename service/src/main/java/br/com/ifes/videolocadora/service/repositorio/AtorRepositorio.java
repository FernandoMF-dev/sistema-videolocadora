package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AtorRepositorio extends JpaRepository<Ator, Long>, JpaSpecificationExecutor<Ator> {

	@Query("SELECT new br.com.ifes.videolocadora.service.servico.dto.AtorDTO" +
			"(a.id,a.nome,a.excluido) " +
			" FROM Ator a " +
			" WHERE a.excluido = FALSE")
	Page<AtorDTO> findAllList(Pageable page);

	@Query("SELECT new br.com.ifes.videolocadora.service.servico.dto.AtorDTO" +
			"(a.id,a.nome,a.excluido) " +
			" FROM Ator a " +
			" WHERE (a.excluido = FALSE) " +
			" AND (LOWER(a.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) ")
	Page<AtorDTO> filtrar(@Param("filter") AtorDTO filter, Pageable pageable);

}
