package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Titulo;
import br.com.ifes.videolocadora.service.repository.TituloRepositorio;
import br.com.ifes.videolocadora.service.service.dto.TituloDTO;
import br.com.ifes.videolocadora.service.service.mapper.TituloMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TituloServico {

	private final TituloRepositorio repositorio;
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
}
