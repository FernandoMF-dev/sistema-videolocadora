package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Diretor;
import br.com.ifes.videolocadora.service.service.dto.DiretorDTO;
import br.com.ifes.videolocadora.service.service.dto.SelectItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiretorRepository extends JpaRepository<Diretor, Long>, JpaSpecificationExecutor<Diretor> {

	@Query("select new br.com.ifes.videolocadora.service.service.dto.DiretorDTO(d.id,d.nome) from Diretor d where  d.excluido = false")
	Page<DiretorDTO> findAllList(Pageable page);

	@Query("SELECT new br.com.ifes.videolocadora.service.service.dto.DiretorDTO(d.id,d.nome)" +
			" FROM Diretor d " +
			" WHERE (d.excluido = false ) " +
			" AND (LOWER(d.nome) LIKE LOWER(CONCAT('%', COALESCE(:#{#filter.nome}, ''), '%'))) ")
	Page<DiretorDTO> filtrar(@Param("filter") DiretorDTO filtro, Pageable pageable);

	@Query("select new br.com.ifes.videolocadora.service.service.dto.SelectItemDTO(d.id,d.nome) from Diretor d where  d.excluido = false")
	List<SelectItemDTO> obterSelectItem();
}
