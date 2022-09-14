package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.repositorio.AtorRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.mapper.AtorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AtorServico {

	private final AtorRepositorio repositorio;
	private final AtorMapper mapper;

	public Ator procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Ator não encontrado"));
	}

	public AtorDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public AtorDTO salvar(AtorDTO dto) {
		dto.setExcluido(false);
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}

	public Page<AtorDTO> obterTodos(Pageable page) {
		return repositorio.findAllList(page);
	}

	public AtorDTO editar(Long id, AtorDTO dto) {
		procurarPorId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Ator entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<AtorDTO> filtrar(AtorDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}
}
