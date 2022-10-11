package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.repository.TituloRepository;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import br.com.ifes.videolocadora.service.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TituloService {

	private final TituloRepository repositorio;
	private final TituloMapper mapper;

	public Titulo procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Título não encontrado"));
	}

	public TituloDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public TituloDTO salvar(TituloDTO dto) {
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}

	public Page<TituloDTO> obterTodos(Pageable page) {
		return repositorio.findAllList(page);
	}

	public TituloDTO editar(Long id, TituloDTO dto) {
		procurarPorId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Titulo entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<TituloDTO> filtrar(TituloDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}
}
