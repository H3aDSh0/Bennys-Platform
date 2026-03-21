package Bennys.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

import com.google.gson.Gson;

import Bennys.entity.account.EmailRequestDTO;
import Bennys.entity.administrador.Administrador;
import Bennys.entity.administrador.AdministradorRegisterDTO;
import Bennys.entity.administrador.AdministradorRepository;
import Bennys.entity.autenticacao.LoginRequestDTO;
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
@RequestMapping("auth")
public class AutenticacaoController {

	@Autowired
	private Gson gson;

	@Autowired
	private AuthenticationProvider utilizadorAuthenticationProvider;

	@Autowired
	private AuthenticationProvider fabricanteAuthenticationProvider;

	@Autowired
	private AuthenticationProvider administradorAuthenticationProvider;

	@Autowired
	private UtilizadorRepository utilizadorRepository;

	@Autowired
	private FabricanteRepository fabricanteRepository;

	@Autowired
	private AdministradorRepository administradorRepository;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private EmailService emailService;

	@Autowired
	private AutenticacaoService autenticacaoService;

	@Autowired
	private AccountService accountService;

	// Login dos Utilizadores
	@PostMapping("/utilizador/login")
	public ResponseEntity utilizadorLogin(@RequestBody @Validated LoginRequestDTO data) {
		System.out.println("\nRecebido(json body):" + data);

		try {
			var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
			var auth = this.utilizadorAuthenticationProvider.authenticate(usernamePassword);

			// System.out.println(usernamePassword +" : " + auth);

			// Autenticação bem-sucedida, retorna um token de autenticação JWT

			UserDetails userDetails = (UserDetails) auth.getPrincipal();
			String token = tokenService.generateToken(userDetails);

			// Retornar o token JWT como parte da resposta
			return ResponseEntity.ok()
					.body(new AuthResponseDTO(token, userDetails.getUsername(), userDetails.getAuthorities()));
		} catch (AuthenticationException e) {
			// Autenticação falhou, retorne uma resposta de erro
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação: " + e.getMessage());
		}
	}

	// Login dos Fabricantes
	@PostMapping("/fabricante/login")
	public ResponseEntity fabricanteLogin(@RequestBody @Validated LoginRequestDTO data) {
		try {
			var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
			var auth = this.fabricanteAuthenticationProvider.authenticate(usernamePassword);
			System.out.println("\nRecebido(json body):" + auth);

			// Autenticação bem-sucedida, retorna um token de autenticação JWT

			UserDetails userDetails = (UserDetails) auth.getPrincipal();
			String token = tokenService.generateToken(userDetails);

			// Retornar o token JWT como parte da resposta
			return ResponseEntity.ok()
					.body(new AuthResponseDTO(token, userDetails.getUsername(), userDetails.getAuthorities()));
		} catch (AuthenticationException e) {
			// Autenticação falhou, retorna uma resposta de erro
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação: " + e.getMessage());
		}
	}

	// Login dos Administradores
	@PostMapping("/administrador/login")
	public ResponseEntity AdministradorLogin(@RequestBody @Validated LoginRequestDTO data) throws IOException {
		System.out.println("\nRecebido Login dos Administradores  (json body):" + data);
		try {
			var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
			var auth = this.administradorAuthenticationProvider.authenticate(usernamePassword);
			System.out.println("\nRecebido(json body):" + auth);

			// Autenticação bem-sucedida, retorna um token de autenticação JWT

			UserDetails userDetails = (UserDetails) auth.getPrincipal();
			String token = tokenService.generateToken(userDetails);

			// emailService.sendEmail("pedromoisesmartins@gmail.com", "teste", "ok");

			// Retornar o token JWT como parte da resposta
			return ResponseEntity.ok()
					.body(new AuthResponseDTO(token, userDetails.getUsername(), userDetails.getAuthorities()));
		} catch (AuthenticationException e) {
			// Autenticação falhou, retorna uma resposta de erro
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação: " + e.getMessage());
		}
	}

