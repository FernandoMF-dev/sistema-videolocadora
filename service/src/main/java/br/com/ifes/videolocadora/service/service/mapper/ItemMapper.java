package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Item;
import br.com.ifes.videolocadora.service.service.dto.ItemDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

	@Override
	@Mapping(source = "idTitulo", target = "titulo.id")
	Item toEntity(ItemDTO dto);

	@Override
	@InheritInverseConfiguration
	ItemDTO toDto(Item entity);
}

