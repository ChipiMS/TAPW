create database shop;

create table Country(
	idCountry int NOT NULL AUTO_INCREMENT,
	name varchar(20),
	PRIMARY KEY(idCountry)
);

create table State(
	idState int NOT NULL AUTO_INCREMENT,
	name varchar(20),
	idCountry int,
	PRIMARY KEY (idState),
	CONSTRAINT StateFK1 FOREIGN KEY (idCountry) REFERENCES Country(idCountry)
);

create table Customer(
	username char(30) not null,
	password char(50),
	dCreate date,
	name varchar(35),
	lastName varchar(60),
	email char(40),
	phone char(10),
	street varchar(30),
	city varchar(25),
	postalCode char(5),
	idState int,
	PRIMARY KEY (username),
	CONSTRAINT CustomerFK1 FOREIGN KEY (idState) REFERENCES State(idState)
);

create table Provider(
	idProvider int NOT NULL AUTO_INCREMENT,
	name varchar(30),
	PRIMARY KEY (idProvider)
);

create table Category(
	idCategory int NOT NULL AUTO_INCREMENT,
	name varchar(30),
	PRIMARY KEY (idCategory)
);

create table Coupon(
	idCoupon char(5),
	amount double,
	PRIMARY KEY (idCoupon)
);

create table PaymentMethod(
	idPaymentMethod int NOT NULL AUTO_INCREMENT,
	name varchar(20),
	PRIMARY KEY (idPaymentMethod)
);

create table Product(
	idProduct int NOT NULL AUTO_INCREMENT,
	name varchar(30),
	price double,
	idCategory int,
	idProvider int,
	PRIMARY KEY (idProduct),
	CONSTRAINT ProductFK1 FOREIGN KEY (idCategory) REFERENCES Category(idCategory),
	CONSTRAINT ProductFK2 FOREIGN KEY (idProvider) REFERENCES Provider(idProvider)
);

create table Cart(
	idCart int NOT NULL AUTO_INCREMENT,
	total double,
	PRIMARY KEY (idCart)
);

create table CartItem(
	idCart int,
	idProduct int,
	quantity int,
	PRIMARY KEY (idCart, idProduct),
	CONSTRAINT CartItemFK1 FOREIGN KEY (idCart) REFERENCES Cart(idCart),
	CONSTRAINT CartItemFK2 FOREIGN KEY (idProduct) REFERENCES Product(idProduct)
);

create table Purchase(
	idPurchase int NOT NULL AUTO_INCREMENT,
	pDate date,
	total double,
	username char(30),
	idPaymentMethod int,
	idCoupon char(5),
	idCart int,
	PRIMARY KEY(idPurchase),
	CONSTRAINT PurchaseFK1 FOREIGN KEY (username) REFERENCES Customer(username),
	CONSTRAINT PurchaseFK2 FOREIGN KEY (idCoupon) REFERENCES Coupon(idCoupon),
	CONSTRAINT PurchaseFK3 FOREIGN KEY (idPaymentMethod) REFERENCES PaymentMethod(idPaymentMethod),
	CONSTRAINT PurchaseFK4 FOREIGN KEY (idCart) REFERENCES Cart(idCart)
);

insert into Country(name)
	values('México');

insert into State(name, idCountry)
	values('Guanajuato', 1);

insert into Customer(username, password, dCreate, name, lastName, email, phone, street, city, postalCode, idState)
	values ('chipi', '0112', '2018-11-11', 'Edgar', 'Martínez', '15030096@itcelaya.edu.mx', '4611897615', 'Mina de la luz 101', 'Celaya', '38020', 1);

insert into Provider(name)
	values('Intagri');

insert into Category(name)
	values('Deportes');

insert into Coupon(idCoupon, amount)
	values('00000', 0);

insert into PaymentMethod(name)
	values('Tarjeta');

insert into Product(name, price, idCategory, idProvider)
	values('Balón', 500, 1, 1);

insert into Product(name, price, idCategory, idProvider)
	values('Balón', 500, 1, 1);

insert into Cart(total)
	values(500);

insert into CartItem(idCart, idProduct, quantity)
	values(1, 1, 1);

insert into Purchase(pDate, total, username, idPaymentMethod, idCoupon, idCart)
	values('2018-11-11', 500, 'chipi', 1, '00000', 1);