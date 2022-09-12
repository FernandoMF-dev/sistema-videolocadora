package br.com.ifes.videolocadora.service.recurso;


import br.com.ifes.videolocadora.service.servico.AtorServico;
import br.com.ifes.videolocadora.service.servico.dto.AtorDTO;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/ator")
@RequiredArgsConstructor
@Slf4j
public class AtorRecurso {
	private final AtorServico servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<AtorDTO> obter(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<AtorDTO> salvar(@RequestBody AtorDTO dto) {
		return ResponseEntity.ok().body(servico.salvar(dto));
	}

	@GetMapping()
	@Timed
	public  ResponseEntity<Page<AtorDTO>> obterTodos (Pageable page){
		return ResponseEntity.ok().body(servico.obterTodos(page));
	}

	@PutMapping("/{id}")
	@Timed
	public  ResponseEntity<AtorDTO> alterar (@PathVariable Long id,@RequestBody AtorDTO dto){
		return ResponseEntity.ok().body(servico.editar(id, dto));
	}

	@DeleteMapping("/{id}")
	@Timed
	public  ResponseEntity<Void> deletar (@PathVariable Long id){
		servico.deletar(id);
		return ResponseEntity.noContent().build();
	}
}

