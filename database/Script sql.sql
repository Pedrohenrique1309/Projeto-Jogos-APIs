#CRIA O DATABASE
create database db_controle_jogos_bb;

#ATIVA O DATABASE A SER UTILIZADO
use db_controle_jogos_bb;

#CRIA TABELA DE JOGOS
create table tbl_jogo (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    data_lancamento date not null,
    versao varchar(10) not null,
    tamanho varchar(10),
    descricao text,
    foto_capa varchar(200),
    link varchar(200),
    id_faixa_etaria INT,
    
    FOREIGN KEY (id_faixa_etaria)
	REFERENCES tbl_faixa_etaria(id)
);



create table tbl_atualizacao (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    versao varchar(10) not null,
    tamanho varchar(10) not null,
    link varchar(200) 
);

create table tbl_faixa_etaria (
    id int not null primary key auto_increment,
	idade_indicativa int not null
);

create table tbl_plataforma (
    id int not null primary key auto_increment,
	nome varchar(30) not null
);

create table tbl_versao_jogo (
    id int not null primary key auto_increment,
	nome varchar(45) not null
);

create table tbl_assinatura (
    id int not null primary key auto_increment,
	nome varchar(50) not null
);

CREATE TABLE tbl_categoria (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(80) NOT NULL
);

create table tbl_desenvolvedor (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    fundacao date,
    email_suporte varchar(200) not null,
    presidente varchar(100) not null
);

CREATE TABLE tbl_avaliacao (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    comentario TEXT NOT NULL,
    pontuacao INT NOT NULL,
    id_jogo INT NOT NULL,
    
    CONSTRAINT FK_AVALIACAO_JOGO
	FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id)
);


create table tbl_jogo_categoria (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_jogo INT NOT NULL,
    id_categoria INT NOT NULL,
    
    CONSTRAINT FK_JOGO_JOGO_CATEGORIA
    FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
    
    CONSTRAINT FK_CATEGORIA_JOGO_CATEGORIA 
    FOREIGN KEY (id_categoria) REFERENCES tbl_categoria(id)
);

CREATE TABLE tbl_jogo_desenvolvedor (
    id INT NOT NULL  PRIMARY KEY AUTO_INCREMENT,
    id_desenvolvedor INT NOT NULL,
    id_jogo INT NOT NULL,
    
    CONSTRAINT fk_desenvolvedor_jogo_desenvolvedor
	FOREIGN KEY (id_desenvolvedor) REFERENCES tbl_desenvolvedor(id),
        
    CONSTRAINT fk_jogo_jogo_desenvolvedor
	FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id)
);


CREATE TABLE tbl_plataforma_jogo_atualizacao (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_plataforma INT NOT NULL,
    id_jogo INT NOT NULL,
    id_atualizacao INT NOT NULL,
    

    CONSTRAINT fk_plataforma_plataforma_jogo_atualizacao
        FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma(id),
        
    CONSTRAINT fk_jogo_plataforma_jogo_atualizacao
        FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
        
    CONSTRAINT fk_atualizacao_plataforma_jogo_atualizacao
        FOREIGN KEY (id_atualizacao) REFERENCES tbl_atualizacao(id)
);

CREATE TABLE tbl_jogo_plataforma_versao (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_jogo INT NOT NULL,
    id_plataforma INT NOT NULL,
    id_versao INT NOT NULL,

    CONSTRAINT fk_jogo_plataforma_jogo_versao
        FOREIGN KEY (id_jogo) REFERENCES tbl_jogo(id),
        
    CONSTRAINT fk_plataforma_plataforma_jogo_versao
        FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma(id),
        
    CONSTRAINT fk_versao_plataforma_jogo_versao
        FOREIGN KEY (id_versao) REFERENCES tbl_versao_jogo(id)
);


CREATE TABLE tbl_plataforma_assinatura (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_plataforma INT NOT NULL,
    id_assinatura INT NOT NULL,
    
    CONSTRAINT fk_plataforma_plataforma_assinatura
        FOREIGN KEY (id_plataforma) REFERENCES tbl_plataforma(id),
        
    CONSTRAINT fk_assinatura_plataforma_assinatura
        FOREIGN KEY (id_assinatura) REFERENCES tbl_assinatura(id)
);





show tables;
desc tbl_jogo;
select * from tbl_jogo
