package br.com.gadiel.models;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "pagamentos")
public class Pagamento implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, precision = 10, scale = 2)
  private BigDecimal valorPago;

  @Column(name = "data_pagamento", nullable = false)
  private LocalDate dataPagamento;

  @Column(columnDefinition = "TEXT")
  private String descricao;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "apartamento_id", nullable = false)
  private Apartamento apartamento;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "divida_id")
  private Divida divida;

  public Pagamento() {
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

  public Apartamento getApartamento() {
    return apartamento;
  }

  public void setApartamento(Apartamento apartamento) {
    this.apartamento = apartamento;
  }

  public Divida getDivida() {
    return divida;
  }

  public void setDivida(Divida divida) {
    this.divida = divida;
  }

  @Override
  public boolean equals(Object o) {
    if (o == null || getClass() != o.getClass()) return false;
    Pagamento pagamento = (Pagamento) o;
    return Objects.equals(getId(), pagamento.getId()) && Objects.equals(getValorPago(), pagamento.getValorPago()) && Objects.equals(getDataPagamento(), pagamento.getDataPagamento()) && Objects.equals(getDescricao(), pagamento.getDescricao()) && Objects.equals(getApartamento(), pagamento.getApartamento()) && Objects.equals(getDivida(), pagamento.getDivida());
  }

  @Override
  public int hashCode() {
    return Objects.hash(getId(), getValorPago(), getDataPagamento(), getDescricao(), getApartamento(), getDivida());
  }
}
