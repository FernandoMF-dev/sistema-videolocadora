package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Locacao;
import br.com.ifes.videolocadora.service.servico.dto.LocacaoDTO;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {})
public interface LocacaoMapper extends EntityMapper<LocacaoDTO, Locacao> {

	@Override
	@Mapping(source = "idItem", target = "item.id")
	@Mapping(source = "idCliente", target = "cliente.id")
	Locacao toEntity(LocacaoDTO dto);

	@Override
	@InheritInverseConfiguration
	LocacaoDTO toDto(Locacao entity);
}

