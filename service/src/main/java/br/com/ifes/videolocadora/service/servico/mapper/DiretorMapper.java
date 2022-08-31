package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.dominio.Diretor;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.dto.DiretorDTO;

@Mapper(componentModel = "spring", uses = {})
public interface DiretorMapper extends EntityMapper<DiretorDTO, Diretor> {
}

