package Bennys.entity.planoMensal;

import java.math.BigDecimal;

import jakarta.persistence.*;

@Entity
@Table(name = "Plano_Mensal")
public class PlanoMensal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Plano")
    private Long id;

    @Column(name = "Nome_Plano", unique = true, nullable = false)
    private String nomePlano;

    @Column(name = "Descricao")
    private String descricao;

    @Column(name = "Preco_Mensal", nullable = false)
    private BigDecimal precoMensal;

    @Column(name = "Duracao", nullable = false)
    private int duracao;

    // Construtores, getters e setters
}