package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Diretor;
import br.com.ifes.videolocadora.service.servico.dto.DiretorDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface DiretorMapper extends EntityMapper<DiretorDTO, Diretor> {
}

