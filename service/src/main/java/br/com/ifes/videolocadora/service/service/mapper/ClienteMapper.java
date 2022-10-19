package br.com.ifes.videolocadora.service.service.mapper;

import br.com.ifes.videolocadora.service.domain.entity.Cliente;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente> {

	@AfterMapping
	static void resolveExcluido(@MappingTarget ClienteDTO dto, Cliente entity) {
		dto.setAtivo(!entity.getExcluido());
	}

	@AfterMapping
	static void resolveExcluido(@MappingTarget Cliente entity, ClienteDTO dto) {
		entity.setExcluido(!dto.getAtivo());
	}

}

