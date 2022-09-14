package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Classe;
import br.com.ifes.videolocadora.service.servico.dto.ClasseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe> {
}

