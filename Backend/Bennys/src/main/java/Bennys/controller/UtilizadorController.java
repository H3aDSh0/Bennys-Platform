package Bennys.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import Bennys.entity.utilizador.Utilizador;
import Bennys.service.UtilizadorService;

@RestController
public class UtilizadorController {

    private final UtilizadorService utilizadorService;

    @Autowired
    public UtilizadorController(UtilizadorService utilizadorService, Gson gson) {
        this.utilizadorService = utilizadorService;
    }
    
    @GetMapping("/utilizadores")
    public ResponseEntity<List<Utilizador>> getAllUtilizadores() {
    	List<Utilizador> allUtilizadores = utilizadorService.getAllUtilizadores();
		return ResponseEntity.ok(allUtilizadores);
    }
    
}
