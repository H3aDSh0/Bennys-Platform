package Bennys.controller;

import java.io.IOException;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import Bennys.entity.account.AccountUpdateDTO;
import Bennys.entity.account.EmailRequestDTO;
import Bennys.entity.account.PalavraPasseRequestDTO;
import Bennys.entity.administrador.Administrador;
import Bennys.entity.administrador.AdministradorRegisterDTO;
import Bennys.entity.administrador.AdministradorRepository;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.fabricante.FabricanteRegisterDTO;
import Bennys.entity.fabricante.FabricanteRepository;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.utilizador.UtilizadorRegisterDTO;
import Bennys.entity.utilizador.UtilizadorRepository;
import Bennys.security.AuthResponseDTO;
import Bennys.security.TokenService;
import Bennys.service.AccountService;
import Bennys.service.AutenticacaoService;
import Bennys.service.EmailService;
import Bennys.util.Util;

@CrossOrigin("*")
@RestController
@RequestMapping("account")
public class AccountController {

	@Autowired
	private AutenticacaoService autenticacaoService;

	@Autowired
	private UtilizadorRepository utilizadorRepository;

	@Autowired
	private FabricanteRepository fabricanteRepository;

	@Autowired
	private AdministradorRepository administradorRepository;

	@Autowired
	private AccountService accountService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private TokenService tokenService;

	/*
	 * @GetMapping("/profile") public ResponseEntity<?> getProfile() {
	 * Authentication authentication =
	 * SecurityContextHolder.getContext().getAuthentication();
	 * 
	 * if (authentication != null && authentication.isAuthenticated()) { String
	 * email = authentication.getName();
	 * 
	 * if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
	 * Administrador administrador = (Administrador)
	 * administradorRepository.findByEmail(email);
	 * 
	 * AdministradorRegisterDTO adminDTO = new
	 * AdministradorRegisterDTO(administrador.getNome(), email,
	 * administrador.getNumeroTelemovel(), administrador.getPassword(),
	 * administrador.getCc(), administrador.getCargo(),
	 * administrador.getFotoPerfil());
	 * 
	 * 
	 * return ResponseEntity.ok().body(adminDTO); } else if
	 * (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) { Fabricante
	 * fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
	 * 
	 * FabricanteRegisterDTO fabricanteDTO = new
	 * FabricanteRegisterDTO(fabricante.getNome(), fabricante.getEmail(),
	 * fabricante.getNumeroTelemovel(), fabricante.getPassword(),
	 * fabricante.getNif(), fabricante.getSede(), fabricante.getPais(),
	 * fabricante.getDescricao(), fabricante.getPortfolioVeiculos(),
	 * fabricante.getDocumentacaoCertificacao(), fabricante.getFotoPerfil());
	 * 
	 * 
	 * return ResponseEntity.ok().body(fabricanteDTO); } else if
	 * (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) { Utilizador
	 * utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
	 * 
	 * UtilizadorRegisterDTO utilizadorDTO = new
	 * UtilizadorRegisterDTO(utilizador.getNome(), utilizador.getEmail(),
	 * utilizador.getNumeroTelemovel(), utilizador.getCc(), utilizador.getNif(),
	 * utilizador.getDataNascimento().toString(), utilizador.getMorada(),
	 * utilizador.getPassword(), utilizador.getFotoPerfil());
	 * 
	 * return ResponseEntity.ok().body(utilizadorDTO); } else { return
	 * ResponseEntity.status(HttpStatus.FORBIDDEN).
	 * body("O utilizador não tem acesso ao perfil"); } } else { return
	 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Autenticação falhou"); }
	 * }
	 * 
	 * 
	 * 
	 * @PostMapping("/profile/update") public ResponseEntity<String>
	 * updateProfile(@RequestBody AccountUpdateDTO updateDTO) { Authentication
	 * authentication = SecurityContextHolder.getContext().getAuthentication(); if
	 * (authentication != null && authentication.isAuthenticated()) { String email =
	 * authentication.getName();
	 * 
	 * if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
	 * Administrador administrador = (Administrador)
	 * administradorRepository.findByEmail(email); if (administrador != null) { //
	 * Atualizar os campos do administrador com base nos dados do DTO String
	 * encryptedPassword = Util.criptografarPassword(updateDTO.getPassword());
	 * 
	 * administrador.setNome(updateDTO.getNome());
	 * administrador.setEmail(updateDTO.getEmail());
	 * administrador.setNumeroTelemovel(updateDTO.getNumeroTelemovel());
	 * administrador.setPassword(encryptedPassword);
	 * administrador.setFotoPerfil(updateDTO.getFotoPerfil());
	 * 
	 * administradorRepository.save(administrador); return
	 * ResponseEntity.ok().body("Perfil do administrador atualizado com sucesso.");
	 * } else { return ResponseEntity.status(HttpStatus.NOT_FOUND).
	 * body("Administrador não encontrado."); } } else if
	 * (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) { Fabricante
	 * fabricante = (Fabricante) fabricanteRepository.findByEmail(email); if
	 * (fabricante != null) { String encryptedPassword =
	 * Util.criptografarPassword(updateDTO.getPassword());
	 * 
	 * // Atualizar os campos do fabricante com base nos dados do DTO
	 * fabricante.setNome(updateDTO.getNome());
	 * fabricante.setEmail(updateDTO.getEmail());
	 * fabricante.setNumeroTelemovel(updateDTO.getNumeroTelemovel());
	 * fabricante.setPassword(encryptedPassword);
	 * fabricante.setSede(updateDTO.getSede());
	 * fabricante.setPais(updateDTO.getPais());
	 * fabricante.setDescricao(updateDTO.getDescricao());
	 * fabricante.setPortfolioVeiculos(updateDTO.getPortfolioVeiculos());
	 * fabricante.setDocumentacaoCertificacao(updateDTO.getDocumentacaoCertificacao(
	 * )); fabricante.setFotoPerfil(updateDTO.getFotoPerfil());
	 * 
	 * fabricanteRepository.save(fabricante); return
	 * ResponseEntity.ok().body("Perfil do fabricante atualizado com sucesso."); }
	 * else { return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fabricante não encontrado."
	 * ); } } else if (autenticacaoService.hasRole(authentication,
	 * "ROLE_Utilizador")) { Utilizador utilizador = (Utilizador)
	 * utilizadorRepository.findByEmail(email); if (utilizador != null) { String
	 * encryptedPassword = Util.criptografarPassword(updateDTO.getPassword()); //
	 * Atualizar os campos do utilizador com base nos dados do DTO
	 * utilizador.setNome(updateDTO.getNome());
	 * utilizador.setEmail(updateDTO.getEmail());
	 * utilizador.setNumeroTelemovel(updateDTO.getNumeroTelemovel());
	 * utilizador.setDataNascimento(LocalDate.parse(updateDTO.getDataNascimento()));
	 * utilizador.setMorada(updateDTO.getMorada());
	 * utilizador.setPassword(encryptedPassword);
	 * utilizador.setFotoPerfil(updateDTO.getFotoPerfil());
	 * 
	 * 
	 * utilizadorRepository.save(utilizador); return
	 * ResponseEntity.ok().body("Perfil do utilizador atualizado com sucesso."); }
	 * else { return
	 * ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utilizador não encontrado."
	 * ); } } else { return
	 * ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso não autorizado."); }
	 * } else { return
	 * ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Autenticação falhou.");
	 * } }
	 */

