package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.SocioDependente;
import br.com.ifes.videolocadora.service.servico.dto.SocioDependenteDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface SocioDependenteMapper extends EntityMapper<SocioDependenteDTO, SocioDependente> {
}

