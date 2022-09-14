package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Diretor;
import br.com.ifes.videolocadora.service.repositorio.DiretorRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.DiretorDTO;
import br.com.ifes.videolocadora.service.servico.mapper.DiretorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiretorServico {

	private final DiretorRepositorio repositorio;
	private final DiretorMapper mapper;

	public Diretor procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Diretor não encontrado"));
	}

	public DiretorDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public DiretorDTO salvar(DiretorDTO dto) {
		dto.setExcluido(false);
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}

	public Page<DiretorDTO> obterTodos(Pageable page) {
		return repositorio.findAllList(page);
	}

	public DiretorDTO editar(Long id, DiretorDTO dto) {
		procurarPorId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Diretor entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<DiretorDTO> filtrar(DiretorDTO dto, Pageable pageable) {
		return repositorio.filtrar(dto, pageable);
	}

}
