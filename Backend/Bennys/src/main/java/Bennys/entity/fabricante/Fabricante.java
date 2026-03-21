package Bennys.entity.fabricante;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Fabricante")
public class Fabricante implements UserDetails {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Fabricante")
    private Long id;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "Numero_Telemovel", unique = true, nullable = false)
    private String numeroTelemovel;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "NIF", unique = true, nullable = false)
    private String nif;

    @Column(name = "Sede", nullable = false)
    private String sede;

    @Column(name = "Pais", nullable = false)
    private String pais;

    @Column(name = "Portfolio_Veiculos", columnDefinition = "TEXT")
    private String portfolioVeiculos;

    @Column(name = "Documentacao_Certificacao", columnDefinition = "TEXT")
    private String documentacaoCertificacao;

    @Column(name = "Foto_Perfil", nullable = false)
    private String fotoPerfil;
    
    @Column(name = "Role", nullable = false, columnDefinition = "nvarchar(50) default 'Fabricante'")
    private String role;
    
    @Column(name = "Descricao", columnDefinition = "TEXT") // Adicionando a coluna descricao
    private String descricao;
    
    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "Data_Registo", nullable = false)
    private LocalDateTime dataRegisto;
    

	public Fabricante(String nome, String email, String numeroTelemovel, String password, String nif, String sede,
			String pais, String descricao, String portfolioVeiculos, String documentacaoCertificacao, String fotoPerfil,
			LocalDateTime dataRegisto) {
		this.nome = nome;
		this.email = email;
		this.numeroTelemovel = numeroTelemovel;
		this.password = password;
		this.nif = nif;
		this.sede = sede;
		this.pais = pais;
		this.portfolioVeiculos = portfolioVeiculos;
		this.documentacaoCertificacao = documentacaoCertificacao;
		this.fotoPerfil = fotoPerfil;
		this.role = "Fabricante";
		this.descricao = descricao;
		this.status = "PENDENTE";
		this.dataRegisto = dataRegisto;
	}

	public Fabricante() {
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role));
        return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumeroTelemovel() {
		return numeroTelemovel;
	}

	public void setNumeroTelemovel(String numeroTelemovel) {
		this.numeroTelemovel = numeroTelemovel;
	}

	public String getNif() {
		return nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public String getSede() {
		return sede;
	}

	public void setSede(String sede) {
		this.sede = sede;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getPortfolioVeiculos() {
		return portfolioVeiculos;
	}

	public void setPortfolioVeiculos(String portfolioVeiculos) {
		this.portfolioVeiculos = portfolioVeiculos;
	}

	public String getDocumentacaoCertificacao() {
		return documentacaoCertificacao;
	}

	public void setDocumentacaoCertificacao(String documentacaoCertificacao) {
		this.documentacaoCertificacao = documentacaoCertificacao;
	}

	public String getFotoPerfil() {
		return fotoPerfil;
	}

	public void setFotoPerfil(String fotoPerfil) {
		this.fotoPerfil = fotoPerfil;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDateTime getDataRegisto() {
		return dataRegisto;
	}

	public void setDataRegisto(LocalDateTime dataRegisto) {
		this.dataRegisto = dataRegisto;
	}

	public String getStatus() {
		return status;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
	
    
}
