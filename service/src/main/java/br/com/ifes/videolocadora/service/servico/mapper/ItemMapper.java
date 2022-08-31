package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.dominio.Item;
import br.com.ifes.videolocadora.service.dominio.Locacao;
import br.com.ifes.videolocadora.service.dominio.Titulo;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.dto.ItemDTO;
import br.com.ifes.videolocadora.service.servico.dto.LocacaoDTO;
import br.com.ifes.videolocadora.service.servico.dto.TituloDTO;
import org.springframework.web.bind.annotation.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

	@Override
	@Mapping(source = "idTitulo", target = "titulo.id")
	Titulo toEntity(TituloDTO dto);

	@Override
	@InheritInverseConfiguration
	TituloDTO toDto(Titulo entity);
}

