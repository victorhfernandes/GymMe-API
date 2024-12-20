-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_aluno` (
    `id_aluno` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_aluno` VARCHAR(255) NULL,
    `celular_aluno` VARCHAR(14) NULL,
    `email_aluno` VARCHAR(255) NOT NULL,
    `senha_aluno` VARCHAR(60) NOT NULL,
    `nascimento_aluno` DATE NULL,
    `foto_perfil` VARCHAR(255) NULL,
    `atestado` VARCHAR(255) NULL,
    `doresPeito` BOOLEAN NULL,
    `desequilibrio` BOOLEAN NULL,
    `osseoArticular` BOOLEAN NULL,
    `medicado` BOOLEAN NULL,
    `cpf_aluno` VARCHAR(14) NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `celular_aluno`(`celular_aluno`),
    UNIQUE INDEX `email_aluno`(`email_aluno`),
    UNIQUE INDEX `cpf_aluno`(`cpf_aluno`),
    PRIMARY KEY (`id_aluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_avaliacao` (
    `id_avaliacao` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario` TINYTEXT NULL,
    `dt_avaliacao` DATE NULL,
    `id_servico` INTEGER NOT NULL,

    PRIMARY KEY (`id_avaliacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_certificacao` (
    `id_certificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_certificacao` VARCHAR(50) NULL,

    PRIMARY KEY (`id_certificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_cidade` (
    `id_cidade` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_cidade` VARCHAR(255) NULL,
    `nm_estado` VARCHAR(2) NULL,

    PRIMARY KEY (`id_cidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_especializacao` (
    `id_especializacao` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_especializacao` VARCHAR(50) NULL,

    PRIMARY KEY (`id_especializacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_experiencia` (
    `id_experiencia` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_experiencia` VARCHAR(50) NULL,

    PRIMARY KEY (`id_experiencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_grupomuscular` (
    `id_grupoMuscular` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_grupoMuscular` VARCHAR(20) NULL,

    PRIMARY KEY (`id_grupoMuscular`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutor` (
    `id_instrutor` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_instrutor` VARCHAR(255) NULL,
    `email_instrutor` VARCHAR(255) NOT NULL,
    `senha_instrutor` VARCHAR(60) NOT NULL,
    `celular_instrutor` VARCHAR(13) NULL,
    `cref_instrutor` VARCHAR(11) NULL,
    `intro_instrutor` TINYTEXT NULL,
    `nascimento_instrutor` DATE NULL,
    `foto_perfil` VARCHAR(255) NULL,
    `cpf_instrutor` VARCHAR(14) NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `email_instrutor`(`email_instrutor`),
    PRIMARY KEY (`id_instrutor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorcertificacao` (
    `id_instrutorCertificacao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_instrutor` INTEGER NOT NULL,
    `id_certificacao` INTEGER NOT NULL,
    `nm_instituicao` VARCHAR(50) NULL,
    `id_certificadoProfisional` VARCHAR(15) NULL,

    UNIQUE INDEX `uc_certificacao`(`id_instrutor`, `id_certificacao`),
    PRIMARY KEY (`id_instrutorCertificacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorcidade` (
    `id_instrutorCidade` INTEGER NOT NULL AUTO_INCREMENT,
    `id_instrutor` INTEGER NOT NULL,
    `id_cidade` INTEGER NOT NULL,

    PRIMARY KEY (`id_instrutorCidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorespecializacao` (
    `id_instrutorEspecializacao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_instrutor` INTEGER NOT NULL,
    `id_especializacao` INTEGER NOT NULL,

    UNIQUE INDEX `uc_especializacao`(`id_instrutor`, `id_especializacao`),
    PRIMARY KEY (`id_instrutorEspecializacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_instrutorexperiencia` (
    `id_instrutorExperiencia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_instrutor` INTEGER NOT NULL,
    `id_experiencia` INTEGER NOT NULL,
    `ds_experiencia` TINYTEXT NULL,

    UNIQUE INDEX `uc_experiencia`(`id_instrutor`, `id_experiencia`),
    PRIMARY KEY (`id_instrutorExperiencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_link` (
    `id_link` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_link` VARCHAR(50) NOT NULL,
    `id_instrutor` INTEGER NOT NULL,
    `id_tipo` INTEGER NOT NULL,

    PRIMARY KEY (`id_link`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_planilha` (
    `id_planilha` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_planilha` VARCHAR(255) NOT NULL,
    `id_servico` INTEGER NOT NULL,

    PRIMARY KEY (`id_planilha`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_servico` (
    `id_servico` INTEGER NOT NULL AUTO_INCREMENT,
    `msg_servico` VARCHAR(255) NULL,
    `nota` DECIMAL(3, 2) NULL,
    `id_aluno` INTEGER NOT NULL,
    `id_instrutor` INTEGER NOT NULL,
    `status_servico` BOOLEAN NULL,
    `status_pagamento` BOOLEAN NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `uc_servico`(`id_instrutor`, `id_aluno`),
    PRIMARY KEY (`id_servico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_tipo` (
    `id_tipo` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_tipo` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_treino` (
    `id_treino` INTEGER NOT NULL AUTO_INCREMENT,
    `nm_exercicio` VARCHAR(255) NOT NULL,
    `id_grupoMuscular` INTEGER NULL,
    `id_planilha` INTEGER NULL,
    `ds_treino` TINYTEXT NULL,
    `qt_treino` INTEGER NULL,
    `qt_serie` INTEGER NULL,
    `kg_carga` FLOAT NULL,
    `sg_descanso` INTEGER NULL,
    `gif_exercicio` VARCHAR(255) NULL,

    PRIMARY KEY (`id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_avaliacao` ADD CONSTRAINT `fk_idServicoAvaliacao` FOREIGN KEY (`id_servico`) REFERENCES `tb_servico`(`id_servico`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorcertificacao` ADD CONSTRAINT `fk_certificacaoInstrutor` FOREIGN KEY (`id_certificacao`) REFERENCES `tb_certificacao`(`id_certificacao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorcertificacao` ADD CONSTRAINT `fk_instutorCertificacao` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorcidade` ADD CONSTRAINT `fk_cidadeInstrutor` FOREIGN KEY (`id_cidade`) REFERENCES `tb_cidade`(`id_cidade`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorcidade` ADD CONSTRAINT `fk_instutorCidade` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorespecializacao` ADD CONSTRAINT `fk_especializacaoInstrutor` FOREIGN KEY (`id_especializacao`) REFERENCES `tb_especializacao`(`id_especializacao`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorespecializacao` ADD CONSTRAINT `fk_instutorEspecializacao` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorexperiencia` ADD CONSTRAINT `fk_experienciaInstrutor` FOREIGN KEY (`id_experiencia`) REFERENCES `tb_experiencia`(`id_experiencia`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_instrutorexperiencia` ADD CONSTRAINT `fk_instutorExperiencia` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_link` ADD CONSTRAINT `fk_instrutorLink` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_link` ADD CONSTRAINT `fk_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tb_tipo`(`id_tipo`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_planilha` ADD CONSTRAINT `fk_idServicoPlanilha` FOREIGN KEY (`id_servico`) REFERENCES `tb_servico`(`id_servico`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_servico` ADD CONSTRAINT `fk_alunoServico` FOREIGN KEY (`id_aluno`) REFERENCES `tb_aluno`(`id_aluno`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_servico` ADD CONSTRAINT `fk_instrutorServico` FOREIGN KEY (`id_instrutor`) REFERENCES `tb_instrutor`(`id_instrutor`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_treino` ADD CONSTRAINT `fk_idGrupoMuscular` FOREIGN KEY (`id_grupoMuscular`) REFERENCES `tb_grupomuscular`(`id_grupoMuscular`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tb_treino` ADD CONSTRAINT `fk_idPlanilha` FOREIGN KEY (`id_planilha`) REFERENCES `tb_planilha`(`id_planilha`) ON DELETE CASCADE ON UPDATE NO ACTION;

