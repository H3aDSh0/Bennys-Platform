package Bennys.entity.propostaAdicao;

import java.time.LocalDate;


import Bennys.entity.fabricante.Fabricante;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Proposta_Adicao")
public class PropostaAdicao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Proposta")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Fabricante", referencedColumnName = "ID_Fabricante", nullable = false)
    private Fabricante fabricante;

    @Column(name = "Nome_Fabricante", nullable = false)
    private String nomeFabricante;

    @Column(name = "Data_Proposta", nullable = false)
    private LocalDate dataProposta;

    @Column(name = "Estado_Proposta", nullable = false)
    private String estadoProposta;
    
    

	public PropostaAdicao(Fabricante fabricante, String nomeFabricante) {
		this.fabricante = fabricante;
		this.nomeFabricante = nomeFabricante;
		this.dataProposta = LocalDate.now();
		this.estadoProposta = "Aguardar Revisão";
	}
	
	public PropostaAdicao() {
	}

	public Long getId() {
		return id;
	}

	public Fabricante getFabricante() {
		return fabricante;
	}

	public String getNomeFabricante() {
		return nomeFabricante;
	}

	public LocalDate getDataProposta() {
		return dataProposta;
	}

	public String getEstadoProposta() {
		return estadoProposta;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setFabricante(Fabricante fabricante) {
		this.fabricante = fabricante;
	}

	public void setNomeFabricante(String nomeFabricante) {
		this.nomeFabricante = nomeFabricante;
	}

	public void setDataProposta(LocalDate dataProposta) {
		this.dataProposta = dataProposta;
	}

	public void setEstadoProposta(String estadoProposta) {
		this.estadoProposta = estadoProposta;
	}

    
}