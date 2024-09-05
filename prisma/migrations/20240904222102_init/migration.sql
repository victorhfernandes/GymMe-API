-- CreateTable
CREATE TABLE `tb_aluno` (
    `id_aluno` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_aluno` VARCHAR(100) NOT NULL,
    `celular_aluno` VARCHAR(13) NOT NULL,
    `email_aluno` VARCHAR(50) NULL,
    `senha_aluno` VARCHAR(30) NOT NULL,
    `nascimento_aluno` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tb_aluno_email_aluno_key`(`email_aluno`),
    PRIMARY KEY (`id_aluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_especializacao` (
    `id_especializacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_especializacao` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_especializacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_qualificacao` (
    `id_qualificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_qualificacao` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_qualificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `rua` VARCHAR(80) NULL,
    `complemento` VARCHAR(80) NULL,
    `bairro` VARCHAR(80) NULL,
    `cidade` VARCHAR(80) NULL,
    `estado` VARCHAR(80) NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutor` (
    `id_instrutor` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_instrutor` VARCHAR(100) NOT NULL,
    `email_instrutor` VARCHAR(50) NOT NULL,
    `senha_instrutor` VARCHAR(30) NOT NULL,
    `cel_instrutor` VARCHAR(13) NOT NULL,
    `cref_instrutor` VARCHAR(11) NULL,
    `avaliacao_instrutor` DECIMAL(4, 2) NULL,
    `intro_instrutor` TINYTEXT NULL,

    UNIQUE INDEX `tb_instrutor_email_instrutor_key`(`email_instrutor`),
    PRIMARY KEY (`id_instrutor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorEspecializacao` (
    `id_instrutor` INTEGER NOT NULL,
    `id_especializacao` INTEGER NOT NULL,

    PRIMARY KEY (`id_instrutor`, `id_especializacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorQualificacao` (
    `id_instrutor` INTEGER NOT NULL,
    `id_qualificacao` INTEGER NOT NULL,

    PRIMARY KEY (`id_instrutor`, `id_qualificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorEndereco` (
    `id_instrutor` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    PRIMARY KEY (`id_instrutor`, `id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_link` (
    `id_link` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_link` VARCHAR(100) NOT NULL,
    `id_instrutor` INTEGER NOT NULL,

    PRIMARY KEY (`id_link`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_servico` (
    `id_servico` INTEGER NOT NULL AUTO_INCREMENT,
    `ds_servico` VARCHAR(100) NULL,
    `id_aluno` INTEGER NOT NULL,
    `id_instrutor` INTEGER NOT NULL,

    PRIMARY KEY (`id_servico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_avaliacao` (
    `id_avaliacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nota` DECIMAL(4, 2) NULL,
    `comentario` TINYTEXT NULL,
    `dt_avaliacao` DATETIME(3) NOT NULL,
    `id_servico` INTEGER NOT NULL,

    PRIMARY KEY (`id_avaliacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_instrutorEspecializacao` ADD CONSTRAINT `tb_instrutorEspecializacao_id_instrutor_fkey` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_instrutorEspecializacao` ADD CONSTRAINT `tb_instrutorEspecializacao_id_especializacao_fkey` FOREIGN KEY (`id_especializacao`) REFERENCES `tb_especializacao`(`id_especializacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_instrutorQualificacao` ADD CONSTRAINT `tb_instrutorQualificacao_id_instrutor_fkey` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_instrutorQualificacao` ADD CONSTRAINT `tb_instrutorQualificacao_id_qualificacao_fkey` FOREIGN KEY (`id_qualificacao`) REFERENCES `tb_qualificacao`(`id_qualificacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_instrutorEndereco` ADD CONSTRAINT `tb_instrutorEndereco_id_instrutor_fkey` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_instrutorEndereco` ADD CONSTRAINT `tb_instrutorEndereco_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_link` ADD CONSTRAINT `tb_link_id_instrutor_fkey` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_servico` ADD CONSTRAINT `tb_servico_id_aluno_fkey` FOREIGN KEY (`id_aluno`) REFERENCES `tb_aluno`(`id_aluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_servico` ADD CONSTRAINT `tb_servico_id_instrutor_fkey` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_avaliacao` ADD CONSTRAINT `tb_avaliacao_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tb_servico`(`id_servico`) ON DELETE RESTRICT ON UPDATE CASCADE;
