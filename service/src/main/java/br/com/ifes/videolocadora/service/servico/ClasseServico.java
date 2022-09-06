package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Classe;
import br.com.ifes.videolocadora.service.repositorio.ClasseRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.ClasseDTO;
import br.com.ifes.videolocadora.service.servico.mapper.ClasseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClasseServico {

	private final ClasseRepositorio repositorio;
	private final ClasseMapper mapper;

	public Classe procurarPorId(Long id){
		return repositorio.findById(id).orElseThrow(RuntimeException::new);
	}

	public ClasseDTO obterPorId(Long id){
		return mapper.toDto(procurarPorId(id));
	}

	public ClasseDTO salvar(ClasseDTO dto){
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
