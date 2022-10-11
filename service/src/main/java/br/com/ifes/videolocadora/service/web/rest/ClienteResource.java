package br.com.ifes.videolocadora.service.web.rest;


import br.com.ifes.videolocadora.service.service.ClienteService;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
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
public class ClienteResource {
	private final ClienteService servico;

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

