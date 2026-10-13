package br.com.gadiel.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "dividas")
public class Divida implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal valor;

  @Column(nullable = false, precision = 5, scale = 2)
  private BigDecimal jurosAtrasoDiario;

  @Column(columnDefinition = "TEXT")
  private String descricao;

  @Column(name = "data_vencimento", nullable = false)
  private LocalDate dataVencimento;

  @Column(name = "data_pagamento")
  private LocalDate dataPagamento;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "apartamento_id", nullable = false)
  private Apartamento apartamento;

  public Divida() {
  }

  public LocalDate getDataVencimento() {
    return dataVencimento;
  }

  public void setDataVencimento(LocalDate dataVencimento) {
    this.dataVencimento = dataVencimento;
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

  public LocalDate getDataPagamento() {
    return dataPagamento;
  }

  public void setDataPagamento(LocalDate dataPagamento) {
    this.dataPagamento = dataPagamento;
  }

  public Apartamento getApartamento() {
    return apartamento;
  }

  public void setApartamento(Apartamento apartamento) {
    this.apartamento = apartamento;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    Divida divida = (Divida) o;
    return Objects.equals(getId(), divida.getId()) && Objects.equals(getValor(), divida.getValor()) && Objects.equals(getJurosAtrasoDiario(), divida.getJurosAtrasoDiario()) && Objects.equals(getDescricao(), divida.getDescricao()) && Objects.equals(getDataVencimento(), divida.getDataVencimento()) && Objects.equals(getDataPagamento(), divida.getDataPagamento()) && Objects.equals(getApartamento(), divida.getApartamento());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getValor(), getJurosAtrasoDiario(), getDescricao(), getDataVencimento(), getDataPagamento(), getApartamento());
  }
}
