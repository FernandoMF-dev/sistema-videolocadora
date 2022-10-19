package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Cliente;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>, JpaSpecificationExecutor<Cliente> {

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.ClienteDTO" +
			"(c.id,c.numeroInscricao,c.nome,c.cpf,c.endereco,c.telefone,c.tipoCliente, c.excluido) " +
			" FROM Cliente c " +
			" WHERE (c.excluido = FALSE) ")
	Page<ClienteDTO> findAllList(Pageable page);

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.ClienteDTO" +
			"(c.id,c.numeroInscricao,c.nome,c.cpf,c.endereco,c.telefone,c.tipoCliente, c.excluido) " +
			" FROM Cliente c " +
			" WHERE (c.excluido = FALSE) " +
			" AND (LOWER(c.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) " +
			" AND (LOWER(c.cpf) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.cpf}, ''), '%'))) " +
			" AND (LOWER(c.endereco) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.endereco}, ''), '%'))) " +
			" AND (LOWER(c.telefone) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.telefone}, ''), '%'))) " +
			" AND (:#{#filter.numeroInscricao} IS NULL OR c.numeroInscricao = :#{#filter.numeroInscricao}) " +
			" AND (:#{#filter.tipoCliente} IS NULL OR c.tipoCliente = :#{#filter.tipoCliente}) ")
	Page<ClienteDTO> filtrar(@Param("filter") ClienteDTO filter, Pageable pageable);
}
