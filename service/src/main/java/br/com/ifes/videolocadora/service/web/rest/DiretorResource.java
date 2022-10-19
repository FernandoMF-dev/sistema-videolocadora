package br.com.ifes.videolocadora.service.web.rest;


import br.com.ifes.videolocadora.service.service.DiretorService;
import br.com.ifes.videolocadora.service.service.dto.DiretorDTO;
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
@RequestMapping("/api/diretor")
@RequiredArgsConstructor
@Slf4j
public class DiretorResource {
	private final DiretorService servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<DiretorDTO> obterPorId(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<DiretorDTO> salvar(@RequestBody DiretorDTO dto) {
		return ResponseEntity.ok().body(servico.salvar(dto));
	}

	@GetMapping()
	@Timed
	public ResponseEntity<List<DiretorDTO>> obterTodos() {
		return ResponseEntity.ok().body(servico.obterTodos());
	}

	@PutMapping("/{id}")
	@Timed
	public ResponseEntity<DiretorDTO> alterar(@PathVariable Long id, @RequestBody DiretorDTO dto) {
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
	public ResponseEntity<Page<DiretorDTO>> filtro(@RequestBody DiretorDTO dto, Pageable pageable) {
		return ResponseEntity.ok().body(servico.filtrar(dto, pageable));
	}

}

