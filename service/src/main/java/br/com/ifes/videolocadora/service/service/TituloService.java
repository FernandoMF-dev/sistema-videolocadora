package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Ator;
import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.domain.entity.TituloAtor;
import br.com.ifes.videolocadora.service.repository.TituloRepository;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import br.com.ifes.videolocadora.service.service.dto.TituloListDTO;
import br.com.ifes.videolocadora.service.service.dto.TituloListFilterDTO;
import br.com.ifes.videolocadora.service.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
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

	public TituloDTO inserir(TituloDTO dto) {
		dto.setId(null);
		return salvar(dto);
	}

	public Page<TituloListDTO> obterTodos(TituloListFilterDTO filter, Pageable page) {
		Page<TituloListDTO> tituloList = repositorio.filtrar(filter, page);
		List<Long> idTitulos = tituloList.stream().map(TituloListDTO::getId).collect(Collectors.toList());
		List<TituloAtor> relacaoList = repositorio.findAtorByTituloId(idTitulos);

		tituloList.getContent().forEach(titulo -> titulo.setAtoresNomes(relacaoList.stream()
				.filter(relacao -> Objects.equals(relacao.getIdTitulo(), titulo.getId()))
				.map(relacao -> relacao.getAtor().getNome())
				.collect(Collectors.joining(", "))));

		return tituloList;
	}

	public TituloDTO editar(Long id, TituloDTO dto) {
		procurarPorId(id);
		dto.setId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Titulo entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<TituloListDTO> filtrar(TituloListDTO filter, Pageable pageable) {
		return repositorio.filtrar(filter, pageable);
	}

	public Page<TituloDTO> filtrarSelect(TituloDTO filter, Pageable pageable) {
		return repositorio.filtrarSelect(filter, pageable);
	}

	private TituloDTO salvar(TituloDTO dto) {
		Titulo entity = mapper.toEntity(dto);
		List<Ator> atores = entity.getAtores();
		entity.setAtores(new ArrayList<>());
		entity.setExcluido(false);
		entity.getClasse().setExcluido(false);
		entity.getDiretor().setExcluido(false);
		entity = repositorio.save(entity);

		entity.setAtores(atores);
		entity.getAtores().forEach(ator -> ator.setExcluido(false));
		return mapper.toDto(repositorio.save(entity));
	}
}
