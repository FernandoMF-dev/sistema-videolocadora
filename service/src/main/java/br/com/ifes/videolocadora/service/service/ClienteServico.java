package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Cliente;
import br.com.ifes.videolocadora.service.repository.ClienteRepositorio;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import br.com.ifes.videolocadora.service.service.mapper.ClienteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteServico {

	private final ClienteRepositorio repositorio;
	private final ClienteMapper mapper;

	public Cliente procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
	}

	public ClienteDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public ClienteDTO salvar(ClienteDTO dto) {
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}

}
