package br.com.gadiel.data.dto;

import jakarta.persistence.Column;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

public class DividaDTO implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  private Long id;
  private BigDecimal valor;
  private BigDecimal jurosAtrasoDiario;
  private String descricao;
  private LocalDate dataVencimento;
  private LocalDate dataPagamento;

  public DividaDTO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public BigDecimal getValor() {
    return valor;
  }

  public void setValor(BigDecimal valor) {
    this.valor = valor;
  }

  public BigDecimal getJurosAtrasoDiario() {
    return jurosAtrasoDiario;
  }

  public void setJurosAtrasoDiario(BigDecimal jurosAtrasoDiario) {
    this.jurosAtrasoDiario = jurosAtrasoDiario;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public LocalDate getDataVencimento() {
    return dataVencimento;
  }

  public void setDataVencimento(LocalDate dataVencimento) {
    this.dataVencimento = dataVencimento;
  }

  public LocalDate getDataPagamento() {
    return dataPagamento;
  }

  public void setDataPagamento(LocalDate dataPagamento) {
    this.dataPagamento = dataPagamento;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    DividaDTO dividaDTO = (DividaDTO) o;
    return Objects.equals(getId(), dividaDTO.getId()) && Objects.equals(getValor(), dividaDTO.getValor()) && Objects.equals(getJurosAtrasoDiario(), dividaDTO.getJurosAtrasoDiario()) && Objects.equals(getDescricao(), dividaDTO.getDescricao()) && Objects.equals(getDataVencimento(), dividaDTO.getDataVencimento()) && Objects.equals(getDataPagamento(), dividaDTO.getDataPagamento());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getValor(), getJurosAtrasoDiario(), getDescricao(), getDataVencimento(), getDataPagamento());
  }
}
