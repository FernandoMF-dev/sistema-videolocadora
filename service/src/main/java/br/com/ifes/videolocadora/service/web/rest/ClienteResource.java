package br.com.ifes.videolocadora.service.web.rest;


import br.com.ifes.videolocadora.service.service.ClienteService;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import br.com.ifes.videolocadora.service.service.dto.TreeNodeDTO;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
		return ResponseEntity.ok().body(servico.inserir(dto));
	}

	@GetMapping("/filtro/socio")
	@Timed
	public ResponseEntity<Page<TreeNodeDTO>> filtrarSocioTree(ClienteDTO filtro, Pageable page) {
		return ResponseEntity.ok().body(servico.filtrarSocioTree(filtro, page));
	}

	@GetMapping("/dependente")
	@Timed
	public ResponseEntity<List<TreeNodeDTO>> buscarDependentesPorResponsavelTree(@RequestParam("idResponsavel") Long idResponsavel) {
		return ResponseEntity.ok().body(servico.buscarDependentesPorResponsavelTree(idResponsavel));
	}

	@PatchMapping("/{id}/ativo")
	@Timed
	public ResponseEntity<Void> patchAtivo(@PathVariable Long id, @RequestParam("value") Boolean value) {
		servico.patchAtivo(id, value);
		return ResponseEntity.ok().build();
	}


	@PutMapping("/{id}")
	@Timed
	public ResponseEntity<ClienteDTO> alterar(@PathVariable Long id, @RequestBody ClienteDTO dto) {
		return ResponseEntity.ok().body(servico.editar(id, dto));
	}

	@DeleteMapping("/{id}")
	@Timed
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
		servico.deletar(id);
		return ResponseEntity.noContent().build();
	}

}

