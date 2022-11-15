package br.com.ifes.videolocadora.service.web.rest;


import br.com.ifes.videolocadora.service.service.LocacaoService;
import br.com.ifes.videolocadora.service.service.dto.ConcluirLocacaoDTO;
import br.com.ifes.videolocadora.service.service.dto.LocacaoDTO;
import br.com.ifes.videolocadora.service.service.dto.LocacaoListDTO;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/locacao")
@RequiredArgsConstructor
@Slf4j
public class LocacaoResource {
	private final LocacaoService servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<LocacaoDTO> obter(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<LocacaoDTO> salvar(@RequestBody LocacaoDTO dto) {
		return ResponseEntity.ok().body(servico.inserir(dto));
	}

	@GetMapping
	@Timed
	public ResponseEntity<List<LocacaoListDTO>> obterTodos() {
		return ResponseEntity.ok().body(servico.obterTodos());
	}

	@PutMapping("/{id}")
	@Timed
	public ResponseEntity<LocacaoDTO> alterar(@PathVariable Long id, @RequestBody LocacaoDTO dto) {
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
	public ResponseEntity<Page<LocacaoListDTO>> filtro(@RequestBody LocacaoListDTO dto, Pageable page) {
		return ResponseEntity.ok().body(servico.filtrar(dto, page));
	}

	@PatchMapping("/devolver")
	@Timed
	public ResponseEntity<Void> devolver(@RequestBody ConcluirLocacaoDTO dto) {
		servico.devolver(dto);
		return ResponseEntity.noContent().build();
	}

}

