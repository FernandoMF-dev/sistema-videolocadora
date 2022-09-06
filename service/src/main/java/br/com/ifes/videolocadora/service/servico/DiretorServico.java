package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Diretor;
import br.com.ifes.videolocadora.service.repositorio.DiretorRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.DiretorDTO;
import br.com.ifes.videolocadora.service.servico.mapper.DiretorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiretorServico {

	private final DiretorRepositorio repositorio;
	private final DiretorMapper mapper;

	public Diretor procurarPorId(Long id){
		return repositorio.findById(id).orElseThrow(RuntimeException::new);
	}

	public DiretorDTO obterPorId(Long id){
		return mapper.toDto(procurarPorId(id));
	}

	public DiretorDTO salvar(DiretorDTO dto){
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
