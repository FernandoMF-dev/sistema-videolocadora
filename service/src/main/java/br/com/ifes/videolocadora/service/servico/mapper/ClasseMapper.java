package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.dominio.Classe;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.dto.ClasseDTO;

@Mapper(componentModel = "spring", uses = {})
public interface ClasseMapper extends EntityMapper<ClasseDTO, Classe> {
}

