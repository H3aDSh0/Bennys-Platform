package Bennys.entity.utilizador;

import java.time.LocalDate;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Utilizador")
public class Utilizador implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Utilizador")
    private Long id;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "Numero_Telemovel", unique = true)
    private String numeroTelemovel;

    @Column(name = "CC", unique = true, nullable = false)
    private String cc;

    @Column(name = "NIF", unique = true, nullable = false)
    private String nif;

    @Column(name = "Data_Nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(name = "Morada", nullable = false, length = 255)
    private String morada;

    @Column(name = "Password", nullable = false, length = 50)
    private String password;

    @Column(name = "Foto_Perfil")
    private String fotoPerfil;
    
    @Column(name = "Role", nullable = false, columnDefinition = "nvarchar(50) default 'Utilizador'")
    private String role;

    @Column(name = "Data_Registo", nullable = false)
    private LocalDateTime dataRegisto;
    
    public Utilizador(String nome, String email, String numeroTelemovel, String cc, String nif, LocalDate dataNascimento,
    		String morada, String password,String fotoPerfil,LocalDateTime dataRegisto){
    	this.nome = nome;
    	this.email = email;
    	this.numeroTelemovel = numeroTelemovel;
    	this.cc = cc;
    	this.nif = nif;
    	this.dataNascimento = dataNascimento;
    	this.morada = morada;
    	this.password = password;
    	this.fotoPerfil = fotoPerfil;
    	this.role = "Utilizador";
    	this.dataRegisto = dataRegisto;
    }
    
    public Utilizador(){
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role));
        return authorities;
    }


	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
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

	public String getCc() {
		return cc;
	}

	public void setCc(String cc) {
		this.cc = cc;
	}

	public String getNif() {
		return nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getMorada() {
		return morada;
	}

	public void setMorada(String morada) {
		this.morada = morada;
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

	public LocalDateTime getDataRegisto() {
		return dataRegisto;
	}

	public void setDataRegisto(LocalDateTime dataRegisto) {
		this.dataRegisto = dataRegisto;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
}