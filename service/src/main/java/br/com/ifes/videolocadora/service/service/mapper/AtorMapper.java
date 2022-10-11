package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Ator;
import br.com.ifes.videolocadora.service.service.dto.AtorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface AtorMapper extends EntityMapper<AtorDTO, Ator> {
}

