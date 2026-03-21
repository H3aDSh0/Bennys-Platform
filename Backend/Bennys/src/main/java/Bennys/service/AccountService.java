package Bennys.service;

import java.io.IOException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import Bennys.entity.account.AccountUpdateDTO;
import Bennys.entity.administrador.Administrador;
import Bennys.entity.administrador.AdministradorRegisterDTO;
import Bennys.entity.administrador.AdministradorRepository;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteRegisterDTO;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRegisterDTO;
import Bennys.entity.utilizador.UtilizadorRepository;
import Bennys.util.Util;

@Service
public class AccountService {

	@Autowired
	private AutenticacaoService autenticacaoService;

	@Autowired
	private UtilizadorRepository utilizadorRepository;

	@Autowired
	private FabricanteRepository fabricanteRepository;

	@Autowired
	private AdministradorRepository administradorRepository;

	@Autowired
	private EmailService emailService;

	public ResponseEntity<?> getProfile() {

		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			if (authentication != null && authentication.isAuthenticated()) {
				String email = authentication.getName();
				System.out.println("Get Profile do" + email);

				if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
					Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
					if (administrador != null) {
						// Criar método para mapear administrador para DTO
						AdministradorRegisterDTO adminDTO = mapAdministradorToDTO(administrador);
						return ResponseEntity.ok().body(adminDTO);
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
					if (fabricante != null) {
						// Criar método para mapear fabricante para DTO
						FabricanteRegisterDTO fabricanteDTO = mapFabricanteToDTO(fabricante);
						return ResponseEntity.ok().body(fabricanteDTO);
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
					Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
					if (utilizador != null) {
						// Criar método para mapear utilizador para DTO
						UtilizadorRegisterDTO utilizadorDTO = mapUtilizadorToDTO(utilizador);
						return ResponseEntity.ok().body(utilizadorDTO);
					}
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("O utilizador não tem acesso ao perfil");
				}
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizador não autenticado");
		} catch (Exception e) {
			// Tratar o erro aqui
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao visualizar perfil : " + e.getMessage());
		}
	}

	public ResponseEntity<String> updateProfile(AccountUpdateDTO updateDTO) {
		System.out.println("Update ao perfil recebido:" + updateDTO);
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if (authentication != null && authentication.isAuthenticated()) {
				String email = authentication.getName();

				if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
					Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
					if (administrador != null) {
						// Atualizar os campos do administrador com base nos dados do DTO
						administrador = updateAdministradorFields(administrador, updateDTO);
						administradorRepository.save(administrador);
						return ResponseEntity.ok().body("Perfil do administrador atualizado com sucesso.");
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
					if (fabricante != null) {
						// Atualizar os campos do fabricante com base nos dados do DTO
						fabricante = updateFabricanteFields(fabricante, updateDTO);
						fabricanteRepository.save(fabricante);
						return ResponseEntity.ok().body("Perfil do fabricante atualizado com sucesso.");
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
					Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
					if (utilizador != null) {
						// Atualizar os campos do utilizador com base nos dados do DTO
						utilizador = updateUtilizadorFields(utilizador, updateDTO);
						utilizadorRepository.save(utilizador);
						return ResponseEntity.ok().body("Perfil do utilizador atualizado com sucesso.");
					}
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Utilizador não autorizado.");
				}
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizador não autenticado");
		} catch (Exception e) {
			// Tratar o erro aqui
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao atualizar perfil : " + e.getMessage());
		}
	}

	private AdministradorRegisterDTO mapAdministradorToDTO(Administrador administrador) {
		AdministradorRegisterDTO adminDTO = new AdministradorRegisterDTO(administrador.getNome(),
				administrador.getEmail(), administrador.getNumeroTelemovel(), administrador.getPassword(),
				administrador.getCc(), administrador.getCargo(), administrador.getFotoPerfil());
		return adminDTO;
	}

	private FabricanteRegisterDTO mapFabricanteToDTO(Fabricante fabricante) {
		FabricanteRegisterDTO fabricanteDTO = new FabricanteRegisterDTO(fabricante.getNome(), fabricante.getEmail(),
				fabricante.getNumeroTelemovel(), fabricante.getPassword(), fabricante.getNif(), fabricante.getSede(),
				fabricante.getPais(), fabricante.getDescricao(), fabricante.getPortfolioVeiculos(),
				fabricante.getDocumentacaoCertificacao(), fabricante.getFotoPerfil());
		return fabricanteDTO;
	}

	private UtilizadorRegisterDTO mapUtilizadorToDTO(Utilizador utilizador) {
		UtilizadorRegisterDTO utilizadorDTO = new UtilizadorRegisterDTO(utilizador.getNome(), utilizador.getEmail(),
				utilizador.getNumeroTelemovel(), utilizador.getCc(), utilizador.getNif(),
				utilizador.getDataNascimento().toString(), utilizador.getMorada(), utilizador.getPassword(),
				utilizador.getFotoPerfil());
		return utilizadorDTO;
	}

	private Administrador updateAdministradorFields(Administrador administrador, AccountUpdateDTO updateDTO) {
		// String encryptedPassword =
		// Util.criptografarPassword(updateDTO.getPassword());

		administrador.setNome(updateDTO.getNome());
		administrador.setNumeroTelemovel(updateDTO.getNumeroTelemovel());
		administrador.setFotoPerfil(updateDTO.getFotoPerfil());

		return administrador;
	}

	private Fabricante updateFabricanteFields(Fabricante fabricante, AccountUpdateDTO updateDTO) {
		// String encryptedPassword =
		// Util.criptografarPassword(updateDTO.getPassword());

		// Atualizar os campos do fabricante com base nos dados do DTO
		fabricante.setNome(updateDTO.getNome());
		fabricante.setNumeroTelemovel(updateDTO.getNumeroTelemovel());
		fabricante.setSede(updateDTO.getSede());
		fabricante.setPais(updateDTO.getPais());
		fabricante.setDescricao(updateDTO.getDescricao());
		fabricante.setPortfolioVeiculos(updateDTO.getPortfolioVeiculos());
		fabricante.setDocumentacaoCertificacao(updateDTO.getDocumentacaoCertificacao());
		fabricante.setFotoPerfil(updateDTO.getFotoPerfil());

		return fabricante;
	}

	private Utilizador updateUtilizadorFields(Utilizador utilizador, AccountUpdateDTO updateDTO) {
		// String encryptedPassword =
		// Util.criptografarPassword(updateDTO.getPassword());
		// Atualizar os campos do utilizador com base nos dados do DTO
		utilizador.setNome(updateDTO.getNome());
		utilizador.setNumeroTelemovel(updateDTO.getNumeroTelemovel());
		utilizador.setDataNascimento(LocalDate.parse(updateDTO.getDataNascimento()));
		utilizador.setMorada(updateDTO.getMorada());
		utilizador.setFotoPerfil(updateDTO.getFotoPerfil());

		return utilizador;
	}

	public String deleteProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.isAuthenticated()) {
			String email = authentication.getName();

			try {
				if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
					Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
					if (administrador != null) {
						administradorRepository.delete(administrador);
						return "Perfil do administrador excluído com sucesso!";
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
					if (fabricante != null) {
						fabricanteRepository.delete(fabricante);
						return "Perfil do fabricante excluído com sucesso!";
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
					Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
					if (utilizador != null) {
						utilizadorRepository.delete(utilizador);
						return "Perfil do utilizador excluído com sucesso!";
					}
				}
			} catch (Exception e) {
				return "Erro ao excluir o perfil: " + e.getMessage();
			}
		}

		return "Conta excluída com sucesso!";
	}

	public ResponseEntity<?> getProfilePhoto() {

		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			if (authentication != null && authentication.isAuthenticated()) {
				String email = authentication.getName();
				System.out.println("Get ProfilePhoto do" + email);
				String fotoPerfil = null;

				if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
					Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
					if (administrador != null) {
						fotoPerfil = administrador.getFotoPerfil();
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
					if (fabricante != null) {
						fotoPerfil = fabricante.getFotoPerfil();
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
					Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
					if (utilizador != null) {
						fotoPerfil = utilizador.getFotoPerfil();
					}
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("O utilizador não tem acesso ao perfil");
				}

				if (fotoPerfil != null) {
					return ResponseEntity.ok(fotoPerfil);
				} else {
					return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Foto de perfil não encontrada");
				}
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizador não autenticado");
		} catch (Exception e) {
			// Tratar o erro aqui
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao visualizar perfil : " + e.getMessage());
		}
	}

}
