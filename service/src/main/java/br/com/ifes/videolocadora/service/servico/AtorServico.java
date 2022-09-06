package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Ator;
import br.com.ifes.videolocadora.service.repositorio.AtorRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
import br.com.ifes.videolocadora.service.servico.mapper.AtorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AtorServico {

	private final AtorRepositorio repositorio;
	private final AtorMapper mapper;

	public Ator procurarPorId(Long id){
		return repositorio.findById(id).orElseThrow(RuntimeException::new);
	}

	public AtorDTO obterPorId(Long id){
		return mapper.toDto(procurarPorId(id));
	}

	public AtorDTO salvar(AtorDTO dto){
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
