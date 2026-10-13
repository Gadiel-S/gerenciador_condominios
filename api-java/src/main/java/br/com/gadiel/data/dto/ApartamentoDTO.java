package br.com.gadiel.data.dto;

import br.com.gadiel.models.Divida;
import br.com.gadiel.models.Pagamento;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class ApartamentoDTO implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  private Long id;
  private Integer numero;
  private String morador;

  public ApartamentoDTO() {
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
    ApartamentoDTO that = (ApartamentoDTO) o;
    return Objects.equals(getId(), that.getId()) && Objects.equals(getNumero(), that.getNumero()) && Objects.equals(getMorador(), that.getMorador());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getNumero(), getMorador());
  }
}
