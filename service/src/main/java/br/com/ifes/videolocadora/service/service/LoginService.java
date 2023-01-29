package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.repository.LoginRepository;
import br.com.ifes.videolocadora.service.service.mapper.LoginMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {

	private final LoginRepository repositorio;
	private final LoginMapper mapper;

}
