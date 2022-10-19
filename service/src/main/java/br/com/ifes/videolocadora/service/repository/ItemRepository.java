package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Item;
import br.com.ifes.videolocadora.service.service.dto.ItemListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> {


	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.ItemListDTO" +
			"(i.id,i.numeroSerie,t.nome,i.dataAquisicao,i.tipoItem,t.categoria,c.nome,c.valor,c.prazoDevolucao,t.sinopse,t.id) " +
			" FROM Item i join i.titulo t join t.classe c " +
			" WHERE (i.excluido = FALSE) ")
	List<ItemListDTO> findAllList();

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.ItemListDTO" +
			"(i.id,i.numeroSerie,t.nome,i.dataAquisicao,i.tipoItem,t.categoria,c.nome,c.valor,c.prazoDevolucao,t.sinopse,t.id) " +
			" FROM Item i join i.titulo t join t.classe c " +
			" WHERE (i.excluido = FALSE) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nomeTitulo}, ''), '%'))) " +
			" AND (LOWER(c.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nomeClasse}, ''), '%'))) " +
			" AND (LOWER(t.sinopse) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.sinopse}, ''), '%'))) " +
			" AND (:#{#filter.numeroSerie} IS NULL OR i.numeroSerie = :#{#filter.numeroSerie}) " +
			" AND (:#{#filter.categoria} IS NULL OR t.categoria = :#{#filter.categoria}) " +
			" AND (:#{#filter.tipoItem} IS NULL OR i.tipoItem = :#{#filter.tipoItem}) " +
			" AND (:#{#filter.valor} IS NULL OR c.valor = :#{#filter.valor}) " +
			" AND (:#{#filter.prazoDevolucao} IS NULL OR c.prazoDevolucao = :#{#filter.prazoDevolucao}) " +
			" AND (:#{#filter.dataAquisicao} IS NULL OR i.dataAquisicao = :#{#filter.dataAquisicao}) ")
	Page<ItemListDTO> filtrar(@Param("filter") ItemListDTO filter, Pageable pageable);
}
