package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Ator;
import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.repository.TituloRepository;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import br.com.ifes.videolocadora.service.service.dto.TituloListDTO;
import br.com.ifes.videolocadora.service.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TituloService {

	private final TituloRepository repositorio;
	private final TituloMapper mapper;

	public Titulo procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Título não encontrado"));
	}

	@Transactional
	public TituloDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	//TODO: relacionamento ta full bugado, ajeitar isso
	public TituloDTO salvar(TituloDTO dto) {
		Titulo entity = mapper.toEntity(dto);
		List<Ator> atores = entity.getAtores();
		entity.setAtores(new ArrayList<>());
		entity.setExcluido(false);
		entity.getClasse().setExcluido(false);
		entity.getDiretor().setExcluido(false);
		Titulo savedEntity = repositorio.save(entity);
		savedEntity.setAtores(atores);
		savedEntity.getAtores().forEach(ator -> {
			ator.setExcluido(false);
		});
		return mapper.toDto(repositorio.save(savedEntity));
	}

	public Page<TituloListDTO> obterTodos(Pageable page) {
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

	public Page<TituloListDTO> filtrar(TituloListDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}
}
