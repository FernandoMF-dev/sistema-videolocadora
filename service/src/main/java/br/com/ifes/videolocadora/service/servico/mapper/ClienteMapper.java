package br.com.ifes.videolocadora.service.servico.mapper;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.dominio.Cliente;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.dto.ClienteDTO;

@Mapper(componentModel = "spring", uses = {})
public interface ClienteMapper extends EntityMapper<ClienteDTO, Cliente> {
}

