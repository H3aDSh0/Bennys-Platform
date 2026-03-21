package Bennys.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public record AuthResponseDTO(String token,String username,Collection<? extends GrantedAuthority> authorities) {

    public AuthResponseDTO() {
        this(null, null, null); // Valores padrão para token, username e authorities
    }

    // Construtor adicional para fornecer valores padrão
    public AuthResponseDTO(String token, String username, Collection<? extends GrantedAuthority> authorities) {
        this.token = token;
        this.username = username;
        this.authorities = authorities;
    }
}
