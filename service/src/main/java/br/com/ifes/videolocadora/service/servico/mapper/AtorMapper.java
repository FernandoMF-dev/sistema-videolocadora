package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface AtorMapper extends EntityMapper<AtorDTO, Ator> {
}
