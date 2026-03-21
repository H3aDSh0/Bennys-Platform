package Bennys.entity.detalhesVeiculos;

import Bennys.entity.modeloProposta.ModeloProposta;
import Bennys.entity.propostaAdicao.PropostaAdicao;
import jakarta.persistence.*;

@Entity
@Table(name = "Detalhes_Veiculos")
public class DetalhesVeiculos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Detalhes")
    private Long idDetalhes;

    @ManyToOne
    @JoinColumn(name = "ID_Proposta", referencedColumnName = "ID_Proposta", nullable = false)
    private PropostaAdicao propostaAdicao;

    @ManyToOne
    @JoinColumn(name = "ID_Modelo", referencedColumnName = "ID_Modelo", nullable = false)
    private ModeloProposta modeloProposta;

    
    public DetalhesVeiculos() {
    }
    
	public DetalhesVeiculos(PropostaAdicao propostaAdicao, ModeloProposta modeloProposta) {
		this.propostaAdicao = propostaAdicao;
		this.modeloProposta = modeloProposta;
	}

	public Long getIdDetalhes() {
		return idDetalhes;
	}

	public PropostaAdicao getPropostaAdicao() {
		return propostaAdicao;
	}

	public ModeloProposta getModeloProposta() {
		return modeloProposta;
	}

	public void setIdDetalhes(Long idDetalhes) {
		this.idDetalhes = idDetalhes;
	}

	public void setPropostaAdicao(PropostaAdicao propostaAdicao) {
		this.propostaAdicao = propostaAdicao;
	}

	public void setModeloProposta(ModeloProposta modeloProposta) {
		this.modeloProposta = modeloProposta;
	}


	
	

}