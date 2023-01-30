package br.com.ifes.videolocadora.service.web.rest;

import br.com.ifes.videolocadora.service.service.AtorService;
import br.com.ifes.videolocadora.service.service.dto.AtorDTO;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/ator")
@RequiredArgsConstructor
@Slf4j
public class AtorResource {
	private final AtorService servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<AtorDTO> obter(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<AtorDTO> salvar(@RequestBody AtorDTO dto) {
		return new ResponseEntity<>(servico.salvar(dto), HttpStatus.CREATED);
	}

	@GetMapping()
	@Timed
	public ResponseEntity<List<AtorDTO>> obterTodos() {
		return ResponseEntity.ok().body(servico.obterTodos());
	}

	@PutMapping("/{id}")
	@Timed
	public ResponseEntity<AtorDTO> alterar(@PathVariable Long id, @RequestBody AtorDTO dto) {
		return ResponseEntity.ok().body(servico.editar(id, dto));
	}

	@DeleteMapping("/{id}")
	@Timed
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		servico.deletar(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/filtro")
	@Timed
	public ResponseEntity<Page<AtorDTO>> filtro(AtorDTO filter, Pageable pageable) {
		return ResponseEntity.ok().body(servico.filtrar(filter, pageable));
	}
}

