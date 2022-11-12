package br.com.ifes.videolocadora.service.service;

import br.com.ifes.videolocadora.service.domain.entity.Cliente;
import br.com.ifes.videolocadora.service.domain.entity.SocioDependente;
import br.com.ifes.videolocadora.service.domain.enums.TipoClienteEnum;
import br.com.ifes.videolocadora.service.repository.ClienteRepository;
import br.com.ifes.videolocadora.service.repository.SocioDependenteRepository;
import br.com.ifes.videolocadora.service.service.dto.ClienteDTO;
import br.com.ifes.videolocadora.service.service.dto.TreeNodeDTO;
import br.com.ifes.videolocadora.service.service.mapper.ClienteMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class ClienteService {

	public static final int MAX_DEPENDENTES = 3;

	private final ClienteRepository repositorio;
	private final ClienteMapper mapper;

	private final SocioDependenteRepository socioDependenteRepository;

	public Cliente procurarPorId(Long id) {
		return repositorio.findById(id).orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
	}

	public ClienteDTO obterPorId(Long id) {
		ClienteDTO dto = mapper.toDto(procurarPorId(id));
		SocioDependente dependencia = socioDependenteRepository.findByIdDependente(id);

		if (Objects.nonNull(dependencia)) {
			dto.setIdResponsavel(dependencia.getIdDependente());
		}

		return dto;
	}

	public ClienteDTO inserir(ClienteDTO dto) {
		Long idResponsavel = dto.getIdResponsavel();

		dto.setId(null);
		dto.setNumeroInscricao(gerarNumeroInscricao());

		dto = salvar(dto);
		salvarResponsavel(dto.getId(), idResponsavel);

		return dto;
	}

	public Page<TreeNodeDTO> obterTodos(Pageable page) {
		return repositorio.findAllList(page);
	}

	public ClienteDTO editar(Long id, ClienteDTO dto) {
		procurarPorId(id);
		dto.setId(id);
		return salvar(dto);
	}

	public void deletar(Long id) {
		Cliente entity = procurarPorId(id);
		entity.setAtivo(false);
		entity.setExcluido(true);
		repositorio.save(entity);

		if (TipoClienteEnum.SOCIO.equals(entity.getTipoCliente())) {
			this.excluirDependente(entity.getId());
		}
	}

	public void patchAtivo(Long id, Boolean value) {
		Cliente entity = procurarPorId(id);
		entity.setAtivo(value);
		repositorio.save(entity);
	}

	public Page<TreeNodeDTO> filtrarSocioTree(ClienteDTO dto, Pageable pageable) {
		return repositorio.filtrarSocioTree(dto, pageable);
	}

	public List<TreeNodeDTO> buscarDependentesPorResponsavelTree(Long idResponsavel) {
		return repositorio.buscarDependentesPorResponsavelTree(idResponsavel);
	}

	private ClienteDTO salvar(ClienteDTO dto) {
		Cliente entity = mapper.toEntity(dto);
		entity.setExcluido(false);
		return mapper.toDto(repositorio.save(entity));
	}

	private Integer gerarNumeroInscricao() {
		String hoje = LocalDateTime.now().toString();
		hoje = hoje.replace("-", "");
		hoje = hoje.replace(":", "");
		hoje = hoje.replace("T", "");
		hoje = hoje.replace(".", "");
		hoje = hoje.substring(12, 21);
		return Integer.valueOf(hoje);
	}

	private void excluirDependente(Long idResponsavel) {
		List<Cliente> dependentes = buscarDependentesPorResponsavel(idResponsavel);
		dependentes.forEach(entity -> {
			entity.setAtivo(false);
			entity.setExcluido(true);
		});
		repositorio.saveAll(dependentes);
	}

	private List<Cliente> buscarDependentesPorResponsavel(Long idResponsavel) {
		return repositorio.buscarDependentesPorResponsavel(idResponsavel);
	}

	private void salvarResponsavel(Long idDependente, Long idResponsavel) {
		if (Objects.isNull(idDependente) || Objects.isNull(idResponsavel)) {
			return;
		}

		validarDependencia(idDependente, idResponsavel);

		socioDependenteRepository.save(new SocioDependente(idResponsavel, idDependente));
	}

	private void validarDependencia(Long idDependente, Long idResponsavel) {
		if (socioDependenteRepository.countDependentesExcept(idResponsavel, idDependente) >= MAX_DEPENDENTES) {
			throw new RuntimeException(String.format("Um sócio não pode ter mais do que %d dependentes vinculados.", MAX_DEPENDENTES));
		}
	}

}
