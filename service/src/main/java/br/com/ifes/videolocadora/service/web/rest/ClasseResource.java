package br.com.ifes.videolocadora.service.web.rest;


import br.com.ifes.videolocadora.service.service.ClasseService;
import br.com.ifes.videolocadora.service.service.dto.ClasseDTO;
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

import java.util.List;

@RestController
@RequestMapping("/api/classe")
@RequiredArgsConstructor
@Slf4j
public class ClasseResource {
	private final ClasseService servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<ClasseDTO> obter(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<ClasseDTO> salvar(@RequestBody ClasseDTO dto) {
		return ResponseEntity.ok().body(servico.salvar(dto));
	}

	@GetMapping()
	@Timed
	public ResponseEntity<List<ClasseDTO>> obterTodos() {
		return ResponseEntity.ok().body(servico.obterTodos());
	}

	@PutMapping("/{id}")
	@Timed
	public ResponseEntity<ClasseDTO> alterar(@PathVariable Long id, @RequestBody ClasseDTO dto) {
		return ResponseEntity.ok().body(servico.editar(id, dto));
	}

	@DeleteMapping("/{id}")
	@Timed
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		servico.deletar(id);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/filtro")
	@Timed
	public ResponseEntity<Page<ClasseDTO>> filtro(@RequestBody ClasseDTO dto, Pageable pageable) {
		return ResponseEntity.ok().body(servico.filtrar(dto, pageable));
	}
}

