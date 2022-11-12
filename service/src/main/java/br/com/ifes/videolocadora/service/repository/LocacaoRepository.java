package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Locacao;
import br.com.ifes.videolocadora.service.service.dto.LocacaoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacaoRepository extends JpaRepository<Locacao, Long>, JpaSpecificationExecutor<Locacao> {

	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.LocacaoDTO" +
			"(l.id, l.dataLocacao, l.dataDevolucaoPrevista, l.dataDevolucaoEfetiva, l.valorCobrado, l.valorMulta, l.situacao, l.item.titulo.categoria, l.item.id, l.cliente.id) " +
			" FROM Locacao l ")
	Page<LocacaoDTO> findAllList(Pageable page);

	@Query(value = "SELECT new br.com.ifes.videolocadora.service.service.dto.LocacaoDTO" +
			"(l.id, l.dataLocacao, l.dataDevolucaoPrevista, l.dataDevolucaoEfetiva, l.valorCobrado, l.valorMulta, l.situacao, l.item.titulo.categoria, l.item.id, l.cliente.id) " +
			" FROM Locacao l " +
			" WHERE  " +
			" (:#{#filter.dataLocacao} IS NULL OR l.dataLocacao = :#{#filter.dataLocacao}) " +
			" AND (:#{#filter.dataDevolucaoEfetiva} IS NULL OR l.dataDevolucaoEfetiva = :#{#filter.dataDevolucaoEfetiva}) " +
			" AND (:#{#filter.dataDevolucaoPrevista} IS NULL OR l.dataDevolucaoPrevista = :#{#filter.dataDevolucaoPrevista}) " +
			" AND (:#{#filter.valorCobrado} IS NULL OR l.valorCobrado = :#{#filter.valorCobrado}) " +
			" AND (:#{#filter.valorMulta} IS NULL OR l.valorMulta = :#{#filter.valorMulta}) " +
			" AND (:#{#filter.situacao} IS NULL OR l.situacao = :#{#filter.situacao}) " +
			" AND (:#{#filter.categoria} IS NULL OR l.item.titulo.categoria = :#{#filter.categoria}) ")
	Page<LocacaoDTO> filtrar(@Param("filter") LocacaoDTO filter, Pageable page);

}
