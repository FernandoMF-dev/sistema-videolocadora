package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Cliente;
import br.com.ifes.videolocadora.service.repository.ClienteRepository;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import br.com.ifes.videolocadora.service.service.mapper.ClienteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClienteService {

	private final ClienteRepository repositorio;
	private final ClienteMapper mapper;

	public Cliente procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
	}

	public ClienteDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public ClienteDTO salvar(ClienteDTO dto) {
		Cliente entity = mapper.toEntity(dto);
		entity.setExcluido(false);
		return mapper.toDto(repositorio.save(entity));
	}

	public Page<ClienteDTO> obterTodos(Pageable page) {
		return repositorio.findAllList(page);
	}

	public ClienteDTO editar(Long id, ClienteDTO dto) {
		procurarPorId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Cliente entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<ClienteDTO> filtrar(ClienteDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}

}
