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

//	@Query(value = "SELECT CAST(t.id as numeric) as id, t.nome as nome,t.sinopse as sinopse,t.ano as ano,t.categoria as categoria," +
//			"       (select (CAST(c.id as numeric),c.nome,cast(c.valor as numeric) ,cast(c.prazo_devolucao as numeric) ) as classe from tb_classe c join tb_titulo t on c.id = t.id_classe)," +
//			"        array_to_string ( (select array_agg(nome) from tb_ator join rel_titulo_ator rta on tb_ator.id = rta.id_ator),',') as atores" +
//			"       from tb_titulo t" +
//			"       where excluido = false", nativeQuery = true)
//	Page<TituloListDTO> findAllList(Pageable page);


	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.TituloListDTO(t.id,t.nome,t.sinopse,t.ano,t.categoria," +
			"t.classe.id,t.classe.nome,t.classe.valor,t.classe.prazoDevolucao,ta) " +
			"from Titulo t left join t.atores ta")
	Page<TituloListDTO> findAllList(Pageable page);

	@Query("SELECT t.id, t.nome,t.sinopse,t.ano,t.categoria," +
			"coalesce(t.classe.id,t.classe.nome,t.classe.valor,t.classe.prazoDevolucao) as classe," +
			"coalesce(ta.ator.id,ta.ator.nome) as atores"+
			" FROM Titulo t" +
			" JOIN TituloAtor ta" +
			" WHERE t.excluido = FALSE" +
//			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			"")
	Page<TituloDTO> filtrar(@Param("filter") TituloDTO filter, Pageable pageable);
}
