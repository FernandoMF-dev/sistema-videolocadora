package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.Classe;
import br.com.ifes.videolocadora.service.servico.dto.ClasseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClasseRepositorio extends JpaRepository<Classe, Long>, JpaSpecificationExecutor<Classe> {

	@Query("select new br.com.ifes.videolocadora.service.servico.dto.ClasseDTO(c.id,c.nome,c.valor,c.prazoDevolucao,c.excluido) from Classe c where  c.excluido = false")
	Page<ClasseDTO> findAllList(Pageable page);
}
