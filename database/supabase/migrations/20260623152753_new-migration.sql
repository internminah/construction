-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.users (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  username text NOT NULL DEFAULT ''::text,
  email text DEFAULT ''::text,
  password character varying DEFAULT ''::character varying,
  role text CHECK (length(role) < 50),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  title text NOT NULL,
  description text,
  image text,
  CONSTRAINT services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.portfolio (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  project _name text NOT NULL,
  category character varying,
  description text,
  image text,
  status text,
  CONSTRAINT portfolio_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reviews (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_name character varying NOT NULL,
  rating integer,
  review text,
  CONSTRAINT reviews_pkey PRIMARY KEY (id)
);
CREATE TABLE public.contacts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL,
  email character varying,
  phone bigint,
  message text,
  CONSTRAINT contacts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.quotations (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  customer_name text NOT NULL,
  email character varying,
  phone bigint,
  project_type text,
  project_details text,
  CONSTRAINT quotations_pkey PRIMARY KEY (id)
);