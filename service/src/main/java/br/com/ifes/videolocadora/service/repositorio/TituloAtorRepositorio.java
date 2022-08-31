package br.com.ifes.videolocadora.service.repositorio;


import br.com.ifes.videolocadora.service.dominio.TituloAtor;
import br.com.ifes.videolocadora.service.dominio.key.TituloAtorPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TituloAtorRepositorio extends JpaRepository<TituloAtor, TituloAtorPK>, JpaSpecificationExecutor<TituloAtor> {
}
