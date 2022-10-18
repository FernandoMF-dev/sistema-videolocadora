package br.com.ifes.videolocadora.service.web.rest;


import br.com.ifes.videolocadora.service.service.ItemService;
import br.com.ifes.videolocadora.service.service.dto.ItemDTO;
import br.com.ifes.videolocadora.service.service.dto.ItemListDTO;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/item")
@RequiredArgsConstructor
@Slf4j
public class ItemResource {
	private final ItemService servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<ItemDTO> obter(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<ItemDTO> salvar(@RequestBody ItemDTO dto) {
		return ResponseEntity.ok().body(servico.salvar(dto));
	}

	@GetMapping()
	public ResponseEntity<Page<ItemListDTO>> obterTodos(Pageable page) {
		return ResponseEntity.ok().body(servico.obterTodos(page));
	}

	@PostMapping("/filtro")
	@Timed
	public ResponseEntity<Page<ItemListDTO>> filtro(@RequestBody ItemListDTO dto, Pageable page) {
		return ResponseEntity.ok().body(servico.filtrar(dto, page));
	}

	@PutMapping("/{id}")
	@Timed
	public ResponseEntity<ItemDTO> alterar(@PathVariable Long id, @RequestBody ItemDTO dto) {
		return ResponseEntity.ok().body(servico.editar(id, dto));
	}

	@DeleteMapping("/{id}")
	@Timed
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		servico.deletar(id);
		return ResponseEntity.noContent().build();
	}

}

