create database shop;

create table Addresses(
	idAddress int,
	street varchar(30),
	city varchar(25),
	state varchar(25),
	pc char(5),
	PRIMARY KEY (idAddress)
);

create table Countries(
	idCountry int,
	name varchar(20),
	PRIMARY KEY (idCountry)
);

create table Customers(
	username char(30),
	password char(50),
	name varchar(35),
	apellidos varchar(60),
	email char(40),
	company varchar(70),
	phone char(10),
	idCountry int,
	idAddress int,
	PRIMARY KEY (username),
	CONSTRAINT clientesFK1 FOREIGN KEY (idCountry)
	REFERENCES Countries(idCountry)
	ON DELETE RESTRICT
	ON UPDATE CASCADE,
	CONSTRAINT clientesFK2 FOREIGN KEY (idAddress)
	REFERENCES Addresses(idAddress)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
);

create table Providers(
	idProvider int,
	name varchar(30),
	PRIMARY KEY (idProvider)
);

create table Categories(
	idCategory int,
	name varchar(30),
	PRIMARY KEY (idCategory)
);

create table Coupons(
	idCoupon char(5),
	amount double,
	PRIMARY KEY (idCoupon)
);

create table Payments(
	idPayment int,
	name double,
	PRIMARY KEY (idPayment)
);

create table Products(
	idProduct int,
	name varchar(30),
	precio double,
	idCategory int,
	idProvider int,
	PRIMARY KEY (idProduct),
	CONSTRAINT productsFK1 FOREIGN KEY (idCategory)
	REFERENCES Categories(idCategory),
	CONSTRAINT productsFK2 FOREIGN KEY (idProvider)
	REFERENCES Providers(idProvider)
);

create table Purchases(
	idPurchase int,
	username char(30),
	pDate datetime,
	idPayment int,
	idCoupon char(5),
	total double,
	PRIMARY KEY(idPurchase),
	CONSTRAINT purchasesFK1 FOREIGN KEY (username)
	REFERENCES Customers(username),
	CONSTRAINT purchasesFK2 FOREIGN KEY (idCoupon)
	REFERENCES Coupons(idCoupon),
	CONSTRAINT purchasesFK3 FOREIGN KEY (idPayment)
	REFERENCES Payments(idPayment)
);

create table Purchase(
	idPurchase int,
	idProduct int,
	quantity int,
	PRIMARY KEY (idPurchase, idProduct),
	CONSTRAINT purchaseFK1 FOREIGN KEY (idPurchase)
	REFERENCES Purchases(idPurchase),
	CONSTRAINT purchaseFK2 FOREIGN KEY (idProduct)
	REFERENCES Products(idProduct)
);