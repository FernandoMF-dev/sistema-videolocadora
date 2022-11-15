package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Locacao;
import br.com.ifes.videolocadora.service.service.dto.LocacaoListDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long>, JpaSpecificationExecutor<Locacao> {

	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.LocacaoListDTO" +
			"(l.id, l.dataLocacao, l.dataDevolucaoPrevista, l.dataDevolucaoEfetiva, l.valorCobrado, l.valorMulta, l.situacao, " + QueryUtil.TITULO_ITEM_CONCAT + " , c.nome, l.item.id, l.cliente.id) " +
			" FROM Locacao l JOIN l.item i JOIN i.titulo t JOIN l.cliente c ")
	Page<LocacaoListDTO> findAllList(Pageable page);

	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.LocacaoListDTO" +
			"(l.id, l.dataLocacao, l.dataDevolucaoPrevista, l.dataDevolucaoEfetiva, l.valorCobrado, l.valorMulta, l.situacao, " + QueryUtil.TITULO_ITEM_CONCAT + " ,c.nome, l.item.id, l.cliente.id) " +
			" FROM Locacao l JOIN l.item i JOIN i.titulo t JOIN l.cliente c " +
			" WHERE  " +
			" (:#{#filter.dataLocacao} IS NULL OR l.dataLocacao = :#{#filter.dataLocacao}) " +
			" AND (:#{#filter.dataDevolucaoEfetiva} IS NULL OR l.dataDevolucaoEfetiva = :#{#filter.dataDevolucaoEfetiva}) " +
			" AND (:#{#filter.dataDevolucaoPrevista} IS NULL OR l.dataDevolucaoPrevista = :#{#filter.dataDevolucaoPrevista}) " +
			" AND (:#{#filter.valorCobrado} IS NULL OR l.valorCobrado = :#{#filter.valorCobrado}) " +
			" AND (:#{#filter.valorMulta} IS NULL OR l.valorMulta = :#{#filter.valorMulta}) " +
			" AND (LOWER(c.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nomeCliente}, ''), '%'))) " +
			" AND (LOWER(" + QueryUtil.TITULO_ITEM_CONCAT + ") LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.tituloItem}, ''), '%'))) " +
			" AND (:#{#filter.situacao} IS NULL OR l.situacao = :#{#filter.situacao}) ")
	Page<LocacaoListDTO> filtrar(@Param("filter") LocacaoListDTO filter, Pageable page);

}
