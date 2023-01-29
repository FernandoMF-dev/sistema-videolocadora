package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Item;
import br.com.ifes.videolocadora.service.repository.ItemRepository;
import br.com.ifes.videolocadora.service.service.dto.ItemDTO;
import br.com.ifes.videolocadora.service.service.dto.ItemListDTO;
import br.com.ifes.videolocadora.service.service.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
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

	public ItemListDTO obterPorIdAsList(Long id) {
		return mapper.toListDto(procurarPorId(id));
	}

	public ItemDTO inserir(ItemDTO dto) {
		dto.setId(null);
		return salvar(dto);
	}

	public List<ItemListDTO> obterTodos() {
		return repositorio.findAllList();
	}

	public ItemDTO editar(Long id, ItemDTO dto) {
		procurarPorId(id);
		dto.setId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Item entity = procurarPorId(id);
		entity.setExcluido(true);
		repositorio.save(entity);
	}

	public Page<ItemListDTO> filtrar(ItemListDTO filter, Pageable page) {
		return repositorio.filtrar(filter, page);
	}

	public ItemDTO salvar(ItemDTO dto) {
		Item entity = mapper.toEntity(dto);
		entity.setExcluido(false);
		return mapper.toDto(repositorio.save(entity));
	}
}
