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
create table tweet (
	tweetid integer,
	content_ varchar(100),
	photo text,
	time_ time ,
	author varchar(20),
	constraint fk_author foreign key (author) references users (username), 
	constraint pk_tweet primary key (tweetid) 
);

create table follows(
    	follower varchar(20),
	follows varchar(20),
	constraint fk_follower foreign key (follower)references users (username),
	constraint fk_follows foreign key (follows)references users (username),
	constraint pk_follwer_follows primary key(follower,follows)
);
--drop table message_;
create table message_(
    	time_ time,
	sender varchar(20),
	receiver varchar(20),
	msg varchar(100),
	constraint fk_sender foreign key (sender) references users (username),
	constraint fk_receiver foreign key (receiver) references users (username),
	constraint pk_msg primary key (time_,sender,receiver)
);
--drop table like_;
create table like_(
    	username varchar(20),
	tweetid integer,
	constraint fk_username foreign key (username) references users (username),
	constraint fk_tweetid foreign key (tweetid) references tweet(tweetid),
	constraint pk_like primary key (username,tweetid)
);
create table comment_(
    	time_ time,
	username varchar(20),
	tweetid integer,
	content_ varchar(100),
	constraint fk_username foreign key (username) references users (username),
	constraint fk_tweetid foreign key (tweetid) references tweet(tweetid),
	constraint pk_comment primary key (time_,username,tweetid)
);

insert into users values('akash_06','Tirupur','CODE <> SLEEP <> REPEAT','20i306@psgtech.ac.in
','https://github.com/AkashSCIENTIST','Akash','SP',null,'2002-08-02','2020-10-15');

insert into users values('tharun_67','Coimbatore','Seek into world of slo-motion to see wonders','21i467@psgtech.ac.in
','https://instagram.com/__tharunkc__?igshid=YmMyMTA2M2Y=','Tharun','KC',null,'2002-11-02','2022-02-28');

--select * from users;

insert into users values('archana_08','Udumalpet','Sunshine Haze','20i308@psgtech.ac.in
','https://github.com/sunshine-haze321','Archana','E',null,'2003-02-01','2020-02-10');

insert into users values('harshan_21','Tuticorin','Perfectly Imperfect!','20i321@psgtech.ac.in
','https://github.com/Harshan-R','Harshan','R',null,'2002-10-01','2019-10-25');

insert into users values('logeshwaran_29','Karur','In a world of queries be a doubt','20i329@psgtech.ac.in
','https://github.com/LOGESHWARAN-C','Logeshwaran','C',null,'2003-05-29','2021-11-05');

insert into users values('muskelon','Pretoria','NEXT<>','elonmusk@gmail.com',
'https://en.wikipedia.org/wiki/Elon_Musk','Elon','musk',null,'1971-06-21','2009-6-02');

insert into users values('loki','Asgard','Fear none! oh wait hulk is here agghg','loki@gmail.com',
'https://en.wikipedia.org/wiki/Loki','Loki','Odinson',null,'2000-09-17','2021-6-09');

insert into users values('s_snape','Hogwarts','Always..','severus@gmail.com',
'https://en.wikipedia.org/wiki/Severus_Snape','Severus','Snape',null,'1960-01-09','2020-03-23');

insert into users values('luffy','Laugh tale','CEO of Straw Hat Pirates','mdluffy@gmail.com',
'https://en.wikipedia.org/wiki/Luffy','D','Luffy',null,'2006-07-07','2020-06-18');

insert into users values('cookie','Mauritania','Bot in disguise','master.zan87@gmail.com',
'https://en.wikipedia.org/wiki/HTTP_cookie','Cookie','X.x',null,'2002-01-01','2020-12-12');
