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
    link varchar(200)
);

create table tbl_atualizacao (
	id int not null primary key auto_increment,
    nome varchar(80) not null,
    versao varchar(10) not null,
    tamanho varchar(10) ,
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

show tables;
desc tbl_jogo;
select * from tbl_jogo