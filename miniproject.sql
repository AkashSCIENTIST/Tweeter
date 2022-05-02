create table users (
	username varchar(20),
	loc varchar(30),
	bio varchar(50),
	mailid varchar(30),
	website varchar(100),
	fname varchar(20),
	lname varchar(20),
	photo text,
	dob date,
	joined_from date default current_date,
	constraint pk_user primary key (username) 
);