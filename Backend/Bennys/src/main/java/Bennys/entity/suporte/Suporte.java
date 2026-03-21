package Bennys.entity.suporte;

import java.time.LocalDate;

import Bennys.entity.equipaSuporte.EquipaSuporte;
import Bennys.entity.fabricante.Fabricante;
import Bennys.entity.utilizador.Utilizador;
import Bennys.entity.veiculo.Veiculo;
import jakarta.persistence.*;

@Entity
@Table(name = "Suporte")
public class Suporte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Suporte")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ID_Utilizador", referencedColumnName = "ID_Utilizador")
    private Utilizador utilizador;

    @ManyToOne
    @JoinColumn(name = "ID_Fabricante", referencedColumnName = "ID_Fabricante")
    private Fabricante fabricante;

    @ManyToOne
    @JoinColumn(name = "ID_Veiculo", referencedColumnName = "ID_Veiculo")
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "ID_EquipaSuporte", referencedColumnName = "ID_Membro")
    private EquipaSuporte membroEquipaSuporte;

    @Column(name = "Assunto", nullable = false)
    private String assunto;

    @Column(name = "Descricao", nullable = false)
    private String descricao;

    @Column(name = "Estado", nullable = false)
    private String estado;

    @Column(name = "DataSolicitacao", nullable = false)
    private LocalDate dataSolicitacao;

    // Construtores, getters e setters
}
