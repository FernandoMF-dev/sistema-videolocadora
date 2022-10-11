package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Diretor;
import br.com.ifes.videolocadora.service.service.dto.DiretorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface DiretorMapper extends EntityMapper<DiretorDTO, Diretor> {
}

