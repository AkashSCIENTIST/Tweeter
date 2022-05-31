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

create table poll
(Id_ integer,Content_ varchar(50),
constraint pk_Id_ primary key(Id_)
);

create table vote(
username varchar(20),poll_id integer,
	constraint fk_username foreign key (username) references users (username),
	constraint fk_poll_id foreign key (poll_id) references poll (Id_)
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

--follow table insertion

--select * from follows;

insert into follows values ('logeshwaran_29','loki'),
	('logeshwaran_29','akash_06'),('logeshwaran_29','s_snape');

insert into follows values ('cookie','loki'),
	('cookie','luffy'),('cookie','s_snape'),('cookie','muskelon'),('cookie','logeshwaran_29'),('cookie','harshan_21'),
	('cookie','archana_08'),('cookie','tharun_67'),('cookie','akash_06');

insert into follows values ('muskelon','loki');

insert into follows values ('loki','s_snape'),('loki','luffy');

insert into follows values ('luffy','archana_08'),('luffy','akash_06'),('luffy','harshan_21'),('luffy','loki'),
     ('luffy','s_snape');
	 
insert into follows values ('akash_06','loki'),
	('akash_06','archana_08'),('akash_06','muskelon'),('akash_06','harshan_21');
	
insert into follows values ('archana_08','luffy'),
	('archana_08','akash_06'),('archana_08','tharun_67'),('archana_08','harshan_21'),('archana_08','logeshwaran_29');
	
insert into follows values ('tharun_67','harshan_21'),
	('tharun_67','akash_06'),('tharun_67','logeshwaran_29'),('tharun_67','archana_08');
	
insert into follows values ('harshan_21','akash_06'),('harshan_21','tharun_67'),
	('harshan_21','s_snape'),('harshan_21','logeshwaran_29'),('harshan_21','archana_08');
	
--insertion of tweet table

insert into tweet values(1,'My variant is an alligator and the king of Asgard',null,current_timestamp,'loki');

insert into tweet values(2,'I am the Lost Alien in Flat Earth seeking way to red planet',null,current_timestamp,'muskelon');

insert into tweet values(3,'Coke #YOUARENEXT :)',null,current_timestamp,'muskelon');

insert into tweet values(4,'Why didnt Strange use runes of Kof-Kol on Purple Titan?',null,current_timestamp,'muskelon');

insert into tweet values(5,'Bully Maguire will hear about this Draco',null,current_timestamp,'s_snape');

insert into tweet values(6,'Steve Harrington - Dustin duo >> ',null,current_timestamp,'luffy');

insert into tweet values(7,'Every thing is connected... Im the King Doubtie V in 300BC',null,current_timestamp,'logeshwaran_29');

insert into tweet values(8,'햇빛 :)',null,current_timestamp,'archana_08');

insert into tweet values(9,'Groove to Jolly Oh Gymkhana (#_#)',null,current_timestamp,'akash_06');

insert into tweet values(10,'Nothin is true;; Everything is permitted #Xpertswordsman',null,current_timestamp,'tharun_67');

insert into tweet values(11,'നിഷേധാത്മകത അവഗണിക്കുക =|',null,current_timestamp,'harshan_21');

insert into tweet values(12,'எவ்வளவு பண்ணிட்டோம், இத பண்ணமாட்டோமா #twitterclone :)',null,current_timestamp,'akash_06');

-- create and insert group_
create table group_(grpname varchar(30) primary key,grpadmin varchar(20),photo text, description varchar(100));

alter table group_ add constraint fk_grpadmin foreign key(grpadmin) references users(username);

insert into group_ values('Golden Trio','s_snape',null,'When something happens why its Always you three');

insert into group_ values('Cringe avoids me','logeshwaran_29',null,'Classic Cringe here');

insert into group_ values('Earth 606','muskelon',null,'Join here to stop twitter bots and clone');

select * from group_;

--groupmember table creation and value insertion

create table group_members(grpname varchar(30),grpuser varchar(20));

alter table group_members add constraint fk_grpname foreign key(grpname) references group_(grpname);

alter table group_members add constraint fk_username foreign key(grpuser) references users(username);

alter table group_members add constraint pk_grpmembers primary key(grpname,grpuser);

insert into group_members values('Golden Trio','luffy');

insert into group_members values('Golden Trio','loki');

insert into group_members values('Cringe avoids me','cookie');

insert into group_members values('Cringe avoids me','akash_06');

insert into group_members values('Earth 606','harshan_21');

insert into group_members values('Earth 606','tharun_67');

-- like table insertion

select * from like_;

insert into like_ values('muskelon',1);

insert into like_ values('akash_06',1);

insert into like_ values('cookie',1);

insert into like_ values('luffy',12);

insert into like_ values('harshan_21',12);

insert into like_ values('tharun_67',12);

insert into like_ values('archana_08',12);

insert into like_ values('akash_06',2);

insert into like_ values('cookie',3);

insert into like_ values('akash_06',4);

insert into like_ values('cookie',4);

insert into like_ values('logeshwaran_29',5);

insert into like_ values('archana_08',6);

insert into like_ values('cookie',6);

insert into like_ values('tharun_67',8);

insert into like_ values('akash_06',8);

insert into like_ values('harshan_21',8);

insert into like_ values('cookie',9);

insert into like_ values('archana_08',10);

insert into like_ values('cookie',11);

insert into like_ values('akash_06',11);

