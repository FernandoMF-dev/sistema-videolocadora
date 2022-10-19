package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Cliente;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import br.com.ifes.videolocadora.service.service.dto.TreeNodeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>, JpaSpecificationExecutor<Cliente> {

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.TreeNodeDTO" +
			"(c.id, sd.idSocio,c.numeroInscricao,c.nome,c.cpf,c.endereco,c.telefone,c.tipoCliente, c.ativo) " +
			" FROM Cliente c " +
			" left JOIN SocioDependente sd ON sd.idDependente = c.id" +
			" WHERE (c.excluido = FALSE)")
	Page<TreeNodeDTO> findAllList(Pageable page);

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.TreeNodeDTO" +
			"(c.id,sd.idSocio, c.numeroInscricao,c.nome,c.cpf,c.endereco,c.telefone,c.tipoCliente, c.ativo) " +
			" FROM Cliente c " +
			" left JOIN SocioDependente sd ON sd.idDependente = c.id" +
			" WHERE (c.excluido = FALSE)" +
			" AND (LOWER(c.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(c.cpf) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.cpf}, ''), '%'))) " +
			" AND (LOWER(c.endereco) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.endereco}, ''), '%'))) " +
			" AND (LOWER(c.telefone) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.telefone}, ''), '%'))) " +
			" AND (:#{#filter.numeroInscricao} IS NULL OR c.numeroInscricao = :#{#filter.numeroInscricao}) " +
			" AND (:#{#filter.tipoCliente} IS NULL OR c.tipoCliente = :#{#filter.tipoCliente}) ")
	Page<TreeNodeDTO> filtrar(@Param("filter") ClienteDTO filter, Pageable pageable);

	@Query("SELECT c FROM Cliente c " +
			"INNER JOIN SocioDependente sd ON sd.idDependente = c.id AND sd.idSocio = :idResponsavel")
	List<Cliente> buscarDependentesPorResponsavel(@Param("idResponsavel") Long idResponsavel);
}
