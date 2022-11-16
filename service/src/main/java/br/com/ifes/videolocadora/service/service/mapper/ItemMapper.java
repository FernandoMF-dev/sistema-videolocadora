package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Item;
import br.com.ifes.videolocadora.service.service.dto.ItemDTO;
import br.com.ifes.videolocadora.service.service.dto.ItemListDTO;
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

	@Mapping(source = "titulo.id", target = "idTitulo")
	@Mapping(source = "titulo.nome", target = "nomeTitulo")
	@Mapping(source = "titulo.categoria", target = "categoria")
	@Mapping(source = "titulo.sinopse", target = "sinopse")
	@Mapping(source = "titulo.classe.nome", target = "nomeClasse")
	@Mapping(source = "titulo.classe.valor", target = "valor")
	@Mapping(source = "titulo.classe.prazoDevolucao", target = "prazoDevolucao")
	ItemListDTO toListDto(Item entity);
}

