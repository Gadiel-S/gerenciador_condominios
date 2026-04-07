CREATE TABLE IF NOT EXISTS dividas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    juros_atraso_diario DECIMAL(5,2) NOT NULL,
    descricao TEXT,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE DEFAULT NULL,
    apartamento_id BIGINT NOT NULL,

    CONSTRAINT fk_dividas_apartamento
        FOREIGN KEY (apartamento_id)
        REFERENCES apartamentos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;