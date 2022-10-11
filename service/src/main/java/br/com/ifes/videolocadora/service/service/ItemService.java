package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Item;
import br.com.ifes.videolocadora.service.repository.ItemRepository;
import br.com.ifes.videolocadora.service.service.dto.ItemDTO;
import br.com.ifes.videolocadora.service.service.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

	private final ItemRepository repositorio;
	private final ItemMapper mapper;

	public Item procurarPorId(Long id) {
		return repositorio.findById(id)
				.orElseThrow(() -> new RuntimeException("Item não encontrado"));
	}

	public ItemDTO obterPorId(Long id) {
		return mapper.toDto(procurarPorId(id));
	}

	public ItemDTO salvar(ItemDTO dto) {
		return mapper.toDto(repositorio.save(mapper.toEntity(dto)));
	}
}
