package br.com.ifes.videolocadora.service.recurso;


import br.com.ifes.videolocadora.service.servico.ClienteServico;
import br.com.ifes.videolocadora.service.servico.dto.ClienteDTO;
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
@RequestMapping("/api/cliente")
@RequiredArgsConstructor
@Slf4j
public class ClienteRecurso {
	private final ClienteServico servico;

	@GetMapping("/{id}")
	@Timed
	public ResponseEntity<ClienteDTO> obter(@PathVariable Long id) {
		return ResponseEntity.ok().body(servico.obterPorId(id));
	}

	@PostMapping()
	@Timed
	public ResponseEntity<ClienteDTO> salvar(@RequestBody ClienteDTO dto) {
		return ResponseEntity.ok().body(servico.salvar(dto));
	}
}

