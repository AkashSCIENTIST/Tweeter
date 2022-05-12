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
