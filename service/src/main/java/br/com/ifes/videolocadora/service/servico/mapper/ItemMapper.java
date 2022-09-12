package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Item;
import br.com.ifes.videolocadora.service.servico.dto.ItemDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

	@Override
	@Mapping(source = "idTitulo", target = "titulo.id")
	Item toEntity(ItemDTO dto);

	@Override
	@InheritInverseConfiguration
	ItemDTO toDto(Item entity);
}

