package br.com.gadiel.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "apartamentos")
public class Apartamento implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private Integer numero;

  @Column(nullable = false)
  private String morador;

  @OneToMany(mappedBy = "apartamento")
  private List<Divida> dividas;

  @OneToMany(mappedBy = "apartamento")
  private List<Pagamento> pagamentos;

  public Apartamento() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Integer getNumero() {
    return numero;
  }

  public void setNumero(Integer numero) {
    this.numero = numero;
  }

  public String getMorador() {
    return morador;
  }

  public void setMorador(String morador) {
    this.morador = morador;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    Apartamento that = (Apartamento) o;
    return Objects.equals(getId(), that.getId()) && Objects.equals(getNumero(), that.getNumero()) && Objects.equals(getMorador(), that.getMorador());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getNumero(), getMorador());
  }
}
