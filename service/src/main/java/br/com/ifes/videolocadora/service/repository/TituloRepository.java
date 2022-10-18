package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import br.com.ifes.videolocadora.service.service.dto.TituloListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TituloRepository extends JpaRepository<Titulo, Long>, JpaSpecificationExecutor<Titulo> {

	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.TituloListDTO" +
			"(t.id,t.nome,t.sinopse,t.ano,t.categoria," +
			"c.id,c.nome,c.valor,c.prazoDevolucao," +
			"t.diretor.nome,a) " +
			"FROM Titulo t" +
			" LEFT JOIN t.atores a" +
			" JOIN t.classe c")
	Page<TituloListDTO> findAllList(Pageable page);

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.TituloListDTO" +
			"(t.id,t.nome,t.sinopse,t.ano,t.categoria," +
			"c.id,c.nome,c.valor,c.prazoDevolucao," +
			"t.diretor.nome,a)" +
			" FROM Titulo t" +
			" LEFT JOIN t.atores a" +
			" JOIN t.classe c" +
			" WHERE t.excluido = FALSE" +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +

			"")
	Page<TituloDTO> filtrar(@Param("filter") TituloDTO filter, Pageable pageable);
}
