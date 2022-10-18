package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Classe;
import br.com.ifes.videolocadora.service.repository.ClasseRepository;
import br.com.ifes.videolocadora.service.service.dto.ClasseDTO;
import br.com.ifes.videolocadora.service.service.mapper.ClasseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClasseService {

	private final ClasseRepository repositorio;
	private final ClasseMapper mapper;

	public Classe procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Classe não encontrada"));
	}

	public ClasseDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public ClasseDTO salvar(ClasseDTO dto) {
		Classe entity = mapper.toEntity(dto);
		entity.setExcluido(false);
		return mapper.toDto(repositorio.save(entity));
	}

	public Page<ClasseDTO> obterTodos(Pageable page) {
		return repositorio.findAllList(page);
	}

	public ClasseDTO editar(Long id, ClasseDTO dto) {
		procurarPorId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Classe entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<ClasseDTO> filtrar(ClasseDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}

}
