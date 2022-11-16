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
			"(i.id, i.numeroSerie, t.nome, i.dataAquisicao, i.tipoItem, t.categoria, c.nome, c.valor, c.prazoDevolucao, t.sinopse, t.id, " +
			" CASE WHEN COUNT(l) > 0 THEN true ELSE false END) " +
			" FROM Item i " +
			" INNER JOIN i.titulo t " +
			" INNER JOIN t.classe c " +
			" LEFT JOIN Locacao l ON l.item.id = i.id AND l.situacao = 'ABERTO' " +
			" WHERE i.excluido = FALSE " +
			" GROUP BY i.id, i.numeroSerie, t.nome, i.dataAquisicao, i.tipoItem, t.categoria, c.nome, c.valor, " +
			" c.prazoDevolucao, t.sinopse, t.id")
	List<ItemListDTO> findAllList();

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.ItemListDTO" +
			"(i.id, i.numeroSerie, t.nome, i.dataAquisicao, i.tipoItem, t.categoria, c.nome, c.valor, c.prazoDevolucao, t.sinopse, t.id, " +
			" CASE WHEN COUNT(l) > 0 THEN true ELSE false END) " +
			" FROM Item i " +
			" INNER JOIN i.titulo t " +
			" INNER JOIN t.classe c " +
			" LEFT JOIN Locacao l ON l.item.id = i.id AND l.situacao = 'ABERTO' " +
			" WHERE (i.excluido = FALSE) " +
			" AND (LOWER(t.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nomeTitulo}, ''), '%'))) " +
			" AND (LOWER(c.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nomeClasse}, ''), '%'))) " +
			" AND (LOWER(t.sinopse) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.sinopse}, ''), '%'))) " +
			" AND (:#{#filter.numeroSerie} IS NULL OR i.numeroSerie = :#{#filter.numeroSerie}) " +
			" AND (:#{#filter.categoria} IS NULL OR t.categoria = :#{#filter.categoria}) " +
			" AND (:#{#filter.tipoItem} IS NULL OR i.tipoItem = :#{#filter.tipoItem}) " +
			" AND (:#{#filter.valor} IS NULL OR c.valor = :#{#filter.valor}) " +
			" AND (:#{#filter.prazoDevolucao} IS NULL OR c.prazoDevolucao = :#{#filter.prazoDevolucao}) " +
			" AND (:#{#filter.dataAquisicao} IS NULL OR i.dataAquisicao = :#{#filter.dataAquisicao}) " +
			" AND (:#{#filter.locado} IS NULL " +
			" OR (CASE WHEN (SELECT COUNT(l1) FROM Locacao l1 WHERE l1.item.id = i.id AND l1.situacao = 'ABERTO') > 0 THEN true ELSE false END) = :#{#filter.locado}) " +
			" GROUP BY i.id, i.numeroSerie, t.nome, i.dataAquisicao, i.tipoItem, t.categoria, c.nome, c.valor, " +
			" c.prazoDevolucao, t.sinopse, t.id")
	Page<ItemListDTO> filtrar(@Param("filter") ItemListDTO filter, Pageable pageable);
}
