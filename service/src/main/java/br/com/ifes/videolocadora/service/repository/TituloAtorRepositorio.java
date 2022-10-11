package br.com.ifes.videolocadora.service.repository;


import br.com.ifes.videolocadora.service.domain.entity.TituloAtor;
import br.com.ifes.videolocadora.service.domain.key.TituloAtorPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TituloAtorRepositorio extends JpaRepository<TituloAtor, TituloAtorPK>, JpaSpecificationExecutor<TituloAtor> {
}
