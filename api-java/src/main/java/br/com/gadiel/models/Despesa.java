package br.com.gadiel.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "despesas")
public class Despesa implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nome;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal valor;

  @Column(name = "data_emissao", nullable = false)
  private LocalDate dataEmissao;

  public Despesa() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public BigDecimal getValor() {
    return valor;
  }

  public void setValor(BigDecimal valor) {
    this.valor = valor;
  }

  public LocalDate getDataEmissao() {
    return dataEmissao;
  }

  public void setDataEmissao(LocalDate dataEmissao) {
    this.dataEmissao = dataEmissao;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    Despesa despesa = (Despesa) o;
    return Objects.equals(getId(), despesa.getId()) && Objects.equals(getNome(), despesa.getNome()) && Objects.equals(getValor(), despesa.getValor()) && Objects.equals(getDataEmissao(), despesa.getDataEmissao());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getNome(), getValor(), getDataEmissao());
  }
}
