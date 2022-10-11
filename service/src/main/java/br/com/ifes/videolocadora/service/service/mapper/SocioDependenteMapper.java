package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.SocioDependente;
import br.com.ifes.videolocadora.service.service.dto.SocioDependenteDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SocioDependenteMapper extends EntityMapper<SocioDependenteDTO, SocioDependente> {
}

