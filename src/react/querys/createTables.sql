CREATE TABLE professional(
pro_id INT PRIMARY KEY NOT NULL,
pro_desc VARCHAR(30) CHECK (pro_desc in ('Terapeuta', 'Professor')),
pro_name VARCHAR(100),
pro_email VARCHAR(30),
pro_user VARCHAR(30) UNIQUE NOT NULL,
pro_password VARCHAR(30) NOT NULL
);

CREATE TABLE student(
stu_id INT PRIMARY KEY NOT NULL,
stu_name VARCHAR(100),
stu_age INT,
stu_diagnostic VARCHAR(30) CHECK (stu_diagnostic in ('TDAH', 'Dislexia', 'TEA', 'Outro')),
stu_user VARCHAR(30) UNIQUE,
stu_password VARCHAR(30),
stu_pro_id INT,foreign key (stu_pro_id) REFERENCES professional (pro_id)
);

CREATE TABLE levels (
lev_id INT PRIMARY KEY NOT NULL,
lev_name VARCHAR(30),
lev_difficulty INT
);

CREATE TABLE activity (
act_id INT NOT NULL,
act_ni_id INT,
act_question VARCHAR(255),
act_optionA VARCHAR(255),
act_optionB VARCHAR(255),
act_optionC VARCHAR(255),
act_optionD VARCHAR(255),
act_answer VARCHAR(255),
PRIMARY KEY (act_id, act_ni_id),
foreign key (act_ni_id) REFERENCES levels (lev_id)
);

CREATE TABLE stamp (
sta_id INT PRIMARY KEY NOT NULL,
sta_name VARCHAR(100),
sta_photo VARCHAR(255)
);

CREATE TABLE animal (
ani_id INT PRIMARY KEY NOT NULL,
ani_name VARCHAR(100),
ani_photo VARCHAR(255)
);

CREATE TABLE progress(
prog_id INT PRIMARY KEY NOT NULL,
prog_stu_id INT,
prog_lev_id INT,
prog_act_id INT,
prog_date DATE,
foreign key (prog_stu_id) REFERENCES student (stu_id),
foreign key (prog_lev_id) REFERENCES levels (lev_id),
foreign key (prog_act_id) REFERENCES activity (act_id)
);

CREATE TABLE progress_stamp(
progSta_id INT PRIMARY KEY NOT NULL,
progSta_prog_id INT,
progSta_sta_id INT,
progSta_date DATE,
foreign key (progSta_prog_id) REFERENCES progress (prog_id),
foreign key (progSta_sta_id) REFERENCES stamp (sta_id)
);

CREATE TABLE progress_animal(
progAni_id INT PRIMARY KEY NOT NULL,
progAni_prog_id INT,
progAni_ani_id INT,
progAni_date DATE,
foreign key (progAni_prog_id) REFERENCES progress (prog_id),
foreign key (progAni_ani_id) REFERENCES animal (ani_id)
);

