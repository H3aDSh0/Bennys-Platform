package Bennys.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("upload")
public class UploadController {
	
	/*@PostMapping(produces = "application/json")
    public ResponseEntity<Object> uploadFile(@RequestParam("fotoPerfil") MultipartFile file) {
        // Verificar se o arquivo está vazio
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O arquivo está vazio.");
        }
        // Diretório onde os arquivos serão salvos
        final String uploadDir = "C:/Users/Aluno/Desktop/Projects/Benny´sReact/bennys-app/public/assets/foto-perfil/";

        // Verificar se o diretório de upload existe, caso contrário, criar
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdir();
        }

        // Gerar um nome único para o arquivo usando UUID
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Construir o caminho completo do arquivo no diretório de upload
        String filePath = uploadDir + fileName;

        try {
            // Salvar o arquivo no diretório de upload
            file.transferTo(new File(filePath));

            // Criar um objeto JSON com o caminho do arquivo
            String jsonResponse = "{\"filePath\": \"" + filePath + "\"}";

            // Retornar o objeto JSON na resposta
            return ResponseEntity.ok(jsonResponse);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o arquivo.");
        }
    }*/
	
	@PostMapping(produces = "application/json")
    public ResponseEntity<Object> uploadFile(@RequestParam("fotoPerfil") MultipartFile file) {
		System.out.println("\nfoto de perfil guardada com sucesso");	
		
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: O arquivo está vazio.");
        }
        // Diretório onde os arquivos serão salvos
        final String uploadDir = "C:/Users/Aluno/Desktop/Projects/Benny´sReact/bennys-app/public/";

        // Verificar se o diretório de upload existe, caso contrário, criar
        File directory = new File(uploadDir + "assets/foto-perfil/");
        if (!directory.exists()) {
            directory.mkdirs(); 
        }

        // Gerar um nome único para o arquivo usando UUID
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Construir o caminho completo do arquivo no diretório de upload
        String filePath = uploadDir + "assets/foto-perfil/" + fileName;

        try {
            // Salvar o arquivo no diretório de upload
            file.transferTo(new File(filePath));

            // Criar um objeto JSON com o caminho do arquivo
            String jsonResponse = "{\"filePath\": \"assets/foto-perfil/" + fileName + "\"}";

            // Retornar o objeto JSON na resposta
            return ResponseEntity.ok(jsonResponse);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar o arquivo.");
        }
    }
	
	/*@PostMapping(produces = "application/json", value= "/carsPhotos")
	public ResponseEntity<Object> uploadFiles(@RequestParam("files") MultipartFile[] files) {
		System.out.println("fotos de carros guardadas com sucesso");		

	    if (files == null || files.length == 0) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: A lista de arquivos está vazia.");
	    }

	    // Diretório onde os arquivos serão salvos
	    final String uploadDir = "C:/Users/Aluno/Desktop/Projects/Benny´sReact/bennys-app/public/";

	    // Lista para armazenar os caminhos dos arquivos
	    List<String> filePaths = new ArrayList<>();

	    // Iterar sobre a lista de arquivos e fazer o upload de cada um
	    for (MultipartFile file : files) {
	        System.out.println(file.getOriginalFilename());		

	        // Verificar se o arquivo está vazio
	        if (file.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: Um dos arquivos está vazio.");
	        }

	        // Gerar um nome único para o arquivo usando UUID
	        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

	        // Construir o caminho completo do arquivo no diretório de upload
	        String filePath = uploadDir + "assets/carsPhotos/" + fileName;

	        try {
	            // Salvar o arquivo no diretório de upload
	            file.transferTo(new File(filePath));

	            // Adicionar o caminho do arquivo à lista
	            filePaths.add("assets/carsPhotos/" + fileName);
	        } catch (IOException e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar os arquivos.");
	        }
	    }
	    

	    // Retornar a lista de caminhos dos arquivos na resposta
	    return ResponseEntity.ok(filePaths);
	}*/
	
	@PostMapping(produces = "application/json", value= "/carsPhotos")
	public ResponseEntity<Object> uploadFiles(@RequestParam("files") MultipartFile[] files) {
	    System.out.println("\nfotos de carros guardadas com sucesso");        

	    if (files == null || files.length == 0) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: A lista de arquivos está vazia.");
	    }

	    // Diretório onde os arquivos serão salvos
	    final String uploadDir = "C:/Users/Aluno/Desktop/Projects/Benny´sReact/bennys-app/public/";

	    // Lista para armazenar os caminhos dos arquivos
	    List<String> filePaths = new ArrayList<>();

	    // Iterar sobre a lista de arquivos e fazer o upload de cada um
	    for (MultipartFile file : files) {
	        //System.out.println(file.getOriginalFilename());        

	        // Verificar se o arquivo está vazio
	        if (file.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erro: Um dos arquivos está vazio.");
	        }

	        // Gerar um nome único para o arquivo usando UUID
	        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

	        // Construir o caminho completo do arquivo no diretório de upload
	        String filePath = uploadDir + "assets/carsPhotos/" + fileName;

	        try {
	            // Salvar o arquivo no diretório de upload
	            file.transferTo(new File(filePath));

	            // Adicionar o caminho do arquivo à lista
	            filePaths.add("assets/carsPhotos/" + fileName);
	        } catch (IOException e) {
	            e.printStackTrace();
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar os arquivos.");
	        }
	    }

	    // Criar uma string separada por vírgulas dos caminhos dos arquivos
	    String concatenatedFilePaths = String.join(", ", filePaths);
	    //System.out.println(concatenatedFilePaths);
	    // Retornar a string de caminhos dos arquivos na resposta
	    return ResponseEntity.ok(concatenatedFilePaths);
	}
	
}
