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
	followee varchar(20),
	constraint fk_follower foreign key (follower)references users (username),
	constraint fk_followee foreign key (followee)references users (username),
	constraint pk_follwer_followee primary key(follower,followee)
)
