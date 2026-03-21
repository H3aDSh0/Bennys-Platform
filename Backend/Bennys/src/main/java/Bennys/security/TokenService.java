package Bennys.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.time.temporal.ChronoUnit;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import Bennys.entity.utilizador.Utilizador;

@Service
public class TokenService {
	
    @Value("${api.security.token.secret}")
    private String secret;
    
	/*public String generateToken(Utilizador Utilizador){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()	
                    .withIssuer("auth-api")
                    .withSubject(Utilizador.getUsername())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }*/
    //alterei para user details
    
    public String generateToken(UserDetails userDetails) {
        try {
            //System.out.println(genExpirationDate());

            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(userDetails.getUsername())
                    .withExpiresAt(genExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating token", exception);
        }
    }

   /*public String validateToken(String token){
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            return "";
        }
    }*/
    
    public String validateToken(String token) {
        try {
        	
            Algorithm algorithm = Algorithm.HMAC256(secret);
            DecodedJWT jwt = JWT.require(algorithm)
                    .withIssuer("auth-api")
                    .build()
                    .verify(token);
            //System.out.println("token:" + jwt.getExpiresAt() );
            // Verifica se o token está expirado
            if (jwt.getExpiresAt().toInstant().isBefore(Instant.now())) {
            	System.out.println("token expirado:" + token );
                return ""; // Token expirado, retorna uma string vazia
            }

            // Retorna Subject
            return jwt.getSubject();
        } catch (JWTVerificationException exception){
            return ""; // Token inválido
        }
    }

    
    

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.UTC);
    }
    
    private Instant genShortExpirationDate() {
        LocalDateTime expirationDateTime = LocalDateTime.now(ZoneOffset.UTC).plusMinutes(10);
        return expirationDateTime.toInstant(ZoneOffset.UTC);
    }

    
    public String generateShortToken(UserDetails userDetails) {
        try {
            //System.out.println(genShortExpirationDate()); // Apenas para debug, para verificar se a data de expiração está correta
            Algorithm algorithm = Algorithm.HMAC256(secret);
            String token = JWT.create()
                    .withIssuer("auth-api")
                    .withSubject(userDetails.getUsername())
                    .withExpiresAt(genShortExpirationDate())
                    .sign(algorithm);
            return token;
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Error while generating short token", exception);
        }
    }
    
    

	
}
