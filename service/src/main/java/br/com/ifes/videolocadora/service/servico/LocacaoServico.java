package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Locacao;
import br.com.ifes.videolocadora.service.repositorio.LocacaoRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.LocacaoDTO;
import br.com.ifes.videolocadora.service.servico.mapper.LocacaoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocacaoServico {

	private final LocacaoRepositorio repositorio;
	private final LocacaoMapper mapper;

	public Locacao procurarPorId(Long id){
		return repositorio.findById(id).orElseThrow(RuntimeException::new);
	}

	public LocacaoDTO obterPorId(Long id){
		return mapper.toDto(procurarPorId(id));
	}

	public LocacaoDTO salvar(LocacaoDTO dto){
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
