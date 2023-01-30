package br.com.ifes.videolocadora.service.web.rest;

import br.com.ifes.videolocadora.service.service.LoginService;
import br.com.ifes.videolocadora.service.service.dto.LoginDTO;
import io.micrometer.core.annotation.Timed;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.security.sasl.AuthenticationException;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
@Slf4j
public class LoginResource {
	private final LoginService servico;

	@PostMapping("/cadastro")
	@Timed
	public ResponseEntity<LoginDTO> cadastrar(@RequestBody @Valid LoginDTO dto) {
		return new ResponseEntity<>(servico.inserirCadastro(dto), HttpStatus.CREATED);
	}

	@PostMapping("/sessao")
	@Timed
	public ResponseEntity<Object> iniciarSessao(@RequestBody @Valid LoginDTO dto) throws AuthenticationException {
		return new ResponseEntity<>(servico.iniciarSessao(dto), HttpStatus.CREATED);
	}

	@DeleteMapping("/sessao")
	@Timed
	public ResponseEntity<Void> encerrarSessao(@RequestParam String token) {
		return ResponseEntity.noContent().build();
	}

}
