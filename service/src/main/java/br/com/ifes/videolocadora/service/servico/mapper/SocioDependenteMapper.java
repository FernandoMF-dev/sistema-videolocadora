package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.dominio.Locacao;
import br.com.ifes.videolocadora.service.dominio.SocioDependente;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.dto.LocacaoDTO;
import br.com.ifes.videolocadora.service.servico.dto.SocioDependenteDTO;
import org.mapstruct.Mapper;
import org.springframework.web.bind.annotation.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface SocioDependenteMapper extends EntityMapper<SocioDependenteDTO, SocioDependente> {
}

