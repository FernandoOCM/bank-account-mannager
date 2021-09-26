CREATE DATABASE account_management;
 
ALTER DATABASE account_management OWNER TO postgres;

CREATE TABLE public.person (
    person_id bigserial NOT NULL,
    name varchar(80) NOT NULL,
    cpf varchar(14) NOT NULL,
    birth_date timestamp without time zone NOT NULL
);

CREATE TABLE public.account (
    account_id bigserial NOT NULL,
    person_id bigint NOT NULL,
    balance NUMERIC(20, 2) NOT NULL,
    daily_withdrawal_limit NUMERIC(20, 2) NOT NULL,
    active boolean NOT NULL,
    type smallint NOT NULL,
    creation_date timestamp without time zone NOT NULL
);

CREATE TABLE public.account_transaction (
    account_transaction_id bigserial NOT NULL,
    account_id bigint NOT NULL,
    value NUMERIC(20, 2) NOT NULL,
    date timestamp without time zone NOT NULL
);

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (person_id);

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (account_id);

ALTER TABLE ONLY public.account_transaction
    ADD CONSTRAINT account_transaction_pkey PRIMARY KEY (account_transaction_id);

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_person_fk FOREIGN KEY (person_id) REFERENCES public.person(person_id);

ALTER TABLE ONLY public.account_transaction
    ADD CONSTRAINT account_transaction_account_fk FOREIGN KEY (account_id) REFERENCES public.account(account_id);

ALTER TABLE public.account_transaction 
    ADD COLUMN type smallint NOT NULL;

