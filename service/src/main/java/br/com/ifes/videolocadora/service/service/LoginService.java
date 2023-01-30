package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Login;
import br.com.ifes.videolocadora.service.repository.LoginRepository;
import br.com.ifes.videolocadora.service.service.dto.LoginDTO;
import br.com.ifes.videolocadora.service.service.mapper.LoginMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.security.sasl.AuthenticationException;
import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

	private final LoginRepository repositorio;
	private final LoginMapper mapper;

	private static final String DUMMY_TOKEN = "dummy-authentication-token";

	public Object iniciarSessao(LoginDTO dto) throws AuthenticationException {

		if (!repositorio.existsByUsernameAndPassword(dto.getUsername(), dto.getPassword())) {
			throw new AuthenticationException("Login e/ou senha inválidos!");
		}

		return new Object() {
			private final String token = DUMMY_TOKEN;

			public String getToken() {
				return token;
			}
		};
	}

	public LoginDTO inserirCadastro(LoginDTO dto) {
		dto.setId(null);
		if (repositorio.existsByUsername(dto.getUsername())) {
			throw new RuntimeException("Nome de usuário já está sendo usado!");
		}
		return salvarCadastro(dto);
	}

	public LoginDTO salvarCadastro(LoginDTO dto) {
		Login entity = mapper.toEntity(dto);
		return mapper.toDto(repositorio.save(entity));
	}

}
