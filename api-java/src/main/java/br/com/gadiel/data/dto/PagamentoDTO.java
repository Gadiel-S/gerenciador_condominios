package br.com.gadiel.data.dto;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

public class PagamentoDTO implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  private Long id;
  private BigDecimal valorPago;
  private LocalDate dataPagamento;
  private String descricao;

  public PagamentoDTO() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public BigDecimal getValorPago() {
    return valorPago;
  }

  public void setValorPago(BigDecimal valorPago) {
    this.valorPago = valorPago;
  }

  public LocalDate getDataPagamento() {
    return dataPagamento;
  }

  public void setDataPagamento(LocalDate dataPagamento) {
    this.dataPagamento = dataPagamento;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    PagamentoDTO that = (PagamentoDTO) o;
    return Objects.equals(getId(), that.getId()) && Objects.equals(getValorPago(), that.getValorPago()) && Objects.equals(getDataPagamento(), that.getDataPagamento()) && Objects.equals(getDescricao(), that.getDescricao());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getValorPago(), getDataPagamento(), getDescricao());
  }
}
