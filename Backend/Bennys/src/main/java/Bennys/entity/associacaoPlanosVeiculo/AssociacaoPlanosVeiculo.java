package Bennys.entity.associacaoPlanosVeiculo;

import Bennys.entity.planoMensal.PlanoMensal;
import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Associacao_Planos_Veiculo")
public class AssociacaoPlanosVeiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Associacao")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo", nullable = false)
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "ID_Plano", referencedColumnName = "ID_Plano", nullable = false)
    private PlanoMensal plano;

    @Column(name = "Tipo_Veiculos", nullable = false)
    private String tipoVeiculos;

    // Construtores, getters e setters
}
