package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ClasseMapper.class, AtorMapper.class})
public interface TituloMapper extends EntityMapper<TituloDTO, Titulo> {
}

