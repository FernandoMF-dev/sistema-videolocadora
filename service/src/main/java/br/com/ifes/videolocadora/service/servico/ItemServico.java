package br.com.ifes.videolocadora.service.servico;

import br.com.ifes.videolocadora.service.dominio.Item;
import br.com.ifes.videolocadora.service.repositorio.ItemRepositorio;
import br.com.ifes.videolocadora.service.servico.dto.ItemDTO;
import br.com.ifes.videolocadora.service.servico.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemServico {

	private final ItemRepositorio repositorio;
	private final ItemMapper mapper;

	public Item procurarPorId(Long id){
		return repositorio.findById(id).orElseThrow(RuntimeException::new);
	}

	public ItemDTO obterPorId(Long id){
		return mapper.toDto(procurarPorId(id));
	}

	public ItemDTO salvar(ItemDTO dto){
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
