package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TituloRepository extends JpaRepository<Titulo, Long>, JpaSpecificationExecutor<Titulo> {

	@Query(value = "SELECT t.id, t.nome,t.sinopse,t.ano,t.categoria," +
			"coalesce(t.classe.id,t.classe.nome,t.classe.valor,t.classe.prazoDevolucao) as classe," +
			"coalesce(ta.ator.id,ta.ator.nome) as atores"+
			" FROM Titulo t" +
			" JOIN TituloAtor ta on t.atores" +
			" WHERE t.excluido = FALSE")
	Page<TituloDTO> findAllList(Pageable page);

	@Query("SELECT t.id, t.nome,t.sinopse,t.ano,t.categoria," +
			"coalesce(t.classe.id,t.classe.nome,t.classe.valor,t.classe.prazoDevolucao) as classe," +
			"coalesce(ta.ator.id,ta.ator.nome) as atores"+
			" FROM Titulo t" +
			" JOIN TituloAtor ta on t.atores" +
			" WHERE (t.excluido = FALSE) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) ")
	Page<TituloDTO> filtrar(@Param("filter") TituloDTO filter, Pageable pageable);
}
