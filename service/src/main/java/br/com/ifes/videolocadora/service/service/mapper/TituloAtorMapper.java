package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.TituloAtor;
import br.com.ifes.videolocadora.service.service.dto.TituloAtorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TituloAtorMapper extends EntityMapper<TituloAtorDTO, TituloAtor> {
}

