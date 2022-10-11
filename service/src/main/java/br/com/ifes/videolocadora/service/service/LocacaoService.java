package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Locacao;
import br.com.ifes.videolocadora.service.repository.LocacaoRepository;
import br.com.ifes.videolocadora.service.service.dto.LocacaoDTO;
import br.com.ifes.videolocadora.service.service.mapper.LocacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocacaoService {

	private final LocacaoRepository repositorio;
	private final LocacaoMapper mapper;

	public Locacao procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Locação não encontrada"));
	}

	public LocacaoDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public LocacaoDTO salvar(LocacaoDTO dto) {
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
