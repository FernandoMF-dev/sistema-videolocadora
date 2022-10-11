package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacaoRepositorio extends JpaRepository<Locacao, Long>, JpaSpecificationExecutor<Locacao> {
}
