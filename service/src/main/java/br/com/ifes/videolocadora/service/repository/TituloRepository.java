package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.domain.entity.TituloAtor;
import br.com.ifes.videolocadora.service.service.dto.TituloListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TituloRepository extends JpaRepository<Titulo, Long>, JpaSpecificationExecutor<Titulo> {

	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.TituloListDTO" +
			"(t.id,t.nome,t.sinopse,t.ano,t.categoria," +
			"c.id,c.nome,c.valor,c.prazoDevolucao," +
			"t.diretor.nome) " +
			"FROM Titulo t" +
			" JOIN t.classe c WHERE t.excluido = FALSE ")
	Page<TituloListDTO> findAllList(Pageable page);

	@Query("SELECT DISTINCT new br.com.ifes.videolocadora.service.service.dto.TituloListDTO" +
			"(t.id,t.nome,t.sinopse,t.ano,t.categoria," +
			"c.id,c.nome,c.valor,c.prazoDevolucao," +
			"t.diretor.nome)" +
			" FROM Titulo t" +
			" JOIN t.classe c" +
			" WHERE t.excluido = FALSE" +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +

			"")
	Page<TituloListDTO> filtrar(@Param("filter") TituloListDTO filter, Pageable pageable);

	@Query("SELECT ta from TituloAtor ta where ta.idTitulo in :ids")
	List<TituloAtor> findAtorByTituloId(@Param("ids") List<Long> ids);
}