	@GetMapping("/profile")
	public ResponseEntity<?> getProfile() {
		return accountService.getProfile();
	}

	@PostMapping("/profile/update")
	public ResponseEntity<String> updateProfile(@RequestBody AccountUpdateDTO updateDTO) {
		System.out.print(updateDTO);
		return accountService.updateProfile(updateDTO);
	}

	@DeleteMapping("/profile/delete")
	public ResponseEntity<String> deleteProfile() {
		String deletionMessage = accountService.deleteProfile();
		return ResponseEntity.ok(deletionMessage);
	}
	
	@GetMapping("/profile/photo")
	public ResponseEntity<?> getProfilePhoto() {
		return accountService.getProfilePhoto();
	}
	
	

	@PostMapping("/forgotPassword")
	public ResponseEntity<String> forgotPassword(@RequestBody EmailRequestDTO emailRequest) {
		String email = emailRequest.getEmail();
		System.out.println(email);

		Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
		if (administrador != null) {
			String token = tokenService.generateShortToken(administrador);
			String userName = administrador.getNome();
			try {
				emailService.sendPasswordResetEmail(email, token, userName);
				return ResponseEntity.ok()
						.body("E-mail de redefinição de senha enviado para o administrador com sucesso");
			} catch (IOException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Erro ao enviar e-mail de redefinição de senha para o administrador: " + e.getMessage());
			}
		} else {

			Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
			if (fabricante != null) {
				String token = tokenService.generateShortToken(fabricante);
				String userName = fabricante.getNome();
				try {
					emailService.sendPasswordResetEmail(email, token, userName);
					return ResponseEntity.ok()
							.body("E-mail de redefinição da palavra-passe enviado para o fabricante com sucesso ");
				} catch (IOException e) {
					// Logue a exceção ou retorne uma resposta de erro adequada
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.body("Erro ao enviar e-mail de redefinição da palavra-passe para o fabricante: "
									+ e.getMessage());
				}
			} else {
				Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
				if (utilizador != null) {
					String token = tokenService.generateShortToken(utilizador);
					String userName = utilizador.getNome();
					try {
						emailService.sendPasswordResetEmail(email, token, userName);
						System.out.println(token);
						;
						return ResponseEntity.ok()
								.body("E-mail de redefinição da palavra-passe enviado para o utilizador com sucesso");
					} catch (IOException e) {
						// Logue a exceção ou retorne uma resposta de erro adequada
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
								.body("Erro ao enviar e-mail de redefinição da palavra-passe para o utilizador: "
										+ e.getMessage());
					}
				} else {
					// E-mail não encontrado no sistema
					return ((BodyBuilder) ResponseEntity.notFound()).body("E-mail não encontrado na plataforma");
				}
			}
		}
	}

	@PostMapping("/resetPassword")
	public ResponseEntity<String> resetPassword(@RequestBody PalavraPasseRequestDTO data) {
		System.out.println("redefinir palavra passe " + data.getNovaPalavraPasse());
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			System.out.println("redefinir palavra passe " + authentication);

			if (authentication != null && authentication.isAuthenticated()) {
				String email = authentication.getName();
				String encryptedPassword = Util.criptografarPassword(data.getNovaPalavraPasse());

				if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
					Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
					if (administrador != null) {
						administrador.setPassword(encryptedPassword);
						administradorRepository.save(administrador);
						return ResponseEntity.ok("Palavra-Passe redefinida com sucesso.");
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
					if (fabricante != null) {
						fabricante.setPassword(encryptedPassword);
						fabricanteRepository.save(fabricante);
						return ResponseEntity.ok("Palavra-Passe redefinida com sucesso.");
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
					Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
					if (utilizador != null) {
						utilizador.setPassword(encryptedPassword);
						utilizadorRepository.save(utilizador);
						return ResponseEntity.ok("Palavra-Passe redefinida com sucesso.");
					}
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Utilizador não autorizado.");
				}
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilizador não autenticado");
		} catch (Exception e) {
			// Tratar o erro aqui
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao redefinir palavra passe : " + e.getMessage());
		}
	}

}
