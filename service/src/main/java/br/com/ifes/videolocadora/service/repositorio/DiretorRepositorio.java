package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.Diretor;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.dto.DiretorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DiretorRepositorio extends JpaRepository<Diretor, Long>, JpaSpecificationExecutor<Diretor> {

	@Query("select new br.com.ifes.videolocadora.service.servico.dto.DiretorDTO(d.id,d.nome,d.excluido) from Diretor d where  d.excluido = false")
	Page<DiretorDTO> findAllList(Pageable page);
}
