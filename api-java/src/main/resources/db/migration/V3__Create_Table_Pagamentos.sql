CREATE TABLE IF NOT EXISTS pagamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    valor_pago DECIMAL(10,2) NOT NULL,
    data_pagamento DATE NOT NULL,
    descricao TEXT,
    apartamento_id BIGINT NOT NULL,
    divida_id BIGINT,

    CONSTRAINT fk_pagamentos_apartamento
        FOREIGN KEY (apartamento_id)
        REFERENCES apartamentos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_pagamentos_divida
        FOREIGN KEY (divida_id)
        REFERENCES dividas(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;