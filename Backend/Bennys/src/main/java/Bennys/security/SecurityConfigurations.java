package Bennys.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import Bennys.service.AdministradorService;
import Bennys.service.FabricanteService;
import Bennys.service.UtilizadorService;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
	
	
	@Autowired
    SecurityFilter securityFilter;
	
	@Autowired
    private UtilizadorService utilizadorService;

    @Autowired
    private FabricanteService fabricanteService;
    
    @Autowired
    private AdministradorService administradorService;
    

	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return  httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/administrador/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/utilizador/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/fabricante/register").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/requestMagicLink").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/validateMagicLink").authenticated()
                        .requestMatchers(HttpMethod.POST, "/auth/validateToken").authenticated()
                        .requestMatchers(HttpMethod.POST, "/upload").permitAll()
                        .requestMatchers(HttpMethod.POST, "/upload/carsPhotos").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/administrador/register").hasRole("Administrador_Principal")
                        .requestMatchers(HttpMethod.GET, "/admin/fabricantes/pendentes").hasRole("Administrador")
                        .requestMatchers(HttpMethod.POST, "/admin/fabricantes/aprovar").hasRole("Administrador")
                        .requestMatchers(HttpMethod.POST, "/admin/fabricantes/rejeitar").hasRole("Administrador")
                        .requestMatchers(HttpMethod.GET, "/account/profile").authenticated()
                        .requestMatchers(HttpMethod.GET, "/account/profile/photo").authenticated()
                        .requestMatchers(HttpMethod.POST, "/account/profile/update").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/account/profile/delete").authenticated()
                        .requestMatchers(HttpMethod.POST, "/account/forgotPassword").permitAll()
                        .requestMatchers(HttpMethod.POST, "/account/resetPassword").authenticated()
                        .requestMatchers(HttpMethod.POST, "/fabricante/adicionar-propostas").hasRole("Fabricante")
                        .requestMatchers(HttpMethod.GET, "/fabricante/visualizar-propostas").hasRole("Fabricante")
                        .requestMatchers(HttpMethod.GET, "/admin/fabricantes/propostas").hasRole("Administrador")
                        .requestMatchers(HttpMethod.POST, "/admin/fabricantes/propostas/aprovar").hasRole("Administrador")
                        .requestMatchers(HttpMethod.POST, "/admin/fabricantes/propostas/rejeitar").hasRole("Administrador")
                        .requestMatchers(HttpMethod.POST, "/veiculo/disponibilidade").hasAnyRole("Fabricante", "Utilizador")
                        .requestMatchers(HttpMethod.POST, "/veiculo/editar/disponibilidade").hasAnyRole("Fabricante", "Utilizador")
                        .requestMatchers(HttpMethod.POST, "/veiculo/remover/disponibilidade").hasAnyRole("Fabricante", "Utilizador")
                        .requestMatchers(HttpMethod.POST, "/veiculo/comprar").hasRole("Utilizador")
                        .requestMatchers(HttpMethod.GET, "/veiculo/disponiveis").permitAll()
                        .requestMatchers(HttpMethod.GET, "/veiculo/garagem").hasAnyRole("Fabricante", "Utilizador")
                        .anyRequest().denyAll()
                )
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
	/*
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
*/
	
	@Bean
    public AuthenticationProvider utilizadorAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(utilizadorService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationProvider fabricanteAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(fabricanteService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    
    @Bean
    public AuthenticationProvider administradorAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(administradorService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
