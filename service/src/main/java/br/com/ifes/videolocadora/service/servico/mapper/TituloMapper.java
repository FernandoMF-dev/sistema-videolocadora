package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Titulo;
import br.com.ifes.videolocadora.service.servico.dto.TituloDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ClasseMapper.class, TituloAtorMapper.class})
public interface TituloMapper extends EntityMapper<TituloDTO, Titulo> {
}

