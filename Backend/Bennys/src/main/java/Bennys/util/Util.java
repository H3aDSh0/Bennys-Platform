package Bennys.util;



import java.time.LocalDate;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.google.gson.Gson;


public class Util {

	public static LocalDate converterDataNascimento(String dataNascimento, Gson gson) {
        return gson.fromJson(dataNascimento, LocalDate.class);
    }
	
	public static String converter(LocalDate data, Gson gson) {
	    return gson.toJson(data);
	}
	
    public static String criptografarPassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }
}
