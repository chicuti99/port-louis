-- CreateTable
CREATE TABLE `Contato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `telefone` VARCHAR(15) NOT NULL,

    UNIQUE INDEX `Contato_nome_key`(`nome`),
    UNIQUE INDEX `Contato_telefone_key`(`telefone`),
    INDEX `Contato_nome_idx`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Grupo_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContatosGrupos` (
    `id_contato` INTEGER NOT NULL,
    `id_grupo` INTEGER NOT NULL,

    INDEX `ContatosGrupos_id_grupo_idx`(`id_grupo`),
    PRIMARY KEY (`id_contato`, `id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContatosGrupos` ADD CONSTRAINT `ContatosGrupos_id_contato_fkey` FOREIGN KEY (`id_contato`) REFERENCES `Contato`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContatosGrupos` ADD CONSTRAINT `ContatosGrupos_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
