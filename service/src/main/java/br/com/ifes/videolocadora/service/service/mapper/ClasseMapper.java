package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Classe;
import br.com.ifes.videolocadora.service.service.dto.ClasseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe> {
}

