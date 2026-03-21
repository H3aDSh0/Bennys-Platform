package Bennys.entity.administrador;


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
@Table(name = "Administrador")
public class Administrador implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Administrador")
    private Long id;

    @Column(name = "Nome", nullable = false)
    private String nome;

    @Column(name = "Email", unique = true, nullable = false)
    private String email;

    @Column(name = "Numero_Telemovel", unique = true, nullable = false)
    private String numeroTelemovel;

    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "CC", unique = true, nullable = false)
    private String cc;

    @Column(name = "Cargo", nullable = false)
    private String cargo;

    @Column(name = "Foto_Perfil")
    private String fotoPerfil;
    
    @Column(name = "Role", nullable = false, columnDefinition = "nvarchar(50) default 'Administrador'")
    private String role;
    
    @Column(name = "Data_Registo", nullable = false)
    private LocalDateTime dataRegisto;

	public Administrador(String nome, String email, String numeroTelemovel, String password, String cc,
			String cargo, String fotoPerfil, LocalDateTime dataRegisto) {
		this.nome = nome;
		this.email = email;
		this.numeroTelemovel = numeroTelemovel;
		this.password = password;
		this.cc = cc;
		this.cargo = cargo;
		this.fotoPerfil = fotoPerfil;
		this.role = "Administrador";
    	this.dataRegisto = dataRegisto;
	}
	
	public Administrador() {
	}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role));
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role + "_" + this.cargo));
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

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
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