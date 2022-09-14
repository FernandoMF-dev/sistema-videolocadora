package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Titulo;
import br.com.ifes.videolocadora.service.repositorio.TituloRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.TituloDTO;
import br.com.ifes.videolocadora.service.servico.mapper.TituloMapper;
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