	// Login dos Fabricantes & Utilizadores
	@PostMapping("/login")
	public ResponseEntity login(@RequestBody @Validated LoginRequestDTO data) {
		System.out.println("\nRecebido Login dos Fabricantes & Utilizadores  (json body):" + data);

		try {
			var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());
			Authentication auth = null;
			UserDetails userDetails = null;

			// Verifica se é um utilizador
			try {
				auth = this.utilizadorAuthenticationProvider.authenticate(usernamePassword);
				userDetails = (UserDetails) auth.getPrincipal();
			} catch (AuthenticationException e) {
				// Se não for um utilizador, tenta  como fabricante
				try {
					auth = this.fabricanteAuthenticationProvider.authenticate(usernamePassword);
					userDetails = (UserDetails) auth.getPrincipal();
					
					// Verifica se o fabricante está PENDENTE
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(userDetails.getUsername());
					if (fabricante.getStatus().equals("PENDENTE")) {
						// Se o fabricante estiver PENDENTE, retorne uma resposta indicando que o login não é permitido
						return ResponseEntity.status(HttpStatus.FORBIDDEN)
								.body("O seu registo ainda está pendente de aprovação");
					}
				} catch (AuthenticationException ex) {
					
					System.out.println("Falha na autenticação: " + ex.getMessage());

					return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
							.body("Credenciais incorretas. Por favor, verifique o seu login e palavra-passe.");
				}
			}

			// login bem-sucedida, retorna um token de autenticação JWT
			String token = tokenService.generateToken(userDetails);
			System.out.println("\nRecebido(json body):" + token);

			// Retornar o token JWT como parte da resposta
			return ResponseEntity.ok()
					.body(new AuthResponseDTO(token, userDetails.getUsername(), userDetails.getAuthorities()));
		} catch (AuthenticationException e) {
			// login falhou, retorne uma resposta de erro
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Falha na autenticação: " + e.getMessage());
		}
	}

	// Registo das Entidades

	@PostMapping("/utilizador/register")
	public ResponseEntity utilizadorRegister(@RequestBody @Validated UtilizadorRegisterDTO data) {
		System.out.println("\nRecebido Registo utilizador(json body):" + data);

		try {
			// Verifica se o utlizador ja esta registado na Plataforma
			if (utilizadorRepository.existsByEmail(data.email())) {
				return ResponseEntity.badRequest().body("O email fornecido já está registado na Plataforma.");
			} else {

				// Criptografar a palavra-passe
				String encryptedPassword = Util.criptografarPassword(data.password());

				// Converte a string para LocalDate
				LocalDate dataNascimento = Util.converterDataNascimento(data.dataNascimento(), gson);
				// LocalDate dataNascimento = gson.fromJson(data.dataNascimento(),
				// LocalDate.class);

				Utilizador newUser = new Utilizador(data.nome(), data.email(), data.numeroTelemovel(), data.cc(),
						data.nif(), dataNascimento, data.morada(), encryptedPassword, data.fotoPerfil(),
						LocalDateTime.now());
				newUser = this.utilizadorRepository.save(newUser);

				emailService.sendUtilizadoreEmail(data.email(), data.nome());
				
				return ResponseEntity.status(HttpStatus.CREATED).body("Utilizador Registado: " + newUser.getUsername());
			}
		} catch (DataIntegrityViolationException e) {
			// Erro de violação de integridade, como duplicação de chaves
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao registar o Utilizador na Plataforma: " + e.getMessage());
		} catch (Exception e) {
			// Outro erro inesperado
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro interno ao processar o registo do Utilizador: " + e.getMessage());
		}
	}

	@PostMapping("/administrador/register")
	public ResponseEntity administradorRegister(@RequestBody @Validated AdministradorRegisterDTO data) {
		System.out.println("\nRecebido Registo administrador (json body):" + data);

		try {
			// Verifica se o utlizador ja esta registado na Plataforma
			if (administradorRepository.existsByEmail(data.email())) {
				return ResponseEntity.badRequest().body("O email fornecido já está registado na Plataforma.");
			} else {

				// Criptografar a palavra-passe
				String encryptedPassword = Util.criptografarPassword(data.password());

				Administrador newUser = new Administrador(data.nome(), data.email(), data.numeroTelemovel(),
						encryptedPassword, data.cc(), data.cargo(), data.fotoPerfil(), LocalDateTime.now());
				newUser = this.administradorRepository.save(newUser);

				/* TODO Mandar email confirmar registo */

				return ResponseEntity.status(HttpStatus.CREATED)
						.body("Administrador Registado: " + newUser.getUsername());
			}
		} catch (DataIntegrityViolationException e) {
			// Erro de violação de integridade, como duplicação de chaves
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao registar o Administrador na Plataforma: " + e.getMessage());
		} catch (Exception e) {
			// Outro erro inesperado
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro interno ao processar o registo do Administrador: " + e.getMessage());
		}
	}

	@PostMapping("/fabricante/register")
	public ResponseEntity fabricanteRegister(@RequestBody @Validated FabricanteRegisterDTO data) {
		System.out.println("\nRecebido Registo Fabricante (json body):" + data);

		try {
			// Verifica se o utlizador ja esta registado na Plataforma
			if (fabricanteRepository.existsByEmail(data.email())) {
				return ResponseEntity.badRequest().body("O email fornecido já está registado na Plataforma.");
			} else {

				// Criptografar a palavra-passe
				String encryptedPassword = Util.criptografarPassword(data.password());

				Fabricante newUser = new Fabricante(data.nome(), data.email(), data.numeroTelemovel(),
						encryptedPassword, data.nif(), data.sede(), data.pais(), data.descricao(),
						data.portfolioVeiculos(), data.documentacaoCertificacao(), data.fotoPerfil(),
						LocalDateTime.now());
				newUser = this.fabricanteRepository.save(newUser);
				emailService.sendFabricanteEmail(data.email(), data.nome());


				return ResponseEntity.status(HttpStatus.CREATED).body("Fabricante Registado: " + newUser.getUsername());
			}
		} catch (DataIntegrityViolationException e) {
			// Erro de violação de integridade, como duplicação de chaves
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro ao registar o Fabricante na Plataforma: " + e.getMessage());
		} catch (Exception e) {
			// Outro erro inesperado
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Erro interno ao processar o registo do Fabricante: " + e.getMessage());
		}
	}

	@PostMapping("/requestMagicLink")
	public ResponseEntity<String> requestMagicLink(@RequestBody EmailRequestDTO emailRequest) {
		String email = emailRequest.getEmail();
		System.out.println("Magic Link" + email);

		Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
		if (administrador != null) {
			String token = tokenService.generateShortToken(administrador);
			String userName = administrador.getNome();
			try {
				emailService.sendMagicLinkEmail(email, token, userName);
				return ResponseEntity.ok().body("Link de login enviado com sucesso para o administrador " + email);
			} catch (IOException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Erro ao enviar o link de login para o administrador " + email + ": " + e.getMessage());
			}
		} else {

			Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
			if (fabricante != null) {
				String token = tokenService.generateShortToken(fabricante);
				String userName = fabricante.getNome();
				try {
					emailService.sendMagicLinkEmail(email, token, userName);
					return ResponseEntity.ok().body("Link de login enviado com sucesso para o fabricante " + email);
				} catch (IOException e) {
					return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
							.body("Erro ao enviar o link de login para o fabricante " + email + ": " + e.getMessage());
				}
			} else {
				Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
				if (utilizador != null) {
					String token = tokenService.generateShortToken(utilizador);
					String userName = utilizador.getNome();
					try {
						emailService.sendMagicLinkEmail(email, token, userName);
						System.out.println(token);
						;
						return ResponseEntity.ok().body("Link de login enviado com sucesso para o utilizador " + email);
					} catch (IOException e) {
						return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
								"Erro ao enviar o link de login para o utilizador " + email + ": " + e.getMessage());

					}
				} else {
					return ((BodyBuilder) ResponseEntity.notFound()).body("E-mail não encontrado na plataforma");
				}
			}
		}
	}

	@PostMapping("/validateMagicLink")
	public ResponseEntity<AuthResponseDTO> validateMagicLink() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			System.out.println("validateMagicLink " + authentication);

			if (authentication != null && authentication.isAuthenticated()) {
				String email = authentication.getName();

				if (autenticacaoService.hasRole(authentication, "ROLE_Administrador")) {
					Administrador administrador = (Administrador) administradorRepository.findByEmail(email);
					if (administrador != null) {
						String token = tokenService.generateToken(administrador);

						return ResponseEntity.ok().body(new AuthResponseDTO(token, administrador.getUsername(),
								administrador.getAuthorities()));
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Fabricante")) {
					Fabricante fabricante = (Fabricante) fabricanteRepository.findByEmail(email);
					if (fabricante != null) {
						String token = tokenService.generateToken(fabricante);

						return ResponseEntity.ok().body(
								new AuthResponseDTO(token, fabricante.getUsername(), fabricante.getAuthorities()));
					}
				} else if (autenticacaoService.hasRole(authentication, "ROLE_Utilizador")) {
					Utilizador utilizador = (Utilizador) utilizadorRepository.findByEmail(email);
					if (utilizador != null) {
						String token = tokenService.generateToken(utilizador);

						return ResponseEntity.ok().body(
								new AuthResponseDTO(token, utilizador.getUsername(), utilizador.getAuthorities()));
					}
				} else {
					return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new AuthResponseDTO());
				}
			}
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponseDTO());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new AuthResponseDTO());
		}
	}

	@PostMapping("/validateToken")
	public ResponseEntity<Boolean> validateToken() {
		System.out.println("validar token");
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			if (authentication != null && authentication.isAuthenticated()) {
				return ResponseEntity.ok().body(true);
			} else {
				return ResponseEntity.ok().body(false);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}

}
