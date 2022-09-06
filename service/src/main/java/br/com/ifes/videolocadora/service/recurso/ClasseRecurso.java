package br.com.ifes.videolocadora.service.recurso;


import br.com.ifes.videolocadora.service.servico.ClasseServico;
import br.com.ifes.videolocadora.service.servico.dto.ClasseDTO;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/classe")
@RequiredArgsConstructor
@Slf4j
public class ClasseRecurso {
	private final ClasseServico servico;

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
}

