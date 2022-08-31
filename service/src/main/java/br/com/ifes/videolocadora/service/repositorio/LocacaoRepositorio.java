package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.Locacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LocacaoRepositorio extends JpaRepository<Locacao, Long>, JpaSpecificationExecutor<Locacao> {
}
